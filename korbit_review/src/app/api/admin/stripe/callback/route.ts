import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import axios from 'axios';

const STRIPE_TOKEN_URL = 'https://connect.stripe.com/oauth/token';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state'); // User ID

    if (!code) {
      return NextResponse.redirect(
        new URL('/admin?error=stripe_connect_failed', request.url)
      );
    }

    // Exchange authorization code for access token
    const response = await axios.post(STRIPE_TOKEN_URL, {
      grant_type: 'authorization_code',
      code,
      client_secret: process.env.STRIPE_SECRET_KEY || '',
    });

    const { access_token, stripe_user_id, stripe_publishable_key } = response.data;

    // Get or create Stripe config
    let config = await prisma.stripeConfig.findFirst();
    
    if (!config) {
      config = await prisma.stripeConfig.create({
        data: {
          stripeAccountId: stripe_user_id,
          publishableKey: stripe_publishable_key,
          secretKey: access_token,
          connectedAt: new Date(),
          isLive: stripe_user_id.startsWith('acct_'),
        },
      });
    } else {
      config = await prisma.stripeConfig.update({
        where: { id: config.id },
        data: {
          stripeAccountId: stripe_user_id,
          publishableKey: stripe_publishable_key,
          secretKey: access_token,
          connectedAt: new Date(),
          isLive: stripe_user_id.startsWith('acct_'),
        },
      });
    }

    // Redirect to admin with success
    return NextResponse.redirect(
      new URL('/admin?stripe=connected', request.url)
    );
  } catch (error) {
    console.error('Stripe callback error:', error);
    return NextResponse.redirect(
      new URL('/admin?error=stripe_connect_failed', request.url)
    );
  }
}