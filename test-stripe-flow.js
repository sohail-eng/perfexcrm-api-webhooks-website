#!/usr/bin/env node

/**
 * Test script to verify the complete Stripe integration flow
 * This simulates the admin setup process
 */

const https = require('https');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

function log(message, color = '') {
  console.log(`${color}${message}${colors.reset}`);
}

async function makeRequest(path, options = {}) {
  const url = new URL(path, BASE_URL);
  
  return new Promise((resolve, reject) => {
    const data = options.body ? JSON.stringify(options.body) : '';
    
    const req = https.request(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        ...options.headers,
      },
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(body),
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: body,
          });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function testStripeFlow() {
  log('🧪 Testing Stripe Integration Flow', colors.bright + colors.cyan);
  log('=====================================\n');

  try {
    // Step 1: Check if admin exists
    log('1. Checking admin authentication...', colors.yellow);
    const authCheck = await makeRequest('/api/admin/auth/check');
    
    if (authCheck.status === 401) {
      log('   ⚠️  No admin account found. Please set up admin first.', colors.red);
      log('   Visit: ' + BASE_URL + '/admin-setup', colors.cyan);
      return;
    }
    
    log('   ✓ Admin authenticated', colors.green);

    // Step 2: Check Stripe configuration
    log('\n2. Checking Stripe configuration...', colors.yellow);
    const stripeConfig = await makeRequest('/api/admin/stripe/setup', {
      headers: { Cookie: authCheck.headers?.['set-cookie'] },
    });
    
    if (!stripeConfig.data.connected) {
      log('   ⚠️  Stripe not connected', colors.red);
      log('   The admin needs to:', colors.cyan);
      log('   1. Go to the admin dashboard', colors.cyan);
      log('   2. Click "Connect Stripe"', colors.cyan);
      log('   3. Enter their Stripe API keys', colors.cyan);
      log('\n   Get keys from: https://dashboard.stripe.com/apikeys', colors.bright);
      return;
    }
    
    log('   ✓ Stripe connected', colors.green);
    log(`   Account: ${stripeConfig.data.config.accountName}`, colors.cyan);
    log(`   Mode: ${stripeConfig.data.config.isLive ? 'Live' : 'Test'}`, colors.cyan);

    // Step 3: Check if products are created
    log('\n3. Checking Stripe products...', colors.yellow);
    
    if (!stripeConfig.data.config.hasProducts) {
      log('   ⚠️  Products not created in Stripe', colors.red);
      log('   Creating products now...', colors.yellow);
      
      const createProducts = await makeRequest('/api/admin/stripe/products', {
        method: 'POST',
        body: { action: 'create' },
        headers: { Cookie: authCheck.headers?.['set-cookie'] },
      });
      
      if (createProducts.status === 200) {
        log('   ✓ Products created successfully', colors.green);
      } else {
        log('   ✗ Failed to create products: ' + createProducts.data.error, colors.red);
        return;
      }
    } else {
      log('   ✓ Products already configured', colors.green);
    }

    // Step 4: Test checkout flow
    log('\n4. Testing checkout flow...', colors.yellow);
    
    const checkoutTest = await makeRequest('/api/checkout', {
      method: 'POST',
      body: {
        priceId: 'test',
        licenseType: 'regular',
        customerEmail: 'test@example.com',
      },
    });
    
    if (checkoutTest.status === 200 && checkoutTest.data.url) {
      log('   ✓ Checkout session created', colors.green);
      log('   Session URL: ' + checkoutTest.data.url, colors.cyan);
    } else {
      log('   ⚠️  Checkout test failed: ' + (checkoutTest.data.error || 'Unknown error'), colors.red);
    }

    // Summary
    log('\n=====================================', colors.bright);
    log('✅ Stripe Integration Test Complete!', colors.bright + colors.green);
    log('\nNext Steps:', colors.bright);
    log('1. Visit the admin dashboard: ' + BASE_URL + '/admin', colors.cyan);
    log('2. Monitor sales in the Sales tab', colors.cyan);
    log('3. Test a real purchase from: ' + BASE_URL + '/#pricing', colors.cyan);
    
  } catch (error) {
    log('\n❌ Test failed with error:', colors.red);
    log(error.message, colors.red);
    log('\nPlease ensure the development server is running:', colors.yellow);
    log('npm run dev', colors.bright);
  }
}

// Run the test
testStripeFlow();