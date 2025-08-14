import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// Simple in-memory storage for demo (use a real database in production)
const sales: any[] = [];

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Save sale to database (using in-memory for demo)
      const sale = {
        id: session.id,
        amount: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency,
        customerEmail: session.customer_email || session.customer_details?.email,
        licenseType: session.metadata?.licenseType,
        status: 'completed',
        createdAt: new Date().toISOString(),
        paymentIntent: session.payment_intent,
      };
      
      sales.push(sale);
      
      // Here you would:
      // 1. Save to database
      // 2. Generate license key
      // 3. Send email with download link
      // 4. Update inventory if needed
      
      console.log('Payment successful:', sale);
      
      // Send download email (implement this)
      await sendDownloadEmail(sale);
      
      break;

    case 'payment_intent.payment_failed':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', paymentIntent.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function sendDownloadEmail(sale: any) {
  // Implement email sending logic
  // You can use services like SendGrid, AWS SES, or Resend
  
  const emailData = {
    to: sale.customerEmail,
    subject: 'Your PerfexCRM API & Webhooks Module Purchase',
    html: `
      <h2>Thank you for your purchase!</h2>
      <p>Your ${sale.licenseType} license has been activated.</p>
      <p>Download your module here: [Download Link]</p>
      <p>Your license key: ${generateLicenseKey()}</p>
      <p>If you have any questions, please contact support@perfexapi.com</p>
    `,
  };
  
  // Send email via your preferred service
  console.log('Sending email:', emailData);
}

function generateLicenseKey(): string {
  // Generate a unique license key
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (i < 3) key += '-';
  }
  return key;
}

// Export the sales data for the admin dashboard
export async function GET() {
  return NextResponse.json({ sales });
}