'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, Code, Zap, Package, Globe, Cpu, 
  FileJson, FileText, Copy, Check, ExternalLink,
  Play, Settings, Layers, GitBranch
} from 'lucide-react';
import Link from 'next/link';

export default function TemplatesPage() {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const integrationPlatforms = [
    {
      id: 'n8n',
      name: 'n8n',
      logo: '🔄',
      color: 'from-orange-500 to-red-500',
      templates: [
        {
          name: 'Lead Creation Workflow',
          description: 'Automatically create leads from form submissions',
          file: '/templates/n8n/perfexcrm-lead-creation.json',
          features: ['Webhook trigger', 'Data validation', 'Error handling', 'Response formatting']
        },
        {
          name: 'Invoice Automation',
          description: 'Automate invoice reminders and payment tracking',
          file: '/templates/n8n/perfexcrm-invoice-automation.json',
          features: ['Scheduled trigger', 'Batch processing', 'Email notifications', 'Logging']
        }
      ]
    },
    {
      id: 'zapier',
      name: 'Zapier',
      logo: '⚡',
      color: 'from-orange-600 to-orange-500',
      templates: [
        {
          name: 'Google Forms to PerfexCRM',
          description: 'Create leads from Google Form submissions',
          file: '/templates/zapier/zapier-perfexcrm-guide.md',
          features: ['No-code setup', 'Field mapping', 'Filters', 'Multi-step zaps']
        },
        {
          name: 'Stripe Payment Sync',
          description: 'Sync Stripe payments with PerfexCRM invoices',
          file: '/templates/zapier/zapier-perfexcrm-guide.md',
          features: ['Real-time sync', 'Payment tracking', 'Status updates', 'Webhooks']
        }
      ]
    },
    {
      id: 'make',
      name: 'Make.com',
      logo: '🔮',
      color: 'from-purple-600 to-purple-500',
      templates: [
        {
          name: 'Customer Onboarding',
          description: 'Complete customer onboarding automation',
          file: '/templates/make/make-scenarios.json',
          features: ['Multi-step workflow', 'Conditional logic', 'Data routing', 'Error recovery']
        },
        {
          name: 'Lead Scoring System',
          description: 'Score and assign leads automatically',
          file: '/templates/make/make-scenarios.json',
          features: ['Scoring algorithm', 'Smart routing', 'Team assignment', 'Priority tagging']
        }
      ]
    },
    {
      id: 'pabbly',
      name: 'Pabbly Connect',
      logo: '🔗',
      color: 'from-blue-600 to-blue-500',
      templates: [
        {
          name: 'Email to Task',
          description: 'Convert emails to PerfexCRM tasks',
          features: ['Email parsing', 'Task creation', 'Auto-assignment', 'Priority setting']
        },
        {
          name: 'Calendar Sync',
          description: 'Sync Google Calendar with PerfexCRM events',
          features: ['Two-way sync', 'Conflict resolution', 'Attendee mapping', 'Reminders']
        }
      ]
    },
    {
      id: 'activepieces',
      name: 'Activepieces',
      logo: '🧩',
      color: 'from-green-600 to-green-500',
      templates: [
        {
          name: 'Slack Notifications',
          description: 'Send CRM events to Slack channels',
          features: ['Event filtering', 'Channel routing', 'Rich formatting', 'Mentions']
        },
        {
          name: 'Data Backup',
          description: 'Automated backup to Google Drive',
          features: ['Scheduled backup', 'Incremental sync', 'Compression', 'Version control']
        }
      ]
    }
  ];

  const codeExamples = [
    {
      id: 'curl',
      name: 'cURL',
      language: 'bash',
      code: `curl -X POST https://your-perfexcrm.com/api/leads \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Tech Corp",
    "source": "API"
  }'`
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      language: 'javascript',
      code: `const response = await fetch('https://your-perfexcrm.com/api/leads', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    company: 'Tech Corp',
    source: 'API'
  })
});

const lead = await response.json();
console.log('Lead created:', lead);`
    },
    {
      id: 'python',
      name: 'Python',
      language: 'python',
      code: `import requests

url = "https://your-perfexcrm.com/api/leads"
headers = {
    "Authorization": "Bearer YOUR_API_TOKEN",
    "Content-Type": "application/json"
}
data = {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Tech Corp",
    "source": "API"
}

response = requests.post(url, json=data, headers=headers)
lead = response.json()
print(f"Lead created: {lead}")`
    },
    {
      id: 'php',
      name: 'PHP',
      language: 'php',
      code: `<?php
$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://your-perfexcrm.com/api/leads",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer YOUR_API_TOKEN",
    "Content-Type: application/json"
  ],
  CURLOPT_POSTFIELDS => json_encode([
    "name" => "John Doe",
    "email" => "john@example.com",
    "phone" => "+1234567890",
    "company" => "Tech Corp",
    "source" => "API"
  ])
]);

$response = curl_exec($curl);
$lead = json_decode($response, true);
curl_close($curl);

echo "Lead created: " . print_r($lead, true);`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white">Integration Templates</h1>
          <p className="text-xl text-blue-200 mt-2">
            Ready-to-use templates and code examples for popular automation platforms
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Platform Templates */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Automation Platform Templates
            </h2>
            <p className="text-lg text-blue-200">
              Download pre-built workflows and scenarios for your favorite automation tools
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {integrationPlatforms.map((platform, index) => (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden"
              >
                {/* Platform Header */}
                <div className={`bg-gradient-to-r ${platform.color} p-6`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-4xl">{platform.logo}</span>
                      <h3 className="text-2xl font-bold text-white">{platform.name}</h3>
                    </div>
                    <Package className="w-8 h-8 text-white/50" />
                  </div>
                </div>

                {/* Templates List */}
                <div className="p-6 space-y-4">
                  {platform.templates.map((template, tIndex) => (
                    <div
                      key={tIndex}
                      className="bg-white/5 rounded-lg p-4 border border-white/10"
                    >
                      <h4 className="font-semibold text-white mb-2">
                        {template.name}
                      </h4>
                      <p className="text-sm text-gray-300 mb-3">
                        {template.description}
                      </p>
                      
                      {template.features && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {template.features.map((feature, fIndex) => (
                            <span
                              key={fIndex}
                              className="text-xs px-2 py-1 bg-white/10 rounded-full text-blue-200"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}

                      {template.file && (
                        <a
                          href={template.file}
                          download
                          className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download Template
                        </a>
                      )}
                    </div>
                  ))}

                  <div className="pt-4 border-t border-white/10">
                    <a
                      href={`#${platform.id}-setup`}
                      className="flex items-center justify-center w-full py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Setup Guide
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Code Examples
            </h2>
            <p className="text-lg text-blue-200">
              Integration examples in popular programming languages
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {codeExamples.map((example) => (
              <motion.div
                key={example.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Code className="w-5 h-5 text-blue-400" />
                    <span className="font-semibold text-white">{example.name}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(example.code, example.id)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === example.id ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm text-gray-300 font-mono">
                    {example.code}
                  </code>
                </pre>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Workflow Builder */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-white/20"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Visual Workflow Builder
              </h2>
              <p className="text-lg text-blue-200">
                Design your automation workflows visually
              </p>
            </div>

            <div className="bg-black/30 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-500/50">
                  <Zap className="w-8 h-8 text-blue-400" />
                  <p className="text-xs text-blue-300 mt-2">Trigger</p>
                </div>
                <GitBranch className="w-6 h-6 text-gray-400" />
                <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/50">
                  <Layers className="w-8 h-8 text-green-400" />
                  <p className="text-xs text-green-300 mt-2">Process</p>
                </div>
                <GitBranch className="w-6 h-6 text-gray-400" />
                <div className="bg-purple-500/20 p-4 rounded-lg border border-purple-500/50">
                  <Cpu className="w-8 h-8 text-purple-400" />
                  <p className="text-xs text-purple-300 mt-2">Action</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <h3 className="font-semibold text-white mb-2">1. Choose Trigger</h3>
                <p className="text-sm text-gray-300">
                  Webhook, Schedule, Email, Form
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-white mb-2">2. Process Data</h3>
                <p className="text-sm text-gray-300">
                  Filter, Transform, Validate, Enrich
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-white mb-2">3. Take Action</h3>
                <p className="text-sm text-gray-300">
                  Create, Update, Notify, Log
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Quick Start Guide */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Quick Start Guide
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Get API Token</h3>
                <p className="text-sm text-gray-300">
                  Generate your API token from PerfexCRM settings
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Choose Platform</h3>
                <p className="text-sm text-gray-300">
                  Select your preferred automation platform
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Import Template</h3>
                <p className="text-sm text-gray-300">
                  Download and import our ready-made templates
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Customize & Deploy</h3>
                <p className="text-sm text-gray-300">
                  Adjust settings and activate your workflow
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/docs"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-colors"
              >
                <FileText className="w-5 h-5 mr-2" />
                View Full Documentation
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}