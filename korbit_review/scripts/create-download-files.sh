#!/bin/bash

echo "🔧 Creating download files for PerfexCRM API & Webhooks Module"
echo "=============================================================="

# Create downloads directory if it doesn't exist
mkdir -p downloads

# Create temporary directories for packaging
mkdir -p temp/regular temp/extended

# Common files for both versions
echo "📦 Creating common files..."

# License file for regular version
cat > temp/regular/LICENSE.txt << 'EOF'
PerfexCRM API & Webhooks Module - Regular License

This software is licensed under the Regular License.

PERMITTED USES:
- Use in one (1) project/domain
- Modify the code for your own use
- Use for personal or commercial projects

NOT PERMITTED:
- Redistribute or resell the code
- Use in multiple projects without additional licenses
- Claim ownership of the original code

For more information, visit: https://perfexapi.com/license
EOF

# License file for extended version
cat > temp/extended/LICENSE.txt << 'EOF'
PerfexCRM API & Webhooks Module - Extended License

This software is licensed under the Extended License.

PERMITTED USES:
- Use in unlimited projects/domains
- Modify the code for your own use
- Use for personal or commercial projects
- Create derivative works
- Use in client projects

NOT PERMITTED:
- Redistribute or resell the code as a standalone product
- Claim ownership of the original code

For more information, visit: https://perfexapi.com/license
EOF

# Create README files
cat > temp/regular/README.md << 'EOF'
# PerfexCRM API & Webhooks Module - Regular License

Welcome to the PerfexCRM API & Webhooks Module!

## Installation

1. Upload the module files to your PerfexCRM installation
2. Activate the module in Admin > Modules
3. Configure your API settings
4. Set up webhooks as needed

## Documentation

Full documentation is available at: https://perfexapi.com/docs

## Support

For support, please contact us through our website or check the documentation.

## License

This is licensed under the Regular License. Please see LICENSE.txt for details.
EOF

cat > temp/extended/README.md << 'EOF'
# PerfexCRM API & Webhooks Module - Extended License

Welcome to the PerfexCRM API & Webhooks Module!

## Installation

1. Upload the module files to your PerfexCRM installation
2. Activate the module in Admin > Modules
3. Configure your API settings
4. Set up webhooks as needed

## Documentation

Full documentation is available at: https://perfexapi.com/docs

## Support

For support, please contact us through our website or check the documentation.

## License

This is licensed under the Extended License. Please see LICENSE.txt for details.

## Extended Features

This extended license version includes:
- Unlimited domain usage
- Priority support
- Advanced webhook features
- Custom integrations
EOF

# Create sample module files (placeholder structure)
echo "📁 Creating module structure..."

for version in regular extended; do
    mkdir -p "temp/$version/perfex_api_webhooks/controllers"
    mkdir -p "temp/$version/perfex_api_webhooks/models"
    mkdir -p "temp/$version/perfex_api_webhooks/views"
    mkdir -p "temp/$version/perfex_api_webhooks/assets/js"
    mkdir -p "temp/$version/perfex_api_webhooks/assets/css"
    
    # Main module file
    cat > "temp/$version/perfex_api_webhooks/perfex_api_webhooks.php" << 'EOF'
<?php

defined('BASEPATH') or exit('No direct script access allowed');

/*
Module Name: PerfexCRM API & Webhooks
Description: Advanced API and Webhooks module for PerfexCRM
Version: 1.0.0
Author: PerfexAPI
*/

define('PERFEX_API_WEBHOOKS_MODULE_NAME', 'perfex_api_webhooks');

// Module activation hook
register_activation_hook(PERFEX_API_WEBHOOKS_MODULE_NAME, 'perfex_api_webhooks_activation_hook');

function perfex_api_webhooks_activation_hook()
{
    // Module activation logic here
}

// Module deactivation hook
register_deactivation_hook(PERFEX_API_WEBHOOKS_MODULE_NAME, 'perfex_api_webhooks_deactivation_hook');

function perfex_api_webhooks_deactivation_hook()
{
    // Module deactivation logic here
}

// Load module
$CI = &get_instance();
$CI->load->helper(PERFEX_API_WEBHOOKS_MODULE_NAME . '/perfex_api_webhooks');
EOF

    # Sample controller
    cat > "temp/$version/perfex_api_webhooks/controllers/Api_webhooks.php" << 'EOF'
<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Api_webhooks extends ClientsController
{
    public function __construct()
    {
        parent::__construct();
        // Controller initialization
    }

    public function index()
    {
        // Main webhook handling logic
    }
}
EOF

    # Sample CSS
    cat > "temp/$version/perfex_api_webhooks/assets/css/style.css" << 'EOF'
/* PerfexCRM API & Webhooks Module Styles */

.api-webhooks-container {
    padding: 20px;
}

.webhook-item {
    border: 1px solid #e9ecef;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 10px;
}

.webhook-status-active {
    color: #28a745;
}

.webhook-status-inactive {
    color: #dc3545;
}
EOF

    # Sample JavaScript
    cat > "temp/$version/perfex_api_webhooks/assets/js/script.js" << 'EOF'
// PerfexCRM API & Webhooks Module JavaScript

$(document).ready(function() {
    console.log('PerfexCRM API & Webhooks Module loaded');
    
    // Initialize webhook functionality
    initWebhooks();
});

function initWebhooks() {
    // Webhook initialization logic
}

function testWebhook(webhookId) {
    // Test webhook functionality
    $.post('/admin/api_webhooks/test/' + webhookId, function(response) {
        if (response.success) {
            alert_float('success', 'Webhook test successful');
        } else {
            alert_float('danger', 'Webhook test failed');
        }
    });
}
EOF

done

# Create ZIP files
echo "📦 Creating ZIP files..."

cd temp/regular
zip -r "../../downloads/perfex-api-webhooks-regular.zip" .
cd ../..

cd temp/extended
zip -r "../../downloads/perfex-api-webhooks-extended.zip" .
cd ../..

# Clean up
rm -rf temp

# Set proper permissions
chmod 644 downloads/*.zip

echo ""
echo "✅ Download files created successfully!"
echo ""
ls -la downloads/
echo ""
echo "Files are ready for download through the members area."