import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { licenseKey, email } = await request.json();

    if (!licenseKey || !email) {
      return NextResponse.json(
        { error: 'License key and email are required' },
        { status: 400 }
      );
    }

    // Find the sale with this license key and email
    const sale = await prisma.sale.findFirst({
      where: {
        licenseKey: licenseKey,
        customerEmail: email,
        status: 'completed'
      },
      include: {
        product: true,
        downloads: {
          orderBy: { downloadedAt: 'desc' },
          take: 10
        }
      }
    });

    if (!sale) {
      return NextResponse.json(
        { error: 'Invalid license key or email' },
        { status: 401 }
      );
    }

    // Return license information
    return NextResponse.json({
      licenseKey: sale.licenseKey,
      customerEmail: sale.customerEmail,
      customerName: sale.customerName,
      product: {
        name: sale.product.name,
        licenseType: sale.product.licenseType,
        features: sale.product.features
      },
      purchaseDate: sale.createdAt,
      downloadCount: sale.downloadCount,
      lastDownloadAt: sale.lastDownloadAt,
      recentDownloads: sale.downloads
    });

  } catch (error) {
    console.error('Members verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}