import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { licenseKey, domain } = await request.json();

    if (!licenseKey || !domain) {
      return NextResponse.json(
        { 
          valid: false, 
          error: 'License key and domain are required' 
        },
        { status: 400 }
      );
    }

    // Find the sale with this license key
    const sale = await prisma.sale.findFirst({
      where: {
        licenseKey: licenseKey,
        status: 'completed'
      },
      include: {
        product: true
      }
    });

    if (!sale) {
      return NextResponse.json({
        valid: false,
        error: 'Invalid license key'
      });
    }

    // Check if license type allows this domain
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').toLowerCase();
    
    // For regular license, check if domain is already activated
    if (sale.product.licenseType === 'regular') {
      const existingActivation = await prisma.licenseActivation.findFirst({
        where: {
          licenseKey: licenseKey,
          isActive: true
        }
      });

      // If there's an existing activation for a different domain, deny
      if (existingActivation && existingActivation.domain !== cleanDomain) {
        return NextResponse.json({
          valid: false,
          error: 'License is already activated on another domain',
          activatedDomain: existingActivation.domain
        });
      }
    }

    // Create or update license activation
    await prisma.licenseActivation.upsert({
      where: {
        licenseKey_domain: {
          licenseKey: licenseKey,
          domain: cleanDomain
        }
      },
      update: {
        lastSeenAt: new Date(),
        isActive: true
      },
      create: {
        licenseKey: licenseKey,
        domain: cleanDomain,
        isActive: true
      }
    });

    // Return license validation response
    return NextResponse.json({
      valid: true,
      licenseKey: licenseKey,
      licenseType: sale.product.licenseType,
      customerEmail: sale.customerEmail,
      customerName: sale.customerName,
      productName: sale.product.name,
      purchaseDate: sale.createdAt,
      features: sale.product.features || {},
      domain: cleanDomain,
      message: 'License is valid and activated'
    });

  } catch (error) {
    console.error('License validation error:', error);
    return NextResponse.json(
      { 
        valid: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}