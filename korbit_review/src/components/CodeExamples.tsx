'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Copy, Check, Terminal } from 'lucide-react';

const CodeExamples = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const examples = [
    {
      title: 'PHP',
      language: 'php',
      code: `// Get all customers
$api_key = 'pk_your_api_key_here';
$base_url = 'https://your-domain.com/api/v1';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $base_url . '/customers');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'X-API-KEY: ' . $api_key,
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$customers = json_decode($response, true);

// Create a new ticket
$ticket_data = [
    'subject' => 'New support request',
    'message' => 'Customer needs help with API integration',
    'department' => 1,
    'priority' => 2
];

curl_setopt($ch, CURLOPT_URL, $base_url . '/tickets');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($ticket_data));

$ticket_response = curl_exec($ch);
curl_close($ch);`,
    },
    {
      title: 'JavaScript',
      language: 'javascript',
      code: `// Using fetch API
const API_KEY = 'pk_your_api_key_here';
const BASE_URL = 'https://your-domain.com/api/v1';

// Get all invoices
async function getInvoices() {
  const response = await fetch(\`\${BASE_URL}/invoices\`, {
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  return data;
}

// Create a new lead
async function createLead(leadData) {
  const response = await fetch(\`\${BASE_URL}/leads\`, {
    method: 'POST',
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(leadData)
  });
  
  return await response.json();
}

// Webhook handler
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const payload = JSON.stringify(req.body);
  
  // Verify signature
  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  
  if (signature === expectedSignature) {
    // Process webhook
    console.log('Webhook received:', req.body);
    res.status(200).send('OK');
  } else {
    res.status(401).send('Invalid signature');
  }
});`,
    },
    {
      title: 'Python',
      language: 'python',
      code: `import requests
import json
import hmac
import hashlib

# Configuration
API_KEY = 'pk_your_api_key_here'
BASE_URL = 'https://your-domain.com/api/v1'

headers = {
    'X-API-KEY': API_KEY,
    'Content-Type': 'application/json'
}

# Get all projects
def get_projects():
    response = requests.get(f'{BASE_URL}/projects', headers=headers)
    return response.json()

# Create a new customer
def create_customer(customer_data):
    response = requests.post(
        f'{BASE_URL}/customers',
        headers=headers,
        json=customer_data
    )
    return response.json()

# Update ticket status
def update_ticket_status(ticket_id, status):
    response = requests.put(
        f'{BASE_URL}/tickets/{ticket_id}',
        headers=headers,
        json={'status': status}
    )
    return response.json()

# Verify webhook signature
def verify_webhook(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(expected, signature)

# Example usage
projects = get_projects()
print(f"Found {projects['total']} projects")`,
    },
    {
      title: 'cURL',
      language: 'bash',
      code: `# Get all customers with pagination
curl -X GET "https://your-domain.com/api/v1/customers?page=1&limit=20" \\
  -H "X-API-KEY: pk_your_api_key_here" \\
  -H "Content-Type: application/json"

# Create a new invoice
curl -X POST "https://your-domain.com/api/v1/invoices" \\
  -H "X-API-KEY: pk_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "clientid": 1,
    "date": "2024-01-15",
    "duedate": "2024-02-15",
    "items": [{
      "description": "API Integration Service",
      "qty": 1,
      "rate": 500.00
    }]
  }'

# Update lead status
curl -X PUT "https://your-domain.com/api/v1/leads/123" \\
  -H "X-API-KEY: pk_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{"status": 2}'

# Test webhook endpoint
curl -X POST "https://your-domain.com/api/v1/webhooks/test" \\
  -H "X-API-KEY: pk_your_api_key_here" \\
  -H "Content-Type: application/json"`,
    },
  ];

  return (
    <section id="code" className="py-20 bg-slate-900">
      <div className="max-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-800 rounded-full mb-6">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-green-400">
              Developer Friendly
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Start Building in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
              Minutes
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Simple, intuitive API with comprehensive documentation and examples in your favorite language
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-800 rounded-2xl overflow-hidden"
        >
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-700">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === index
                    ? 'bg-slate-700 text-white border-b-2 border-primary-500'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {example.title}
              </button>
            ))}
          </div>

          {/* Code Display */}
          <div className="relative">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => copyToClipboard(examples[activeTab].code, activeTab)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                {copiedIndex === activeTab ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-400">Copy</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-6 overflow-x-auto">
              <code className="text-sm text-slate-300 font-mono">
                {examples[activeTab].code}
              </code>
            </pre>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'Comprehensive Docs',
              description: 'Detailed API documentation with examples for every endpoint',
            },
            {
              title: 'Client Libraries',
              description: 'Ready-to-use client libraries for PHP, JavaScript, and Python',
            },
            {
              title: 'Postman Collection',
              description: '100+ pre-configured requests to test and explore the API',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CodeExamples;