import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { token } = params;

    if (!token) {
      return NextResponse.json(
        { error: 'Download token required' },
        { status: 400 }
      );
    }

    // Decode token
    let tokenData;
    try {
      tokenData = JSON.parse(Buffer.from(token, 'base64').toString());
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid download token' },
        { status: 400 }
      );
    }

    const { licenseKey, email, timestamp } = tokenData;

    // Check token age (valid for 1 hour)
    if (Date.now() - timestamp > 3600000) {
      return NextResponse.json(
        { error: 'Download token expired' },
        { status: 401 }
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
        { error: 'Invalid license' },
        { status: 401 }
      );
    }

    // Get file path
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

    // Create file stream
    const fileStream = createReadStream(filePath);

    // Return file with proper headers
    return new Response(fileStream, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': fileStats.size.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

  } catch (error) {
    console.error('File download error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}