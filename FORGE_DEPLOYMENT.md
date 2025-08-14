# Laravel Forge Deployment Guide for Next.js

This guide explains how to deploy the PerfexCRM API & Webhooks website to Laravel Forge.

## Prerequisites

- Laravel Forge account
- Server provisioned through Forge (Ubuntu 20.04 or 22.04 recommended)
- Domain name pointed to your server
- GitHub repository access

## Step 1: Server Preparation

### 1.1 Install Node.js on your Forge server

SSH into your server and run:

```bash
# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version

# Install build essentials for native modules
sudo apt-get install -y build-essential
```

### 1.2 Install PM2 Process Manager

```bash
sudo npm install -g pm2
```

### 1.3 Install SQLite (for default database)

```bash
sudo apt-get install -y sqlite3
```

## Step 2: Create Site in Forge

1. **Log in to Laravel Forge**
2. **Select your server**
3. **Click "New Site"**
4. **Configure the site:**
   - Root Domain: `your-domain.com`
   - Project Type: `Static HTML`
   - Web Directory: `/public` (we'll change this later)
   - Create database: No (using SQLite by default)

## Step 3: Configure Git Repository

1. **In Forge, go to your site**
2. **Click on "Git Repository" tab**
3. **Install Repository:**
   - Provider: GitHub
   - Repository: `sattip/perfexcrm-api-webhooks-website`
   - Branch: `main`
   - Check "Install Composer Dependencies" (uncheck it, we don't need it)

## Step 4: Configure Environment Variables

1. **Go to "Environment" tab in Forge**
2. **Click "Edit Environment"**
3. **Add your production environment variables:**

```env
# Application
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Stripe (Use LIVE keys for production)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_live_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE

# Admin
JWT_SECRET=generate-a-secure-random-string-here

# Database (Optional: Use PostgreSQL for production)
# DATABASE_URL=postgresql://user:password@localhost:5432/perfexapi

# Disable test mode banner in production
NEXT_PUBLIC_TEST_MODE=false
```

4. **Click "Save"**

## Step 5: Configure Deployment Script

1. **Go to "Deployment" tab**
2. **Replace the deployment script with:**

```bash
cd $FORGE_SITE_PATH
git pull origin $FORGE_SITE_BRANCH

# Install dependencies
npm ci --production=false

# Copy Forge environment to .env.local
cp .env .env.local

# Run database migrations
npx prisma migrate deploy
npx prisma generate

# Build application
npm run build

# Restart application
pm2 restart ecosystem.config.js --update-env || pm2 start ecosystem.config.js

# Save PM2 state
pm2 save
```

3. **Click "Save"**

## Step 6: Configure Nginx

1. **Go to "Nginx Configuration" tab**
2. **Replace with this configuration:**

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com;
    
    # SSL Configuration (Forge will auto-fill these)
    ssl_certificate /etc/nginx/ssl/your-domain.com/certificate.crt;
    ssl_certificate_key /etc/nginx/ssl/your-domain.com/private.key;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Proxy to Next.js application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, immutable";
    }
    
    # API routes
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Disable buffering for SSE
        proxy_buffering off;
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        proxy_pass http://localhost:3000/api/health;
    }
    
    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

3. **Click "Save"**

## Step 7: Initial Deployment

1. **SSH into your server:**
```bash
ssh forge@your-server-ip
cd /home/forge/your-domain.com
```

2. **Run initial setup:**
```bash
# Install dependencies
npm ci

# Create logs directory
mkdir -p logs

# Initialize database
npx prisma migrate dev --name init

# Build the application
npm run build

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd -u forge --hp /home/forge
```

## Step 8: Configure SSL

1. **In Forge, go to your site**
2. **Click on "SSL" tab**
3. **Choose "Let's Encrypt"**
4. **Enter your domain**
5. **Click "Obtain Certificate"**

## Step 9: Set Up Stripe Webhook

1. **Go to Stripe Dashboard**
2. **Navigate to Webhooks**
3. **Add endpoint:**
   - URL: `https://your-domain.com/api/webhook/stripe`
   - Events: Select all payment events
4. **Copy the webhook secret**
5. **Update in Forge environment variables**

## Step 10: Create Admin Account

1. **Visit:** `https://your-domain.com/admin-setup`
2. **Create your admin account**
3. **Access admin panel:** `https://your-domain.com/admin`

## Monitoring & Maintenance

### View Application Logs

```bash
# PM2 logs
pm2 logs perfexcrm-api-website

# All logs
pm2 logs

# Monitoring
pm2 monit
```

### Restart Application

```bash
pm2 restart perfexcrm-api-website
```

### Update Application

1. **Push changes to GitHub**
2. **In Forge, click "Deploy Now"**
3. **Or via SSH:**
```bash
cd /home/forge/your-domain.com
./forge-deploy.sh
```

### Database Backup

```bash
# SQLite backup
sqlite3 prisma/dev.db ".backup backup.db"

# PostgreSQL backup (if using)
pg_dump perfexapi > backup.sql
```

## Troubleshooting

### Application won't start

```bash
# Check PM2 status
pm2 status

# View error logs
pm2 logs --err

# Check port availability
sudo lsof -i :3000

# Restart PM2
pm2 kill
pm2 start ecosystem.config.js
```

### Database issues

```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Apply migrations
npx prisma migrate deploy
```

### Permission issues

```bash
# Fix permissions
sudo chown -R forge:forge /home/forge/your-domain.com
chmod -R 755 /home/forge/your-domain.com
```

## Performance Optimization

### 1. Enable Swap (if low memory)

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 2. Configure PM2 Cluster Mode

Already configured in `ecosystem.config.js` to use all CPU cores.

### 3. Enable Nginx Caching

Add to Nginx config:

```nginx
# Cache configuration
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=nextjs_cache:10m max_size=1g inactive=60m;
proxy_cache_key "$scheme$request_method$host$request_uri";

location /_next/static {
    proxy_cache nextjs_cache;
    proxy_cache_valid 200 60m;
    add_header X-Cache-Status $upstream_cache_status;
}
```

### 4. Use PostgreSQL for Production

For better performance with many concurrent users:

```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb perfexapi
sudo -u postgres createuser forge

# Update .env
DATABASE_URL="postgresql://forge:password@localhost:5432/perfexapi"

# Update Prisma schema
# Change provider from "sqlite" to "postgresql"

# Run migrations
npx prisma migrate dev
```

## Security Checklist

- ✅ SSL certificate installed
- ✅ Environment variables secured
- ✅ Test mode disabled in production
- ✅ Strong JWT secret
- ✅ Database backups configured
- ✅ Firewall rules configured (Forge handles this)
- ✅ Regular security updates

## Support

For issues specific to:
- **Forge**: Contact Laravel Forge support
- **Application**: Check GitHub issues
- **Stripe**: Contact Stripe support

---

Remember to monitor your application regularly and keep all dependencies updated!