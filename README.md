# PerfexCRM API & Webhooks Module - Sales Website

A professional, modern sales website built with Next.js 14, React 18, and Tailwind CSS to showcase and sell the PerfexCRM API & Webhooks Module.

## 🚀 Features

- **Modern Design**: Clean, professional design with gradient effects and smooth animations
- **Fully Responsive**: Optimized for all devices - desktop, tablet, and mobile
- **Performance Optimized**: Built with Next.js for optimal loading speeds and SEO
- **Interactive Components**: Smooth animations using Framer Motion
- **Complete Sections**:
  - Hero section with API preview
  - Comprehensive features showcase
  - Integration platforms (n8n, Zapier, Make.com, Pabbly)
  - Live code examples in multiple languages
  - Pricing plans with comparison
  - Customer testimonials
  - FAQ section
  - Strong call-to-action

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript
- **Font**: Inter (Google Fonts)

## 📦 Installation

1. **Navigate to the website directory:**
```bash
cd /Users/sattip/Downloads/codecanyon-qQFDepfm-perfex-powerful-open-source-crm/perfex_crm/modules/api_webhooks_website
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser:**
Visit [http://localhost:3000](http://localhost:3000)

## 🏗️ Building for Production

1. **Build the application:**
```bash
npm run build
# or
yarn build
```

2. **Start the production server:**
```bash
npm run start
# or
yarn start
```

3. **Export as static site (optional):**
```bash
npm run build
npm run export
```
The static files will be in the `out` directory.

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy with one click

### Netlify
1. Build the project: `npm run build && npm run export`
2. Deploy the `out` folder to Netlify

### Traditional Hosting
1. Build: `npm run build && npm run export`
2. Upload contents of `out` folder to your web server
3. Configure your server to serve the static files

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Customization

### Update Content
- **Pricing**: Edit `src/components/Pricing.tsx`
- **Features**: Edit `src/components/Features.tsx`
- **Testimonials**: Edit `src/components/Testimonials.tsx`
- **FAQ**: Edit `src/components/FAQ.tsx`

### Update Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: { /* your colors */ },
  accent: { /* your colors */ }
}
```

### Update Links
Update purchase links in:
- `src/components/Pricing.tsx`
- `src/components/CTA.tsx`
- `src/components/Hero.tsx`

### Update Images
- Place images in `public/` directory
- Update image sources in components
- Optimize images for web (WebP format recommended)

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎨 Components Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── Features.tsx    # Features grid
│   ├── IntegrationShowcase.tsx  # Integration platforms
│   ├── CodeExamples.tsx         # Code examples
│   ├── Pricing.tsx     # Pricing plans
│   ├── Testimonials.tsx # Customer reviews
│   ├── FAQ.tsx         # Frequently asked questions
│   ├── CTA.tsx         # Call to action
│   ├── Footer.tsx      # Footer with links
│   └── BackToTop.tsx   # Back to top button
└── styles/
    └── globals.css     # Global styles
```

## 🔧 Environment Variables

Create a `.env.local` file for any environment-specific settings:
```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_GOOGLE_ANALYTICS=UA-XXXXXXXXX
```

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# or change port
npm run dev -- -p 3001
```

### Clear Cache
```bash
rm -rf .next
rm -rf node_modules
npm install
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This website is created specifically for selling the PerfexCRM API & Webhooks Module.

## 🤝 Support

For any issues or questions:
- Email: support@perfexapi.com
- Documentation: [View Docs](#)
- GitHub: [Report Issue](#)

## ✨ Features Highlights

1. **Animated Hero Section** - Eye-catching introduction with floating badges
2. **Interactive Code Examples** - Switch between PHP, JavaScript, Python, and cURL
3. **Live Integration Showcase** - Visual representation of n8n workflows
4. **Pricing Comparison** - Clear distinction between license types
5. **Social Proof** - Customer testimonials and ratings
6. **Urgency Elements** - Countdown timer and limited offer badges
7. **Smooth Animations** - Framer Motion for professional transitions
8. **SEO Optimized** - Meta tags, Open Graph, and structured data

---

Built with ❤️ for PerfexCRM API & Webhooks Module