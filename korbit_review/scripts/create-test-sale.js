const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestSale() {
  try {
    // First, check if we have a product, if not create one
    let product = await prisma.product.findFirst();
    
    if (!product) {
      console.log('Creating test product...');
      product = await prisma.product.create({
        data: {
          stripeProductId: 'test_prod_001',
          stripePriceId: 'test_price_001',
          name: 'PerfexCRM API & Webhooks Module',
          description: 'Professional REST API & Webhooks integration for PerfexCRM',
          price: 9900, // $99.00 in cents
          currency: 'usd',
          licenseType: 'regular',
          features: {
            apiAccess: true,
            webhooks: true,
            documentation: true,
            support: 'standard',
            updates: '1 year',
            domains: 1
          },
          isActive: true
        }
      });
      console.log('Test product created!');
    }

    // Generate a test license key
    const licenseKey = 'TEST-DEMO-LICEN-SE123-45678';

    // Check if test sale already exists
    const existingSale = await prisma.sale.findUnique({
      where: { licenseKey }
    });

    if (existingSale) {
      console.log('Test sale already exists!');
      console.log('\n========================================');
      console.log('TEST CREDENTIALS FOR MEMBERS AREA:');
      console.log('========================================');
      console.log('Email: demo@perfexapi.com');
      console.log('License Key: TEST-DEMO-LICEN-SE123-45678');
      console.log('========================================\n');
      return;
    }

    // Create test sale
    const sale = await prisma.sale.create({
      data: {
        stripeSessionId: 'test_session_001',
        stripePaymentId: 'test_payment_001',
        customerEmail: 'demo@perfexapi.com',
        customerName: 'Demo User',
        amount: 9900,
        currency: 'usd',
        productId: product.id,
        licenseKey: licenseKey,
        status: 'completed',
        downloadCount: 0,
        metadata: {
          testSale: true,
          createdBy: 'system',
          purpose: 'demo'
        }
      }
    });

    console.log('Test sale created successfully!');
    console.log('\n========================================');
    console.log('TEST CREDENTIALS FOR MEMBERS AREA:');
    console.log('========================================');
    console.log('URL: https://perfexapi.com/members');
    console.log('Email: demo@perfexapi.com');
    console.log('License Key: TEST-DEMO-LICEN-SE123-45678');
    console.log('========================================\n');
    console.log('You can now use these credentials to test the members area!');

  } catch (error) {
    console.error('Error creating test sale:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
createTestSale();