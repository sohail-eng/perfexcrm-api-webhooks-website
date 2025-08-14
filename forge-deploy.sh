#!/bin/bash
# ============================================
# Laravel Forge Deployment Script for Next.js
# PerfexCRM API & Webhooks Website
# ============================================

# Exit on error
set -e

echo "🚀 Starting deployment..."

# Navigate to project directory
cd $FORGE_SITE_PATH

# Pull latest changes from git
echo "📥 Pulling latest changes from repository..."
git pull origin $FORGE_SITE_BRANCH

# Install/Update Node.js dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Copy environment variables if .env.production exists
if [ -f .env.production ]; then
    echo "🔧 Loading production environment variables..."
    cp .env.production .env.local
fi

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy
npx prisma generate

# Build the Next.js application
echo "🏗️ Building Next.js application..."
npm run build

# Install PM2 globally if not installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    npm install -g pm2
fi

# Stop existing PM2 process if running
echo "⏹️ Stopping existing application..."
pm2 stop perfexcrm-api-website || true
pm2 delete perfexcrm-api-website || true

# Start the application with PM2
echo "▶️ Starting application with PM2..."
pm2 start npm --name "perfexcrm-api-website" -- start

# Save PM2 configuration
pm2 save

# Set up PM2 to start on system boot
pm2 startup systemd -u forge --hp /home/forge || true

# Clear any cache
echo "🧹 Clearing cache..."
rm -rf .next/cache

# Optimize for production
echo "⚡ Optimizing for production..."
npm prune --production

# Set proper permissions
echo "🔒 Setting permissions..."
chown -R forge:forge $FORGE_SITE_PATH
chmod -R 755 $FORGE_SITE_PATH

# Health check
echo "🏥 Performing health check..."
sleep 5
curl -f http://localhost:3000 || exit 1

echo "✅ Deployment completed successfully!"
echo "📊 Application status:"
pm2 status perfexcrm-api-website

# Optional: Send deployment notification
# curl -X POST https://your-webhook-url.com/deployment-complete \
#   -H "Content-Type: application/json" \
#   -d '{"site":"perfexcrm-api-website","status":"deployed","time":"'$(date)'"}'