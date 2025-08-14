import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { publishableKey, secretKey } = await request.json();

    if (!publishableKey || !secretKey) {
      return NextResponse.json(
        { error: 'Both publishable and secret keys are required' },
        { status: 400 }
      );
    }

    // Validate the keys by making a test API call
    try {
      const stripe = new Stripe(secretKey, {
        apiVersion: '2023-10-16',
      });

      // Test the keys by fetching account info
      const account = await stripe.accounts.retrieve();

      // Get or create config
      let config = await prisma.stripeConfig.findFirst();
      
      const configData = {
        publishableKey,
        secretKey,
        stripeAccountId: account.id,
        stripeAccountName: account.business_profile?.name || account.email || 'Stripe Account',
        isLive: !publishableKey.startsWith('pk_test_'),
        connectedAt: new Date(),
      };

      if (!config) {
        config = await prisma.stripeConfig.create({
          data: configData,
        });
      } else {
        config = await prisma.stripeConfig.update({
          where: { id: config.id },
          data: configData,
        });
      }

      return NextResponse.json({
        success: true,
        account: {
          id: account.id,
          name: configData.stripeAccountName,
          isLive: configData.isLive,
        },
      });
    } catch (stripeError: any) {
      console.error('Stripe validation error:', stripeError);
      return NextResponse.json(
        { error: 'Invalid Stripe keys. Please check your keys and try again.' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Stripe setup error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
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

    const config = await prisma.stripeConfig.findFirst();

    if (!config) {
      return NextResponse.json({
        connected: false,
        config: null,
      });
    }

    // Mask the keys for security
    const maskedConfig = {
      publishableKey: config.publishableKey ? 
        `${config.publishableKey.substring(0, 10)}...${config.publishableKey.slice(-4)}` : null,
      hasSecretKey: !!config.secretKey,
      accountId: config.stripeAccountId,
      accountName: config.stripeAccountName,
      isLive: config.isLive,
      hasProducts: !!(config.regularPriceId && config.extendedPriceId),
      connectedAt: config.connectedAt,
    };

    return NextResponse.json({
      connected: true,
      config: maskedConfig,
    });
  } catch (error) {
    console.error('Get Stripe config error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}