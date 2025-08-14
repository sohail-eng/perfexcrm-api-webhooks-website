import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import { getLicenseEmailTemplate } from './email-templates';

const prisma = new PrismaClient();

export async function sendLicenseEmail(saleData) {
  try {
    // Get SMTP configuration
    const smtpConfig = await prisma.smtpConfig.findFirst({
      where: { isActive: true }
    });

    if (!smtpConfig) {
      console.error('SMTP configuration not found');
      return {
        success: false,
        error: 'Email service not configured'
      };
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

    // Get email template
    const emailTemplate = getLicenseEmailTemplate({
      customerName: saleData.customerName,
      customerEmail: saleData.customerEmail,
      licenseKey: saleData.licenseKey,
      productName: saleData.productName,
      licenseType: saleData.licenseType,
      amount: saleData.amount,
      currency: saleData.currency
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"${smtpConfig.fromName}" <${smtpConfig.fromEmail}>`,
      to: saleData.customerEmail,
      replyTo: smtpConfig.replyTo || smtpConfig.fromEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text
    });

    console.log('License email sent:', info.messageId);

    return {
      success: true,
      messageId: info.messageId
    };

  } catch (error) {
    console.error('Failed to send license email:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function sendNotificationEmail({ to, subject, html, text }) {
  try {
    // Get SMTP configuration
    const smtpConfig = await prisma.smtpConfig.findFirst({
      where: { isActive: true }
    });

    if (!smtpConfig) {
      console.error('SMTP configuration not found');
      return {
        success: false,
        error: 'Email service not configured'
      };
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

    // Send email
    const info = await transporter.sendMail({
      from: `"${smtpConfig.fromName}" <${smtpConfig.fromEmail}>`,
      to,
      replyTo: smtpConfig.replyTo || smtpConfig.fromEmail,
      subject,
      html,
      text
    });

    return {
      success: true,
      messageId: info.messageId
    };

  } catch (error) {
    console.error('Failed to send notification email:', error);
    return {
      success: false,
      error: error.message
    };
  }
}