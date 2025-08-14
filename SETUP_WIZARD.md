# 🧙 Setup Wizard - Configure Everything from Web Interface

## Overview
No need to manually edit .env files! Use our web-based setup wizard to configure Stripe, admin access, and all other settings.

## 🚀 Quick Start

### Step 1: Start the Website
```bash
# Navigate to website directory
cd api_webhooks_website

# Install dependencies
npm install

# Start the server
npm run dev
```

### Step 2: Open Setup Wizard
Open your browser and go to:
```
http://localhost:3000/setup
```

## 🎯 Setup Wizard Features

### 1️⃣ Stripe Configuration
- **Test/Live Mode Toggle**: Switch between test and production
- **API Keys Input**: Secure input fields with visibility toggle
- **Price IDs**: Configure product prices
- **Connection Test**: Validate your Stripe keys
- **Visual Feedback**: Real-time validation

### 2️⃣ Admin & Email Setup
- **Admin Password**: Secure your /admin dashboard
- **Email Service**: Choose between:
  - No email (manual delivery)
  - SendGrid integration
  - Resend integration
- **From Email**: Configure sender address

### 3️⃣ Optional Services
- **Database**: PostgreSQL, MySQL, SQLite, or none
- **Analytics**: Google Analytics, Plausible
- **PerfexCRM Integration**: Connect to your CRM

### 4️⃣ Review & Save
- **Configuration Summary**: Review all settings
- **Download .env File**: One-click download
- **Copy to Clipboard**: Alternative save method
- **Next Steps Guide**: Clear instructions

## 📋 What You'll Need

### For Stripe (Required)
1. **Stripe Account**: [Sign up here](https://dashboard.stripe.com/register)
2. **API Keys**: From Stripe Dashboard → Developers → API Keys
3. **Product IDs**: Create products in Stripe Dashboard

### For Email (Optional)
- **SendGrid**: API key from [SendGrid Dashboard](https://app.sendgrid.com)
- **Resend**: API key from [Resend Dashboard](https://resend.com)

### For Analytics (Optional)
- **Google Analytics**: Tracking ID (G-XXXXXXXXXX)
- **Plausible**: Your domain name

## 🔄 Step-by-Step Process

### Getting Stripe Keys

1. **Login to Stripe**
   - Go to [dashboard.stripe.com](https://dashboard.stripe.com)
   - Switch to Test mode (toggle in header)

2. **Get API Keys**
   - Navigate to Developers → API Keys
   - Copy **Publishable key** (starts with `pk_test_`)
   - Copy **Secret key** (starts with `sk_test_`)

3. **Create Products**
   ```
   Products → Add Product
   
   Product 1:
   - Name: PerfexCRM API - Regular License
   - Price: $89 (one-time)
   - Copy the Price ID (price_...)
   
   Product 2:
   - Name: PerfexCRM API - Extended License  
   - Price: $449 (one-time)
   - Copy the Price ID (price_...)
   ```

4. **Setup Webhook** (Later)
   - Webhooks → Add endpoint
   - URL: `https://your-domain.com/api/webhook/stripe`
   - Copy signing secret (whsec_...)

## 💾 Saving Configuration

### Option 1: Automatic Save (Development)
The wizard will create `.env.local` automatically in your project

### Option 2: Manual Download
1. Click "Generate .env File"
2. Save downloaded file as `.env.local`
3. Place in website root directory

### Option 3: Copy & Paste
1. Click "Copy to Clipboard"
2. Create new file `.env.local`
3. Paste contents
4. Save file

## 🧪 Testing Your Setup

### Test Stripe Integration
```bash
# After configuration, test with:
curl http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"priceId":"price_xxx","licenseType":"regular"}'
```

### Test Admin Access
1. Go to `http://localhost:3000/admin`
2. Enter the password you configured
3. View the sales dashboard

### Test Card Numbers
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

## 🔒 Security Notes

- **Never share** your secret keys
- **Use test keys** for development
- **Use live keys** only in production
- **Keep admin password** secure
- **Enable 2FA** on Stripe account

## 🚦 Status Indicators

### In Setup Wizard
- ✅ **Green checkmarks**: Valid configuration
- ⚠️ **Yellow warnings**: Optional fields
- ❌ **Red errors**: Invalid or missing data

### Connection Test Results
- **Valid format**: Key structure is correct
- **API connection**: Can connect to Stripe
- **Products found**: Price IDs are valid

## 📝 Configuration Storage

The wizard saves your configuration in multiple ways:
1. **Browser localStorage**: For returning to wizard
2. **.env.local file**: For Next.js to use
3. **Download backup**: Keep a copy safe

## 🆘 Troubleshooting

### Wizard won't load
```bash
# Make sure you're in the right directory
cd api_webhooks_website
npm install
npm run dev
```

### Can't save configuration
- Check file permissions
- Make sure you have write access
- Try download option instead

### Stripe keys not working
- Verify you're using correct mode (test/live)
- Check for extra spaces in keys
- Ensure products are created in Stripe

### Email not sending
- Verify API key is correct
- Check sender email is verified
- Review service documentation

## 🎉 After Setup

Once configuration is complete:

1. **Restart the server**
   ```bash
   # Stop with Ctrl+C
   npm run dev
   ```

2. **Test everything**
   - Homepage: `http://localhost:3000`
   - Admin: `http://localhost:3000/admin`
   - Setup: `http://localhost:3000/setup`

3. **Go live**
   - Switch to live Stripe keys
   - Deploy to production
   - Update webhook URLs

## 📊 Admin Dashboard Features

After setup, access `/admin` to:
- View total revenue
- Track sales by license type
- Monitor daily/monthly stats
- Export sales data
- View customer list
- Quick action buttons

## 🔄 Updating Configuration

To change settings later:
1. Go back to `/setup`
2. Update values
3. Generate new .env file
4. Restart server

## 📧 Support

Need help with setup?
- Check `/setup` page instructions
- Review this documentation
- Contact: support@perfexapi.com

---

**Remember**: The setup wizard makes configuration easy - no manual file editing required! 🎊