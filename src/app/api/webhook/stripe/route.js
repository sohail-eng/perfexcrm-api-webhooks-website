import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { sendLicenseEmail } from '@/lib/email-service';

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature') || '';

  // Get Stripe config from database
  const stripeConfig = await prisma.stripeConfig.findFirst({
    where: { isActive: true }
  });

  if (!stripeConfig || !stripeConfig.secretKey || !stripeConfig.webhookSecret) {
    console.error('Stripe configuration not found');
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2023-10-16',
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, stripeConfig.webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Log webhook event
  await prisma.webhookLog.create({
    data: {
      eventId: event.id,
      eventType: event.type,
      payload: event.data,
      processed: false
    }
  });

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      try {
        // Get product information
        const product = await prisma.product.findFirst({
          where: {
            stripePriceId: session.metadata?.priceId || ''
          }
        });

        if (!product) {
          console.error('Product not found for price:', session.metadata?.priceId);
          break;
        }

        // Generate license key
        const licenseKey = generateLicenseKey();

        // Create sale record
        const sale = await prisma.sale.create({
          data: {
            stripeSessionId: session.id,
            stripePaymentId: session.payment_intent,
            customerEmail: session.customer_email || session.customer_details?.email || '',
            customerName: session.customer_details?.name || null,
            amount: session.amount_total || 0,
            currency: session.currency || 'usd',
            productId: product.id,
            licenseKey: licenseKey,
            status: 'completed',
            metadata: {
              stripeCustomerId: session.customer,
              paymentMethod: session.payment_method_types?.[0] || 'card'
            }
          }
        });

        // Send license email
        const emailResult = await sendLicenseEmail({
          customerName: sale.customerName,
          customerEmail: sale.customerEmail,
          licenseKey: sale.licenseKey,
          productName: product.name,
          licenseType: product.licenseType,
          amount: sale.amount,
          currency: sale.currency
        });

        if (emailResult.success) {
          console.log('License email sent successfully:', emailResult.messageId);
        } else {
          console.error('Failed to send license email:', emailResult.error);
        }

        // Update webhook log as processed
        await prisma.webhookLog.updateMany({
          where: { eventId: event.id },
          data: { processed: true }
        });

        console.log('Payment successful, sale created:', sale.id);
      } catch (error) {
        console.error('Error processing payment:', error);
        
        // Update webhook log with error
        await prisma.webhookLog.updateMany({
          where: { eventId: event.id },
          data: { 
            processed: true,
            error: error.message
          }
        });
      }
      break;

    case 'payment_intent.payment_failed':
      const paymentIntent = event.data.object;
      console.log('Payment failed:', paymentIntent.id);
      
      // Update any pending sales
      await prisma.sale.updateMany({
        where: {
          stripePaymentId: paymentIntent.id,
          status: 'pending'
        },
        data: {
          status: 'failed'
        }
      });
      break;

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      // Handle subscription events if needed
      console.log(`Subscription event: ${event.type}`);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

function generateLicenseKey() {
  const segments = 4;
  const segmentLength = 5;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';
  
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < segmentLength; j++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (i < segments - 1) key += '-';
  }
  
  return key;
}

// Export sales data for admin dashboard
export async function GET() {
  try {
    const sales = await prisma.sale.findMany({
      include: {
        product: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 100
    });

    return NextResponse.json({ sales });
  } catch (error) {
    console.error('Error fetching sales:', error);
    return NextResponse.json({ error: 'Failed to fetch sales' }, { status: 500 });
  }
}