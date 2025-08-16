export const getLicenseEmailTemplate = (customerData) => {
  const { customerName, customerEmail, licenseKey, productName, licenseType, amount, currency } = customerData;
  
  return {
    subject: `Your ${productName} License Key - Download Ready!`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your License Key</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f8f9fa;
        }
        .container {
            background: white;
            margin: 20px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            padding: 30px;
        }
        .license-box {
            background: #f8f9fa;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
        }
        .license-key {
            font-family: 'Courier New', monospace;
            font-size: 18px;
            font-weight: bold;
            color: #495057;
            background: white;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #dee2e6;
            margin: 10px 0;
            word-break: break-all;
        }
        .download-btn {
            display: inline-block;
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
            margin: 20px 0;
            transition: transform 0.2s;
        }
        .download-btn:hover {
            transform: translateY(-2px);
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        .info-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
        }
        .info-label {
            font-weight: bold;
            color: #6c757d;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 5px;
        }
        .info-value {
            color: #495057;
            font-size: 16px;
        }
        .footer {
            background: #343a40;
            color: #adb5bd;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }
        .footer a {
            color: #6c7bff;
            text-decoration: none;
        }
        @media (max-width: 480px) {
            .info-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Thank You for Your Purchase!</h1>
            <p>Your ${productName} is ready for download</p>
        </div>
        
        <div class="content">
            <p>Hi ${customerName || 'there'},</p>
            
            <p>Thank you for purchasing the <strong>${productName}</strong>! Your payment has been processed successfully, and your license is now active.</p>
            
            <div class="license-box">
                <h3>Your License Key</h3>
                <div class="license-key">${licenseKey}</div>
                <p><small>Keep this license key safe - you'll need it to download and activate the module.</small></p>
            </div>
            
            <div style="text-align: center;">
                <a href="https://perfexapi.com/members" class="download-btn">
                    📥 Access Members Area
                </a>
            </div>
            
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Product</div>
                    <div class="info-value">${productName}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">License Type</div>
                    <div class="info-value">${licenseType.charAt(0).toUpperCase() + licenseType.slice(1)}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Amount Paid</div>
                    <div class="info-value">$${(amount / 100).toFixed(2)} ${currency.toUpperCase()}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Customer Email</div>
                    <div class="info-value">${customerEmail}</div>
                </div>
            </div>
            
            <h3>🚀 Next Steps</h3>
            <ol>
                <li><strong>Visit the Members Area:</strong> Go to <a href="https://perfexapi.com/members">https://perfexapi.com/members</a></li>
                <li><strong>Enter Your Details:</strong> Use your license key and email address to access your downloads</li>
                <li><strong>Download the Module:</strong> Get the latest version of the PerfexCRM API & Webhooks Module</li>
                <li><strong>Install & Activate:</strong> Follow the installation guide to set up the module</li>
            </ol>
            
            <h3>📚 Documentation & Support</h3>
            <ul>
                <li><a href="https://perfexapi.com/docs">Installation Guide</a></li>
                <li><a href="https://perfexapi.com/api-reference">API Reference</a></li>
                <li><a href="mailto:support@perfexapi.com">Email Support</a></li>
            </ul>
            
            <p><strong>License Terms:</strong></p>
            <ul>
                ${licenseType === 'regular' ? `
                <li>✅ Use on one (1) domain/project</li>
                <li>✅ Modify for your own use</li>
                <li>✅ Personal and commercial use</li>
                <li>❌ Redistribute or resell</li>
                ` : `
                <li>✅ Use on unlimited domains/projects</li>
                <li>✅ Modify for your own use</li>
                <li>✅ Personal and commercial use</li>
                <li>✅ Priority support included</li>
                <li>❌ Redistribute or resell as standalone</li>
                `}
            </ul>
            
            <p>If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
            
            <p>Best regards,<br>
            <strong>The PerfexAPI Team</strong></p>
        </div>
        
        <div class="footer">
            <p>© 2025 PerfexAPI. All rights reserved.</p>
            <p>
                <a href="https://perfexapi.com">Website</a> | 
                <a href="https://perfexapi.com/terms">Terms</a> | 
                <a href="https://perfexapi.com/privacy">Privacy</a>
            </p>
        </div>
    </div>
</body>
</html>
    `,
    text: `
Thank you for purchasing ${productName}!

Your License Key: ${licenseKey}

Visit the Members Area: https://perfexapi.com/members
Enter your license key and email address to download the module.

Product: ${productName}
License Type: ${licenseType.charAt(0).toUpperCase() + licenseType.slice(1)}
Amount Paid: $${(amount / 100).toFixed(2)} ${currency.toUpperCase()}

Next Steps:
1. Visit https://perfexapi.com/members
2. Enter your license key and email address
3. Download the latest version of the module
4. Follow the installation guide

Documentation: https://perfexapi.com/docs
Support: support@perfexapi.com

Best regards,
The PerfexAPI Team
    `
  };
};