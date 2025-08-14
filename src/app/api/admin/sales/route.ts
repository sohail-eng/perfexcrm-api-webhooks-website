import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || '30days';

    // Calculate date range
    let startDate = new Date();
    switch (period) {
      case '7days':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30days':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90days':
        startDate.setDate(startDate.getDate() - 90);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      case 'all':
        startDate = new Date(0);
        break;
    }

    // Get sales
    const sales = await prisma.sale.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
        status: 'completed',
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate statistics
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);
    const totalSales = sales.length;
    const regularSales = sales.filter(s => s.product.licenseType === 'regular').length;
    const extendedSales = sales.filter(s => s.product.licenseType === 'extended').length;

    // Group sales by day for chart
    const salesByDay = sales.reduce((acc, sale) => {
      const date = sale.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, count: 0, revenue: 0 };
      }
      acc[date].count++;
      acc[date].revenue += sale.amount;
      return acc;
    }, {} as Record<string, any>);

    // Get recent sales
    const recentSales = sales.slice(0, 10).map(sale => ({
      id: sale.id,
      customerEmail: sale.customerEmail,
      customerName: sale.customerName,
      amount: sale.amount,
      licenseType: sale.product.licenseType,
      licenseKey: sale.licenseKey,
      createdAt: sale.createdAt,
    }));

    return NextResponse.json({
      stats: {
        totalRevenue: totalRevenue / 100, // Convert from cents
        totalSales,
        regularSales,
        extendedSales,
        averageOrderValue: totalSales > 0 ? (totalRevenue / totalSales) / 100 : 0,
      },
      chartData: Object.values(salesByDay).sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
      recentSales,
    });
  } catch (error) {
    console.error('Get sales error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}