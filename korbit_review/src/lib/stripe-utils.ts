import Stripe from 'stripe';
import { prisma } from './prisma';

export async function getStripeInstance() {
  const config = await prisma.stripeConfig.findFirst();
  
  if (!config?.secretKey) {
    throw new Error('Stripe is not configured');
  }

  return new Stripe(config.secretKey, {
    apiVersion: '2023-10-16',
  });
}

export async function createStripeProducts(stripe: Stripe) {
  // Create Regular License Product
  const regularProduct = await stripe.products.create({
    name: 'PerfexCRM API & Webhooks - Regular License',
    description: 'Single domain license with 6 months support',
    metadata: {
      licenseType: 'regular',
    },
  });

  const regularPrice = await stripe.prices.create({
    product: regularProduct.id,
    unit_amount: 8900, // $89.00
    currency: 'usd',
    metadata: {
      licenseType: 'regular',
    },
  });

  // Create Extended License Product
  const extendedProduct = await stripe.products.create({
    name: 'PerfexCRM API & Webhooks - Extended License',
    description: 'Unlimited domains with 12 months priority support',
    metadata: {
      licenseType: 'extended',
    },
  });

  const extendedPrice = await stripe.prices.create({
    product: extendedProduct.id,
    unit_amount: 44900, // $449.00
    currency: 'usd',
    metadata: {
      licenseType: 'extended',
    },
  });

  // Save to database
  await prisma.product.createMany({
    data: [
      {
        stripeProductId: regularProduct.id,
        stripePriceId: regularPrice.id,
        name: regularProduct.name,
        description: regularProduct.description,
        price: 8900,
        licenseType: 'regular',
        features: {
          domains: 1,
          support: '6 months',
          updates: '1 year',
          api: true,
          webhooks: true,
          n8n: true,
          postman: true,
        },
      },
      {
        stripeProductId: extendedProduct.id,
        stripePriceId: extendedPrice.id,
        name: extendedProduct.name,
        description: extendedProduct.description,
        price: 44900,
        licenseType: 'extended',
        features: {
          domains: 'unlimited',
          support: '12 months priority',
          updates: 'lifetime',
          api: true,
          webhooks: true,
          n8n: true,
          postman: true,
          whiteLabel: true,
          saas: true,
        },
      },
    ],
  });

  return {
    regular: { productId: regularProduct.id, priceId: regularPrice.id },
    extended: { productId: extendedProduct.id, priceId: extendedPrice.id },
  };
}

export async function setupStripeWebhook(stripe: Stripe, baseUrl: string) {
  const endpoint = await stripe.webhookEndpoints.create({
    url: `${baseUrl}/api/webhook/stripe`,
    enabled_events: [
      'checkout.session.completed',
      'payment_intent.succeeded',
      'payment_intent.payment_failed',
      'charge.refunded',
    ],
  });

  return endpoint.secret;
}

export function generateLicenseKey(): string {
  const prefix = 'PFX';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = prefix + '-';
  
  for (let i = 0; i < 4; i++) {
    if (i > 0) key += '-';
    for (let j = 0; j < 4; j++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }
  
  return key;
}

export async function getStripeConfig() {
  const config = await prisma.stripeConfig.findFirst();
  
  if (!config) {
    // Create default config
    return await prisma.stripeConfig.create({
      data: {
        isLive: false,
      },
    });
  }
  
  return config;
}