import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if any admin exists
    const adminCount = await prisma.adminUser.count();
    
    if (adminCount > 0) {
      return NextResponse.json(
        { error: 'Admin already exists' },
        { status: 403 }
      );
    }

    // Create first admin
    const hashedPassword = await hashPassword(password);
    const admin = await prisma.adminUser.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Admin account created successfully',
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const adminCount = await prisma.adminUser.count();
    
    return NextResponse.json({
      needsSetup: adminCount === 0,
    });
  } catch (error) {
    console.error('Setup check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}