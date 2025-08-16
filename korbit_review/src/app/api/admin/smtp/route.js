import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Verify admin authentication
async function verifyAdmin(request) {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token');

  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET || 'your-secret-key');
    const admin = await prisma.adminUser.findUnique({
      where: { id: decoded.userId }
    });
    return admin;
  } catch (error) {
    return false;
  }
}

export async function GET(request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const smtpConfig = await prisma.smtpConfig.findFirst({
      where: { isActive: true }
    });

    if (!smtpConfig) {
      return NextResponse.json({
        configured: false,
        config: null
      });
    }

    // Don't send the password to the client
    const { password, ...configWithoutPassword } = smtpConfig;

    return NextResponse.json({
      configured: true,
      config: {
        ...configWithoutPassword,
        password: '********' // Masked password
      }
    });
  } catch (error) {
    console.error('SMTP config fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SMTP configuration' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const {
      host,
      port,
      secure,
      username,
      password,
      fromEmail,
      fromName,
      replyTo
    } = data;

    // Validate required fields
    if (!host || !port || !username || !password || !fromEmail || !fromName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if config exists
    const existingConfig = await prisma.smtpConfig.findFirst();

    let smtpConfig;
    if (existingConfig) {
      // Update existing config
      const updateData = {
        host,
        port: parseInt(port),
        secure: secure !== false,
        username,
        fromEmail,
        fromName,
        replyTo: replyTo || null,
        isActive: true
      };

      // Only update password if it's not the masked value
      if (password !== '********') {
        updateData.password = password;
      }

      smtpConfig = await prisma.smtpConfig.update({
        where: { id: existingConfig.id },
        data: updateData
      });
    } else {
      // Create new config
      smtpConfig = await prisma.smtpConfig.create({
        data: {
          host,
          port: parseInt(port),
          secure: secure !== false,
          username,
          password,
          fromEmail,
          fromName,
          replyTo: replyTo || null,
          isActive: true
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'SMTP configuration saved successfully',
      config: {
        ...smtpConfig,
        password: '********'
      }
    });
  } catch (error) {
    console.error('SMTP config save error:', error);
    return NextResponse.json(
      { error: 'Failed to save SMTP configuration' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.smtpConfig.deleteMany();

    return NextResponse.json({
      success: true,
      message: 'SMTP configuration deleted successfully'
    });
  } catch (error) {
    console.error('SMTP config delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete SMTP configuration' },
      { status: 500 }
    );
  }
}