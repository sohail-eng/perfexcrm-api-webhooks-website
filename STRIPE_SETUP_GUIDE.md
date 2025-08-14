# Stripe Integration Setup Guide

## Overview
The PerfexCRM API & Webhooks module now includes a fully automated Stripe payment integration with an admin dashboard for managing sales.

## Quick Start

### 1. Admin Setup
First time setup requires creating an admin account:

1. Navigate to `/admin-setup`
2. Enter your email and password
3. Click "Create Admin Account"

### 2. Connect Stripe Account

After logging in to the admin dashboard:

1. Click the **"Connect Stripe"** button in the yellow banner
2. You'll see a modal with instructions
3. Get your API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
4. Enter your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
5. Enter your **Secret Key** (starts with `sk_test_` or `sk_live_`)
6. Click **"Connect Stripe"**

**Important:** Start with test keys to ensure everything works before going live!

### 3. Create Products

Once Stripe is connected:

1. Go to the **"Stripe Setup"** tab
2. Click **"Create Products"** button
3. This automatically creates:
   - Regular License ($89) - Single domain, 6 months support
   - Extended License ($449) - Unlimited domains, 12 months priority support

### 4. Start Accepting Payments

Your website is now ready to accept payments! Customers can:

1. Visit your website
2. Click "Buy Now" on any pricing plan
3. Complete checkout through Stripe
4. Automatically receive their license key via email

## Admin Dashboard Features

### Overview Tab
- Total revenue tracking
- Sales count by license type
- Recent sales table
- Real-time statistics

### Sales Tab
- Detailed sales history
- Customer information
- License key management
- Download tracking

### Stripe Setup Tab
- Connection status
- Account information
- Product management
- Test/Live mode indicator

### Settings Tab
- General configuration
- Email templates
- Notification settings

## Testing the Integration

### Using the Test Script
```bash
node test-stripe-flow.js
```

This script will:
1. Verify admin authentication
2. Check Stripe connection
3. Ensure products are created
4. Test checkout flow

### Manual Testing

1. Use Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - More test cards: https://stripe.com/docs/testing

2. Create a test purchase:
   - Go to your website's pricing section
   - Click "Buy Now"
   - Use a test card
   - Check the admin dashboard for the sale

## Switching to Live Mode

When ready for production:

1. Get your live API keys from Stripe
2. Go to Admin Dashboard → Stripe Setup
3. Click "Disconnect" (if test keys are connected)
4. Click "Connect Stripe" again
5. Enter your **live** API keys
6. Re-create products with live pricing

## Webhook Configuration

Webhooks are automatically configured when you connect Stripe. They handle:
- Payment confirmations
- License key delivery
- Failed payment notifications
- Refund processing

## Security Notes

- API keys are stored securely in the database
- Secret keys are never exposed to the frontend
- All payment processing happens server-side
- Session tokens expire after 7 days
- HTTPS is required for production

## Troubleshooting

### "Invalid Stripe keys" error
- Ensure keys are copied correctly without spaces
- Verify you're using the correct mode (test vs live)
- Check Stripe dashboard for API key access

### Products not showing
- Click "Create Products" in Stripe Setup tab
- Ensure Stripe account is fully activated
- Check for any Stripe account restrictions

### Checkout not working
- Verify Stripe is connected (check admin dashboard)
- Ensure products are created
- Check browser console for errors
- Verify your domain is added to Stripe

### Sales not appearing
- Check webhook logs in Stripe dashboard
- Ensure webhook endpoint is accessible
- Verify webhook secret is configured

## Support

For additional help:
- Check Stripe documentation: https://stripe.com/docs
- Review webhook logs in Stripe Dashboard
- Check application logs for errors
- Contact support with your admin dashboard URL

## API Reference

### Key Endpoints

- `POST /api/admin/stripe/setup` - Connect Stripe account
- `POST /api/admin/stripe/products` - Create products
- `GET /api/admin/sales` - Retrieve sales data
- `POST /api/checkout` - Create checkout session
- `POST /api/webhook/stripe` - Handle Stripe webhooks

## Environment Variables

While the system now uses database configuration, you can still set fallback values:

```env
# Fallback Stripe configuration
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Application settings
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## License Key Format

License keys are automatically generated in the format:
```
PFX-XXXX-XXXX-XXXX-XXXX
```

Each key is unique and tied to a specific purchase and customer email.

---

Last updated: 2025-08-14