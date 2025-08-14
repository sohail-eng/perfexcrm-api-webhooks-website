import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';

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

    // Verify license
    const sale = await prisma.sale.findFirst({
      where: {
        licenseKey: licenseKey,
        customerEmail: email,
        status: 'completed'
      },
      include: {
        product: true
      }
    });

    if (!sale) {
      return NextResponse.json(
        { error: 'Invalid license key or email' },
        { status: 401 }
      );
    }

    // Check download limits based on license type
    const maxDownloads = sale.product.licenseType === 'extended' ? 50 : 10;
    if (sale.downloadCount >= maxDownloads) {
      return NextResponse.json(
        { error: `Download limit reached (${maxDownloads} downloads)` },
        { status: 403 }
      );
    }

    // Get file path - for now using a placeholder
    const fileName = `perfex-api-webhooks-${sale.product.licenseType}.zip`;
    const filePath = join(process.cwd(), 'downloads', fileName);
    
    // Check if file exists
    let fileStats;
    try {
      fileStats = statSync(filePath);
    } catch (error) {
      return NextResponse.json(
        { error: 'Download file not found' },
        { status: 404 }
      );
    }

    // Get client info
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const forwarded = request.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0] : 'Unknown';

    // Log the download
    await prisma.$transaction(async (tx) => {
      // Create download record
      await tx.download.create({
        data: {
          saleId: sale.id,
          fileName,
          filePath,
          fileSize: fileStats.size,
          ipAddress,
          userAgent
        }
      });

      // Update sale download count
      await tx.sale.update({
        where: { id: sale.id },
        data: {
          downloadCount: { increment: 1 },
          lastDownloadAt: new Date()
        }
      });
    });

    // Create download URL/token
    const downloadToken = Buffer.from(JSON.stringify({
      licenseKey,
      email,
      timestamp: Date.now()
    })).toString('base64');

    return NextResponse.json({
      downloadUrl: `/api/members/download/${downloadToken}`,
      fileName,
      fileSize: fileStats.size,
      remainingDownloads: maxDownloads - (sale.downloadCount + 1)
    });

  } catch (error) {
    console.error('Download preparation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}