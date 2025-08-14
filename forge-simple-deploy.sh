#!/bin/bash
# Simple Forge Deployment Script
# Add this directly to your Forge deployment script

cd /home/forge/perfexapi.com
git pull origin $FORGE_SITE_BRANCH

# Install dependencies
npm ci --production=false

# Copy environment variables
cp .env .env.local

# Database setup
npx prisma migrate deploy
npx prisma generate

# Build application
npm run build

# PM2 restart (without error if not exists)
pm2 reload perfexcrm-api-website --update-env 2>/dev/null || pm2 start npm --name "perfexcrm-api-website" -- start

# Save PM2
pm2 save

echo "Deployment complete!"