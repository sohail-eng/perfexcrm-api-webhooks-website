import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { licenseKey, domain } = await request.json();

    if (!licenseKey || !domain) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'License key and domain are required' 
        },
        { status: 400 }
      );
    }

    // Verify license exists
    const sale = await prisma.sale.findFirst({
      where: {
        licenseKey: licenseKey,
        status: 'completed'
      }
    });

    if (!sale) {
      return NextResponse.json({
        success: false,
        error: 'Invalid license key'
      });
    }

    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').toLowerCase();

    // Deactivate license for this domain
    const deactivated = await prisma.licenseActivation.updateMany({
      where: {
        licenseKey: licenseKey,
        domain: cleanDomain
      },
      data: {
        isActive: false
      }
    });

    if (deactivated.count === 0) {
      return NextResponse.json({
        success: false,
        error: 'License not found for this domain'
      });
    }

    return NextResponse.json({
      success: true,
      message: 'License deactivated successfully',
      domain: cleanDomain
    });

  } catch (error) {
    console.error('License deactivation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}