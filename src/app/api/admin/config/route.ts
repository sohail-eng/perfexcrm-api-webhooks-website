import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get Stripe configuration
    const stripeConfig = await prisma.stripeConfig.findFirst();

    // Get general settings
    const settings = await prisma.setting.findMany();
    const settingsMap: Record<string, any> = {};
    settings.forEach(setting => {
      settingsMap[setting.key] = setting.value;
    });

    return NextResponse.json({
      stripe: stripeConfig ? {
        connected: !!(stripeConfig.publishableKey && stripeConfig.secretKey),
        accountId: stripeConfig.stripeAccountId,
        accountName: stripeConfig.stripeAccountName,
        isLive: stripeConfig.isLive,
        hasProducts: !!(stripeConfig.regularPriceId && stripeConfig.extendedPriceId),
        regularPriceId: stripeConfig.regularPriceId,
        extendedPriceId: stripeConfig.extendedPriceId,
      } : {
        connected: false,
        hasProducts: false,
      },
      settings: settingsMap,
    });
  } catch (error: any) {
    console.error('Config error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
