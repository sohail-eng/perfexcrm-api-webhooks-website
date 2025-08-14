import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PerfexCRM API & Webhooks Module - Professional REST API Integration',
  description: 'Transform your PerfexCRM with a powerful REST API & Webhooks module. Seamless integration with n8n, Zapier, Make.com and 1000+ apps. Enterprise-grade security, rate limiting, and comprehensive documentation.',
  keywords: 'PerfexCRM, API, Webhooks, REST API, n8n integration, Zapier, Make.com, CRM integration, automation',
  authors: [{ name: 'PerfexCRM Solutions' }],
  openGraph: {
    title: 'PerfexCRM API & Webhooks Module',
    description: 'Professional REST API & Webhooks integration for PerfexCRM',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PerfexCRM API & Webhooks Module',
    description: 'Professional REST API & Webhooks integration for PerfexCRM',
    images: ['/og-image.png'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}