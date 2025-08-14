# Stripe Payment Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create a Stripe Account
1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Sign up for a free account
3. Verify your email

### Step 2: Get Your API Keys
1. Go to [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

### Step 3: Create Products in Stripe
1. Go to [https://dashboard.stripe.com/test/products](https://dashboard.stripe.com/test/products)
2. Click **"+ Add product"**

#### Regular License ($89):
- **Name**: PerfexCRM API & Webhooks - Regular License
- **Price**: $89.00 (one-time)
- **Description**: Single domain license with 6 months support
- After creating, copy the **Price ID** (starts with `price_`)

#### Extended License ($449):
- **Name**: PerfexCRM API & Webhooks - Extended License
- **Price**: $449.00 (one-time)
- **Description**: Unlimited domains with 12 months support
- After creating, copy the **Price ID** (starts with `price_`)

### Step 4: Update .env.local
Edit your `.env.local` file and replace the example values:

```env
# Replace these with your actual Stripe values
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_SECRET_KEY_HERE

# Replace with your actual price IDs from Step 3
NEXT_PUBLIC_STRIPE_REGULAR_PRICE_ID=price_YOUR_REGULAR_PRICE_ID
NEXT_PUBLIC_STRIPE_EXTENDED_PRICE_ID=price_YOUR_EXTENDED_PRICE_ID
```

### Step 5: Set Up Webhook (Optional but Recommended)
1. Go to [https://dashboard.stripe.com/test/webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click **"+ Add endpoint"**
3. Enter endpoint URL: `http://localhost:3000/api/webhook/stripe` (or your production URL)
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_`)
6. Add to `.env.local`:
```env
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

### Step 6: Test the Integration
1. Restart your development server:
```bash
npm run dev
```

2. Go to http://localhost:3000/#pricing

3. Click any "Purchase Now" button

4. Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any 5-digit ZIP

## Moving to Production

When ready to accept real payments:

1. **Get Live Keys**: 
   - Go to [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
   - Copy live keys (starts with `pk_live_` and `sk_live_`)

2. **Create Live Products**:
   - Switch to live mode in Stripe Dashboard
   - Recreate products with real prices
   - Copy new Price IDs

3. **Update .env.local**:
   - Replace test keys with live keys
   - Update price IDs
   - Set `NEXT_PUBLIC_TEST_MODE=false`
   - Update `NEXT_PUBLIC_BASE_URL` to your production domain

4. **Update Webhook**:
   - Add production webhook endpoint
   - Use production webhook secret

## Troubleshooting

### "Invalid API Key"
- Make sure you're using the correct key format
- Test keys start with `pk_test_` and `sk_test_`
- Live keys start with `pk_live_` and `sk_live_`

### "No such price"
- Ensure you created products in Stripe Dashboard
- Copy the correct Price ID (not Product ID)
- Price IDs start with `price_`

### Checkout doesn't open
- Check browser console for errors
- Verify publishable key is set correctly
- Ensure you're using HTTPS in production

### Webhook not working
- Check webhook secret is correct
- Verify endpoint URL is accessible
- Check Stripe webhook logs for errors

## Support

Need help? Contact us at support@perfexapi.com