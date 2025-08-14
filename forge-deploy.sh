#!/bin/bash
# ============================================
# Laravel Forge Deployment Script for Next.js
# PerfexCRM API & Webhooks Website
# ============================================

echo "🚀 Starting deployment..."

# Navigate to project directory
cd $FORGE_SITE_PATH

# Pull latest changes from git
echo "📥 Pulling latest changes from repository..."
git pull origin $FORGE_SITE_BRANCH

# Install/Update Node.js dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Copy environment variables if needed
if [ -f .env.production ]; then
    echo "🔧 Loading production environment variables..."
    cp .env.production .env.local
elif [ -f .env ] && [ ! -f .env.local ]; then
    echo "🔧 Copying .env to .env.local..."
    cp .env .env.local
fi

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy
npx prisma generate

# Build the Next.js application
echo "🏗️ Building Next.js application..."
npm run build

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
fi

# Create logs directory if it doesn't exist
mkdir -p logs

# Stop existing application (don't exit on error)
echo "⏹️ Stopping existing application..."
pm2 stop perfexcrm-api-website 2>/dev/null || true
pm2 delete perfexcrm-api-website 2>/dev/null || true

# Start the application
echo "▶️ Starting application..."
if [ -f ecosystem.config.js ]; then
    pm2 start ecosystem.config.js
else
    pm2 start npm --name "perfexcrm-api-website" -- start
fi

# Save PM2 configuration
pm2 save

# Clear cache
echo "🧹 Clearing cache..."
rm -rf .next/cache

# Set proper permissions
echo "🔒 Setting permissions..."
sudo chown -R forge:forge $FORGE_SITE_PATH
sudo chmod -R 755 $FORGE_SITE_PATH

echo "✅ Deployment completed successfully!"
echo "📊 Application status:"
pm2 list

# Health check (optional, non-blocking)
echo "🏥 Performing health check in 5 seconds..."
(sleep 5 && curl -s http://localhost:3000/api/health > /dev/null && echo "✅ Health check passed") &