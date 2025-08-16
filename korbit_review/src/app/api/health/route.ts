import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Check Stripe configuration
    const stripeConfig = await prisma.stripeConfig.findFirst();
    const stripeConnected = !!(stripeConfig?.secretKey);
    
    // Get basic stats
    const adminCount = await prisma.adminUser.count();
    const salesCount = await prisma.sale.count();
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: {
        database: 'connected',
        stripe: stripeConnected ? 'connected' : 'not_configured',
        admin: adminCount > 0 ? 'configured' : 'not_configured',
      },
      stats: {
        sales: salesCount,
        admins: adminCount,
      },
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message,
        checks: {
          database: 'disconnected',
        },
      },
      { status: 503 }
    );
  }
}