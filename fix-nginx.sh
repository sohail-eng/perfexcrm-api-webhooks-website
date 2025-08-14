#!/bin/bash

echo "🔧 Fixing Nginx configuration for perfexapi.com"
echo "================================================"
echo ""
echo "⚠️  This script needs to be run with sudo privileges"
echo ""

# Backup current configuration
echo "📋 Creating backup of current configuration..."
sudo cp /etc/nginx/sites-available/perfexapi.com /etc/nginx/sites-available/perfexapi.com.backup.$(date +%Y%m%d_%H%M%S)

# Copy new configuration
echo "📝 Applying new configuration..."
sudo cp /home/forge/perfexapi.com/nginx-config-fix.conf /etc/nginx/sites-available/perfexapi.com

# Test configuration
echo "🧪 Testing Nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Configuration test passed!"
    echo ""
    echo "🔄 Reloading Nginx..."
    sudo systemctl reload nginx
    echo "✅ Nginx reloaded successfully!"
    echo ""
    echo "🌐 Testing the website..."
    sleep 2
    STATUS=$(curl -o /dev/null -s -w "%{http_code}\n" https://perfexapi.com)
    if [ "$STATUS" = "200" ]; then
        echo "✅ Website is now accessible! (HTTP $STATUS)"
    else
        echo "⚠️  Website returned HTTP $STATUS - please check the application"
    fi
else
    echo "❌ Configuration test failed!"
    echo "Restoring backup..."
    sudo cp /etc/nginx/sites-available/perfexapi.com.backup.$(date +%Y%m%d_%H%M%S) /etc/nginx/sites-available/perfexapi.com
    echo "Backup restored. Please check the error messages above."
    exit 1
fi

echo ""
echo "================================================"
echo "✨ Done!"