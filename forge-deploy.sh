#!/bin/bash

# Laravel Forge Deployment Script for Next.js Application
# This script handles the deployment process for the PerfexCRM API Website

set -e

echo "🚀 Starting Forge deployment..."

# Navigate to project directory
cd /home/forge/perfexapi.com

# Pull latest changes from git
echo "📥 Pulling latest changes from git..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Run database migrations if using Prisma
if [ -f "prisma/schema.prisma" ]; then
    echo "🗄️ Running database migrations..."
    npx prisma migrate deploy
    npx prisma generate
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Copy environment variables if needed
if [ -f ".env.production" ]; then
    cp .env.production .env.local
fi

# Reload PM2 process
echo "♻️ Reloading PM2 process..."
pm2 reload ecosystem.config.js --update-env

# Optional: Clear any caches
# echo "🧹 Clearing caches..."
# rm -rf .next/cache

echo "✅ Deployment completed successfully!"
echo "📊 PM2 Status:"
pm2 list

# Health check
echo "🏥 Running health check..."
sleep 5
curl -f http://localhost:3000/api/health || echo "⚠️ Health check failed"
