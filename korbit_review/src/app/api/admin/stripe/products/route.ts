import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getStripeInstance, createStripeProducts, setupStripeWebhook } from '@/lib/stripe-utils';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action } = await request.json();

    if (action === 'create') {
      // Get Stripe instance
      const stripe = await getStripeInstance();
      
      // Create products and prices
      const products = await createStripeProducts(stripe);
      
      // Update config with price IDs
      const config = await prisma.stripeConfig.findFirst();
      if (config) {
        await prisma.stripeConfig.update({
          where: { id: config.id },
          data: {
            regularProductId: products.regular.productId,
            regularPriceId: products.regular.priceId,
            extendedProductId: products.extended.productId,
            extendedPriceId: products.extended.priceId,
          },
        });
      }

      // Setup webhook if not already done
      if (!config?.webhookSecret) {
        const webhookSecret = await setupStripeWebhook(
          stripe,
          process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        );
        
        await prisma.stripeConfig.update({
          where: { id: config!.id },
          data: { webhookSecret },
        });
      }

      return NextResponse.json({
        success: true,
        products,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create products' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get products from database
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { price: 'asc' },
    });

    // Get config
    const config = await prisma.stripeConfig.findFirst();

    return NextResponse.json({
      products,
      hasProducts: products.length > 0,
      configured: !!(config?.regularPriceId && config?.extendedPriceId),
    });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}