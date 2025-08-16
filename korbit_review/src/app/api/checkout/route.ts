import { NextRequest, NextResponse } from 'next/server';
import { getStripeInstance } from '@/lib/stripe-utils';
import { prisma } from '@/lib/prisma';
import { generateLicenseKey } from '@/lib/stripe-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceId, licenseType, customerEmail } = body;

    // Get Stripe configuration from database
    const config = await prisma.stripeConfig.findFirst();
    
    if (!config?.secretKey) {
      // Fallback to environment variables if not configured
      const stripe = new (await import('stripe')).default(
        process.env.STRIPE_SECRET_KEY || '',
        { apiVersion: '2023-10-16' }
      );
      
      // Use price IDs from environment or defaults
      const actualPriceId = licenseType === 'extended' 
        ? (config?.extendedPriceId || process.env.NEXT_PUBLIC_STRIPE_EXTENDED_PRICE_ID || priceId)
        : (config?.regularPriceId || process.env.NEXT_PUBLIC_STRIPE_REGULAR_PRICE_ID || priceId);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: actualPriceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/#pricing`,
        customer_email: customerEmail,
        metadata: {
          licenseType: licenseType,
          product: 'PerfexCRM API & Webhooks Module',
        },
      });

      return NextResponse.json({ sessionId: session.id, url: session.url });
    }

    // Use configured Stripe instance
    const stripe = await getStripeInstance();
    
    // Get the correct price ID from database
    const actualPriceId = licenseType === 'extended' 
      ? config.extendedPriceId 
      : config.regularPriceId;

    if (!actualPriceId) {
      return NextResponse.json(
        { error: 'Products not configured. Please complete Stripe setup.' },
        { status: 400 }
      );
    }

    // Generate license key
    const licenseKey = generateLicenseKey();

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: actualPriceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/#pricing`,
      customer_email: customerEmail,
      metadata: {
        licenseType: licenseType,
        licenseKey: licenseKey,
        product: 'PerfexCRM API & Webhooks Module',
      },
      payment_intent_data: {
        metadata: {
          licenseType: licenseType,
          licenseKey: licenseKey,
        },
      },
    });

    // Create pending sale record
    const product = await prisma.product.findFirst({
      where: { licenseType: licenseType },
    });

    if (product) {
      await prisma.sale.create({
        data: {
          stripeSessionId: session.id,
          customerEmail: customerEmail,
          amount: product.price,
          currency: 'usd',
          productId: product.id,
          licenseKey: licenseKey,
          status: 'pending',
        },
      });
    }

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID required' },
      { status: 400 }
    );
  }

  try {
    const stripe = await getStripeInstance().catch(() => null);
    
    if (!stripe) {
      // Fallback to env vars
      const Stripe = (await import('stripe')).default;
      const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
        apiVersion: '2023-10-16',
      });
      
      const session = await stripeInstance.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent', 'customer'],
      });

      return NextResponse.json({
        status: session.status,
        customer: session.customer,
        payment_status: session.payment_status,
        amount: session.amount_total,
        metadata: session.metadata,
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'customer'],
    });

    // Update sale status if completed
    if (session.payment_status === 'paid') {
      await prisma.sale.update({
        where: { stripeSessionId: sessionId },
        data: {
          status: 'completed',
          stripePaymentId: (session.payment_intent as any)?.id,
          customerName: (session.customer as any)?.name || null,
        },
      });
    }

    return NextResponse.json({
      status: session.status,
      customer: session.customer,
      payment_status: session.payment_status,
      amount: session.amount_total,
      metadata: session.metadata,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}