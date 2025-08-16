import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

// Stripe OAuth URLs
const STRIPE_AUTHORIZE_URL = 'https://connect.stripe.com/oauth/authorize';
const STRIPE_TOKEN_URL = 'https://connect.stripe.com/oauth/token';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');

    if (action === 'connect') {
      // Generate OAuth URL for Stripe Connect
      const params = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.STRIPE_CLIENT_ID || 'ca_RqkE0xgBQTYYgvYH8pTqcJcLiJSuTRZo', // Default Stripe Platform client ID
        scope: 'read_write',
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/stripe/callback`,
        state: user.id, // Pass user ID as state
      });

      const authUrl = `${STRIPE_AUTHORIZE_URL}?${params.toString()}`;
      
      return NextResponse.json({ authUrl });
    }

    // Get current Stripe configuration
    const config = await prisma.stripeConfig.findFirst();

    return NextResponse.json({
      connected: !!config?.stripeAccountId,
      config: config ? {
        accountId: config.stripeAccountId,
        accountName: config.stripeAccountName,
        isLive: config.isLive,
        hasProducts: !!(config.regularPriceId && config.extendedPriceId),
      } : null,
    });
  } catch (error) {
    console.error('Stripe connect error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}