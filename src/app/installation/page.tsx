'use client';

import { motion } from 'framer-motion';
import { Download, Terminal, CheckCircle, AlertCircle, ArrowLeft, Copy, FileCode } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function InstallationPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const steps = [
    {
      title: 'Download the Module',
      description: 'Purchase and download the module package from our website.',
      code: null,
    },
    {
      title: 'Extract Files',
      description: 'Extract the ZIP file to get the api_webhooks folder.',
      code: 'unzip perfexcrm-api-webhooks-v1.0.0.zip',
    },
    {
      title: 'Upload to Server',
      description: 'Upload the api_webhooks folder to your PerfexCRM modules directory.',
      code: '/your-perfexcrm-installation/modules/api_webhooks',
    },
    {
      title: 'Set Permissions',
      description: 'Ensure proper file permissions for the module directory.',
      code: 'chmod -R 755 modules/api_webhooks',
    },
    {
      title: 'Activate Module',
      description: 'Go to Setup > Modules in your PerfexCRM admin panel and activate the API & Webhooks module.',
      code: null,
    },
    {
      title: 'Configure Settings',
      description: 'Navigate to API Settings and configure your preferences.',
      code: null,
    },
  ];

  const requirements = [
    { label: 'PerfexCRM Version', value: '2.0.0 or higher', met: true },
    { label: 'PHP Version', value: '7.4 or higher', met: true },
    { label: 'MySQL Version', value: '5.7 or higher', met: true },
    { label: 'SSL Certificate', value: 'Required for webhooks', met: true },
    { label: 'cURL Extension', value: 'Enabled', met: true },
    { label: 'JSON Extension', value: 'Enabled', met: true },
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
            <Download className="w-10 h-10 text-primary-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            Installation Guide
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            Follow these simple steps to install the PerfexCRM API & Webhooks Module
          </motion.p>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">System Requirements</h2>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {requirements.map((req, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                >
                  <div>
                    <div className="font-semibold text-slate-900">{req.label}</div>
                    <div className="text-sm text-slate-600">{req.value}</div>
                  </div>
                  {req.met ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Installation Steps */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Installation Steps</h2>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold">
                    {index + 1}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-slate-600 mb-4">{step.description}</p>
                    {step.code && (
                      <div className="relative bg-slate-900 rounded-lg p-4">
                        <button
                          onClick={() => copyToClipboard(step.code, `step-${index}`)}
                          className="absolute top-3 right-3 text-slate-400 hover:text-white"
                        >
                          {copiedCode === `step-${index}` ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </button>
                        <pre className="text-sm text-slate-300">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Setup */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Quick Setup Script</h2>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-slate-600 mb-4">
              For advanced users, you can use this bash script for quick installation:
            </p>
            <div className="relative bg-slate-900 rounded-lg p-6">
              <button
                onClick={() => copyToClipboard(
                  `#!/bin/bash
# PerfexCRM API Module Installation Script

# Navigate to modules directory
cd /path/to/perfexcrm/modules

# Download and extract module
wget https://perfexapi.com/download/latest.zip
unzip latest.zip
rm latest.zip

# Set permissions
chmod -R 755 api_webhooks
chown -R www-data:www-data api_webhooks

echo "Installation complete! Please activate the module in PerfexCRM admin panel."`,
                  'quick-setup'
                )}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                {copiedCode === 'quick-setup' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{`#!/bin/bash
# PerfexCRM API Module Installation Script

# Navigate to modules directory
cd /path/to/perfexcrm/modules

# Download and extract module
wget https://perfexapi.com/download/latest.zip
unzip latest.zip
rm latest.zip

# Set permissions
chmod -R 755 api_webhooks
chown -R www-data:www-data api_webhooks

echo "Installation complete! Please activate the module in PerfexCRM admin panel."`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Troubleshooting</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-3">Module not appearing?</h3>
              <p className="text-slate-600 mb-3">
                Ensure the module folder is placed in the correct directory and has proper permissions.
              </p>
              <code className="text-sm bg-slate-100 px-2 py-1 rounded">
                /modules/api_webhooks/
              </code>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-3">Database errors?</h3>
              <p className="text-slate-600 mb-3">
                Clear your cache and ensure your PerfexCRM version meets the minimum requirements.
              </p>
              <code className="text-sm bg-slate-100 px-2 py-1 rounded">
                rm -rf application/cache/*
              </code>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-3">API not working?</h3>
              <p className="text-slate-600 mb-3">
                Check that SSL is enabled and your .htaccess file allows API requests.
              </p>
              <code className="text-sm bg-slate-100 px-2 py-1 rounded">
                RewriteRule ^api/(.*)$ index.php/api/$1 [L]
              </code>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-3">Need help?</h3>
              <p className="text-slate-600 mb-3">
                Contact our support team for assistance with installation.
              </p>
              <Link href="/support" className="text-primary-600 hover:text-primary-700 font-semibold">
                Get Support →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Next Steps</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/docs"
              className="px-6 py-3 bg-white border-2 border-primary-500 text-primary-600 rounded-lg font-semibold hover:bg-primary-50"
            >
              Read Documentation
            </Link>
            <Link
              href="/api-reference"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
            >
              API Reference
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}