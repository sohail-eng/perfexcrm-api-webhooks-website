#!/bin/bash

# PerfexCRM API & Webhooks Module - Website Deployment Script

echo "🚀 PerfexCRM API & Webhooks Module - Website Deployment"
echo "======================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${YELLOW}⚠️  Node.js version 18+ is recommended. Current version: $(node -v)${NC}"
fi

echo -e "${GREEN}✓ Node.js $(node -v) detected${NC}"
echo ""

# Function to install dependencies
install_deps() {
    echo "📦 Installing dependencies..."
    if command -v pnpm &> /dev/null; then
        pnpm install
    elif command -v yarn &> /dev/null; then
        yarn install
    else
        npm install
    fi
    echo -e "${GREEN}✓ Dependencies installed${NC}"
    echo ""
}

# Function to build the project
build_project() {
    echo "🔨 Building the project..."
    npm run build
    echo -e "${GREEN}✓ Build completed${NC}"
    echo ""
}

# Function to export static site
export_static() {
    echo "📤 Exporting static site..."
    npm run export
    echo -e "${GREEN}✓ Static export completed${NC}"
    echo "📁 Static files are in the 'out' directory"
    echo ""
}

# Main menu
echo "Select deployment option:"
echo "1) Development Server (localhost:3000)"
echo "2) Production Build + Start"
echo "3) Static Export (for traditional hosting)"
echo "4) Install dependencies only"
echo "5) Clean install (remove node_modules and reinstall)"
echo "6) Exit"
echo ""

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting development server..."
        install_deps
        echo -e "${YELLOW}Opening http://localhost:3000 in your browser...${NC}"
        npm run dev
        ;;
    2)
        echo ""
        echo "🚀 Building for production..."
        install_deps
        build_project
        echo "✨ Starting production server..."
        echo -e "${YELLOW}Opening http://localhost:3000 in your browser...${NC}"
        npm run start
        ;;
    3)
        echo ""
        echo "📦 Creating static export..."
        install_deps
        build_project
        export_static
        echo -e "${GREEN}✅ Static export complete!${NC}"
        echo ""
        echo "📋 Next steps:"
        echo "1. Upload the contents of the 'out' folder to your web server"
        echo "2. Configure your server to serve index.html for all routes"
        echo "3. Ensure your server supports serving static files"
        echo ""
        echo "For Apache, add this to .htaccess in the 'out' folder:"
        echo "RewriteEngine On"
        echo "RewriteBase /"
        echo "RewriteRule ^index\\.html$ - [L]"
        echo "RewriteCond %{REQUEST_FILENAME} !-f"
        echo "RewriteCond %{REQUEST_FILENAME} !-d"
        echo "RewriteRule . /index.html [L]"
        ;;
    4)
        echo ""
        install_deps
        echo -e "${GREEN}✅ Dependencies installed successfully!${NC}"
        ;;
    5)
        echo ""
        echo "🧹 Cleaning and reinstalling..."
        rm -rf node_modules package-lock.json yarn.lock pnpm-lock.yaml .next out
        echo -e "${GREEN}✓ Cleaned old files${NC}"
        install_deps
        echo -e "${GREEN}✅ Clean install complete!${NC}"
        ;;
    6)
        echo ""
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo ""
        echo -e "${RED}❌ Invalid choice. Please run the script again.${NC}"
        exit 1
        ;;
esac

echo ""
echo "=================================================="
echo -e "${GREEN}✨ Done! Thank you for using PerfexAPI Pro${NC}"
echo "=================================================="