/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.jsdelivr.net'],
    unoptimized: true,
  },
  output: 'standalone',
}

module.exports = nextConfig