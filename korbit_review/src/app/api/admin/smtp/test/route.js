import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

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

export async function POST(request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { testEmail } = await request.json();

    if (!testEmail) {
      return NextResponse.json(
        { error: 'Test email address is required' },
        { status: 400 }
      );
    }

    // Get SMTP configuration
    const smtpConfig = await prisma.smtpConfig.findFirst({
      where: { isActive: true }
    });

    if (!smtpConfig) {
      return NextResponse.json(
        { error: 'SMTP configuration not found. Please configure SMTP settings first.' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      auth: {
        user: smtpConfig.username,
        pass: smtpConfig.password
      }
    });

    // Verify connection
    await transporter.verify();

    // Send test email
    const info = await transporter.sendMail({
      from: `"${smtpConfig.fromName}" <${smtpConfig.fromEmail}>`,
      to: testEmail,
      replyTo: smtpConfig.replyTo || smtpConfig.fromEmail,
      subject: 'SMTP Test Email - PerfexAPI',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f8f9fa;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .success {
              color: #28a745;
              font-weight: bold;
            }
            .info-box {
              background: white;
              border: 1px solid #e9ecef;
              border-radius: 5px;
              padding: 15px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              color: #6c757d;
              font-size: 14px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎉 SMTP Test Successful!</h1>
          </div>
          <div class="content">
            <p class="success">✅ Your SMTP configuration is working correctly!</p>
            
            <p>This test email confirms that your email settings are properly configured and emails can be sent successfully from your PerfexAPI installation.</p>
            
            <div class="info-box">
              <h3>Configuration Details:</h3>
              <ul>
                <li><strong>SMTP Host:</strong> ${smtpConfig.host}</li>
                <li><strong>Port:</strong> ${smtpConfig.port}</li>
                <li><strong>Security:</strong> ${smtpConfig.secure ? 'SSL/TLS' : 'None/STARTTLS'}</li>
                <li><strong>From Email:</strong> ${smtpConfig.fromEmail}</li>
                <li><strong>From Name:</strong> ${smtpConfig.fromName}</li>
                <li><strong>Reply To:</strong> ${smtpConfig.replyTo || smtpConfig.fromEmail}</li>
              </ul>
            </div>
            
            <p>Your system is now ready to send:</p>
            <ul>
              <li>✉️ License key emails to customers</li>
              <li>📧 Purchase confirmations</li>
              <li>🔔 System notifications</li>
              <li>📨 Support communications</li>
            </ul>
            
            <div class="footer">
              <p>Sent from PerfexAPI at ${new Date().toLocaleString()}</p>
              <p>© 2025 PerfexAPI. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
SMTP Test Successful!

Your SMTP configuration is working correctly!

Configuration Details:
- SMTP Host: ${smtpConfig.host}
- Port: ${smtpConfig.port}
- Security: ${smtpConfig.secure ? 'SSL/TLS' : 'None/STARTTLS'}
- From Email: ${smtpConfig.fromEmail}
- From Name: ${smtpConfig.fromName}

Your system is now ready to send license key emails and notifications.

Sent from PerfexAPI at ${new Date().toLocaleString()}
      `
    });

    // Update test email sent timestamp
    await prisma.smtpConfig.update({
      where: { id: smtpConfig.id },
      data: { testEmailSentAt: new Date() }
    });

    return NextResponse.json({
      success: true,
      message: `Test email sent successfully to ${testEmail}`,
      messageId: info.messageId
    });

  } catch (error) {
    console.error('SMTP test error:', error);
    
    let errorMessage = 'Failed to send test email';
    if (error.code === 'EAUTH') {
      errorMessage = 'Authentication failed. Please check your username and password.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Connection failed. Please check your host and port settings.';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Socket error. Please check your host, port, and security settings.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}