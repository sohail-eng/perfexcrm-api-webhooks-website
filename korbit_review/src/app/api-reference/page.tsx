'use client';

import { motion } from 'framer-motion';
import { Code, ArrowLeft, Copy, CheckCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ApiReferencePage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const endpoints = [
    {
      category: 'Customers',
      endpoints: [
        {
          method: 'GET',
          path: '/api/v1/customers',
          description: 'Get all customers with pagination',
          example: `curl -X GET https://your-crm.com/api/v1/customers \\
  -H "X-API-KEY: pk_your_api_key_here"`,
        },
        {
          method: 'GET',
          path: '/api/v1/customers/{id}',
          description: 'Get specific customer by ID',
          example: `curl -X GET https://your-crm.com/api/v1/customers/123 \\
  -H "X-API-KEY: pk_your_api_key_here"`,
        },
        {
          method: 'POST',
          path: '/api/v1/customers',
          description: 'Create new customer',
          example: `curl -X POST https://your-crm.com/api/v1/customers \\
  -H "X-API-KEY: pk_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{"company": "ACME Corp", "email": "contact@acme.com"}'`,
        },
        {
          method: 'PUT',
          path: '/api/v1/customers/{id}',
          description: 'Update existing customer',
          example: `curl -X PUT https://your-crm.com/api/v1/customers/123 \\
  -H "X-API-KEY: pk_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{"company": "ACME Corporation"}'`,
        },
        {
          method: 'DELETE',
          path: '/api/v1/customers/{id}',
          description: 'Delete customer',
          example: `curl -X DELETE https://your-crm.com/api/v1/customers/123 \\
  -H "X-API-KEY: pk_your_api_key_here"`,
        },
      ],
    },
    {
      category: 'Tickets',
      endpoints: [
        {
          method: 'GET',
          path: '/api/v1/tickets',
          description: 'Get all tickets',
          example: `curl -X GET https://your-crm.com/api/v1/tickets \\
  -H "X-API-KEY: pk_your_api_key_here"`,
        },
        {
          method: 'POST',
          path: '/api/v1/tickets',
          description: 'Create new ticket',
          example: `curl -X POST https://your-crm.com/api/v1/tickets \\
  -H "X-API-KEY: pk_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{"subject": "API Issue", "message": "Need help with API integration"}'`,
        },
        {
          method: 'PUT',
          path: '/api/v1/tickets/{id}/status',
          description: 'Update ticket status',
          example: `curl -X PUT https://your-crm.com/api/v1/tickets/456/status \\
  -H "X-API-KEY: pk_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{"status": "resolved"}'`,
        },
      ],
    },
    {
      category: 'Invoices',
      endpoints: [
        {
          method: 'GET',
          path: '/api/v1/invoices',
          description: 'Get all invoices',
          example: `curl -X GET https://your-crm.com/api/v1/invoices \\
  -H "X-API-KEY: pk_your_api_key_here"`,
        },
        {
          method: 'POST',
          path: '/api/v1/invoices',
          description: 'Create new invoice',
          example: `curl -X POST https://your-crm.com/api/v1/invoices \\
  -H "X-API-KEY: pk_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{"customer_id": 123, "total": 1500.00}'`,
        },
        {
          method: 'GET',
          path: '/api/v1/invoices/{id}/pdf',
          description: 'Download invoice as PDF',
          example: `curl -X GET https://your-crm.com/api/v1/invoices/789/pdf \\
  -H "X-API-KEY: pk_your_api_key_here" \\
  -o invoice.pdf`,
        },
      ],
    },
    {
      category: 'Webhooks',
      endpoints: [
        {
          method: 'GET',
          path: '/api/v1/webhooks',
          description: 'List all webhooks',
          example: `curl -X GET https://your-crm.com/api/v1/webhooks \\
  -H "X-API-KEY: pk_your_api_key_here"`,
        },
        {
          method: 'POST',
          path: '/api/v1/webhooks',
          description: 'Create webhook subscription',
          example: `curl -X POST https://your-crm.com/api/v1/webhooks \\
  -H "X-API-KEY: pk_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://your-app.com/webhook", "events": ["customer.created"]}'`,
        },
        {
          method: 'DELETE',
          path: '/api/v1/webhooks/{id}',
          description: 'Delete webhook',
          example: `curl -X DELETE https://your-crm.com/api/v1/webhooks/123 \\
  -H "X-API-KEY: pk_your_api_key_here"`,
        },
      ],
    },
  ];

  const filteredEndpoints = endpoints
    .map(category => ({
      ...category,
      endpoints: category.endpoints.filter(endpoint =>
        (selectedCategory === 'all' || category.category.toLowerCase() === selectedCategory.toLowerCase()) &&
        (endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
         endpoint.description.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    }))
    .filter(category => category.endpoints.length > 0);

  const methodColors = {
    GET: 'bg-green-100 text-green-700',
    POST: 'bg-blue-100 text-blue-700',
    PUT: 'bg-yellow-100 text-yellow-700',
    DELETE: 'bg-red-100 text-red-700',
  };

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
            <Code className="w-10 h-10 text-primary-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            API Reference
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            Complete reference for all API endpoints with examples
          </motion.p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b bg-white sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search endpoints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'Customers', 'Tickets', 'Invoices', 'Webhooks'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEndpoints.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
              <div className="space-y-6">
                {category.endpoints.map((endpoint, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span
                            className={`px-3 py-1 rounded-md font-semibold text-sm ${
                              methodColors[endpoint.method as keyof typeof methodColors]
                            }`}
                          >
                            {endpoint.method}
                          </span>
                          <code className="text-lg font-mono text-slate-800">{endpoint.path}</code>
                        </div>
                      </div>
                      <p className="text-slate-600 mb-4">{endpoint.description}</p>
                      <div className="relative">
                        <div className="absolute top-3 right-3">
                          <button
                            onClick={() =>
                              copyToClipboard(endpoint.example, `${category.category}-${index}`)
                            }
                            className="text-slate-400 hover:text-slate-600"
                          >
                            {copiedCode === `${category.category}-${index}` ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        <pre className="bg-slate-900 text-slate-300 p-4 rounded-lg overflow-x-auto">
                          <code className="text-sm">{endpoint.example}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Authentication Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Authentication</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-3">API Key Authentication</h3>
              <p className="text-slate-600 mb-4">
                Include your API key in the X-API-KEY header:
              </p>
              <pre className="bg-slate-900 text-slate-300 p-3 rounded-lg text-sm">
                <code>X-API-KEY: pk_your_api_key_here</code>
              </pre>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-3">JWT Authentication</h3>
              <p className="text-slate-600 mb-4">
                Include JWT token in Authorization header:
              </p>
              <pre className="bg-slate-900 text-slate-300 p-3 rounded-lg text-sm">
                <code>Authorization: Bearer your_jwt_token</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Response Codes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Response Codes</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Code</th>
                  <th className="px-6 py-4 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-6 py-4 font-mono">200</td>
                  <td className="px-6 py-4 text-slate-600">Success - Request completed successfully</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono">201</td>
                  <td className="px-6 py-4 text-slate-600">Created - Resource created successfully</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono">400</td>
                  <td className="px-6 py-4 text-slate-600">Bad Request - Invalid parameters</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono">401</td>
                  <td className="px-6 py-4 text-slate-600">Unauthorized - Invalid or missing authentication</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono">404</td>
                  <td className="px-6 py-4 text-slate-600">Not Found - Resource not found</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono">429</td>
                  <td className="px-6 py-4 text-slate-600">Too Many Requests - Rate limit exceeded</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono">500</td>
                  <td className="px-6 py-4 text-slate-600">Server Error - Internal server error</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Resources</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/postman/PerfexCRM_API_Collection_v3.json"
              download
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
            >
              Download Postman Collection
            </a>
            <Link
              href="/docs"
              className="px-6 py-3 bg-white border-2 border-primary-500 text-primary-600 rounded-lg font-semibold hover:bg-primary-50"
            >
              Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}