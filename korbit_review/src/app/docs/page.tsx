'use client';

import { motion } from 'framer-motion';
import { Book, Code, Zap, Shield, Globe, Database, Key, Webhook, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DocumentationPage() {
  const sections = [
    {
      icon: Code,
      title: 'Getting Started',
      items: [
        'System Requirements',
        'Installation Guide',
        'Initial Configuration',
        'Creating Your First API Key',
        'Testing the API',
      ],
    },
    {
      icon: Key,
      title: 'Authentication',
      items: [
        'API Key Authentication',
        'JWT Token Authentication',
        'OAuth 2.0 Setup',
        'Security Best Practices',
        'Rate Limiting',
      ],
    },
    {
      icon: Database,
      title: 'API Endpoints',
      items: [
        'Customers API',
        'Tickets API',
        'Invoices API',
        'Leads API',
        'Projects API',
        'Tasks API',
        'Contracts API',
        'Staff API',
      ],
    },
    {
      icon: Webhook,
      title: 'Webhooks',
      items: [
        'Setting Up Webhooks',
        'Available Events (40+)',
        'Webhook Security',
        'HMAC Signature Verification',
        'Retry Mechanism',
        'Testing Webhooks',
      ],
    },
    {
      icon: Globe,
      title: 'Integrations',
      items: [
        'n8n Workflows',
        'Zapier Integration',
        'Make.com Scenarios',
        'Pabbly Connect',
        'Custom Integrations',
      ],
    },
    {
      icon: Shield,
      title: 'Security',
      items: [
        'API Security',
        'Rate Limiting',
        'IP Whitelisting',
        'CORS Configuration',
        'Error Handling',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6"
          >
            <Book className="w-10 h-10 text-primary-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            Complete API Documentation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            Everything you need to integrate PerfexCRM with your applications
          </motion.p>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary-100 rounded-lg mr-3">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-slate-600">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Start Examples</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4">Get All Customers</h3>
              <pre className="text-sm text-slate-300 overflow-x-auto">
{`curl -X GET https://your-crm.com/api/v1/customers \\
  -H "X-API-KEY: pk_your_api_key_here" \\
  -H "Content-Type: application/json"`}
              </pre>
            </div>

            <div className="bg-slate-900 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4">Create a Ticket</h3>
              <pre className="text-sm text-slate-300 overflow-x-auto">
{`curl -X POST https://your-crm.com/api/v1/tickets \\
  -H "X-API-KEY: pk_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{"subject": "API Test", "message": "Test ticket"}'`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Additional Resources</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/installation"
              className="px-6 py-3 bg-white border-2 border-primary-500 text-primary-600 rounded-lg font-semibold hover:bg-primary-50"
            >
              Installation Guide
            </Link>
            <Link
              href="/api-reference"
              className="px-6 py-3 bg-white border-2 border-primary-500 text-primary-600 rounded-lg font-semibold hover:bg-primary-50"
            >
              API Reference
            </Link>
            <a
              href="/postman/PerfexCRM_API_Collection_v3.json"
              download
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
            >
              Download Postman Collection
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}