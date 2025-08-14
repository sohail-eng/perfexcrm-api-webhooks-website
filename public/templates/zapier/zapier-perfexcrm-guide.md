# Zapier Integration Guide for PerfexCRM API

## Quick Start Templates

### 1. Create Lead from Google Forms
**Trigger:** New Google Form Response  
**Action:** Create Lead in PerfexCRM

```javascript
// Zapier Code Step
const leadData = {
  name: inputData.name,
  email: inputData.email,
  phone: inputData.phone,
  company: inputData.company,
  source: 'Google Forms',
  status: 'new'
};

const response = await fetch('https://your-perfexcrm.com/api/leads', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(leadData)
});

return await response.json();
```

### 2. Sync Stripe Payments to PerfexCRM Invoices
**Trigger:** New Payment in Stripe  
**Action:** Update Invoice in PerfexCRM

```javascript
// Zapier Code Step
const invoiceUpdate = {
  invoice_id: inputData.metadata.invoice_id,
  status: 'paid',
  payment_method: inputData.payment_method,
  payment_date: inputData.created,
  transaction_id: inputData.id
};

const response = await fetch(`https://your-perfexcrm.com/api/invoices/${invoiceUpdate.invoice_id}/payment`, {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(invoiceUpdate)
});

return await response.json();
```

### 3. Create Task from Slack Message
**Trigger:** New Starred Message in Slack  
**Action:** Create Task in PerfexCRM

```javascript
// Zapier Code Step
const taskData = {
  name: inputData.text.substring(0, 100),
  description: inputData.text,
  priority: 'medium',
  assigned_to: inputData.user_email,
  due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  tags: ['slack', 'automated']
};

const response = await fetch('https://your-perfexcrm.com/api/tasks', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(taskData)
});

return await response.json();
```

### 4. Email Campaign Integration
**Trigger:** New Contact in Mailchimp  
**Action:** Create Customer in PerfexCRM

```javascript
// Zapier Code Step
const customerData = {
  company: inputData.company || inputData.email.split('@')[1],
  email: inputData.email,
  first_name: inputData.first_name,
  last_name: inputData.last_name,
  phone: inputData.phone,
  address: inputData.address,
  city: inputData.city,
  state: inputData.state,
  zip: inputData.zip,
  country: inputData.country,
  source: 'Mailchimp'
};

const response = await fetch('https://your-perfexcrm.com/api/customers', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(customerData)
});

return await response.json();
```

## Webhook Setup in Zapier

1. **Create a Zap**
2. **Choose Webhooks by Zapier** as trigger
3. **Select "Catch Hook"**
4. **Copy the webhook URL**
5. **Configure in PerfexCRM:**
   - Go to Settings > Webhooks
   - Add new webhook
   - Paste Zapier webhook URL
   - Select events to trigger

## Common Use Cases

- **Lead Management:** Capture leads from multiple sources
- **Invoice Automation:** Sync payments and send reminders
- **Task Management:** Create tasks from various triggers
- **Customer Sync:** Keep customer data synchronized
- **Email Notifications:** Send custom notifications
- **Report Generation:** Automate report creation

## Authentication

Use API Token authentication:
```
Authorization: Bearer YOUR_API_TOKEN
```

## Rate Limits

- 1000 requests per hour
- Bulk operations: 100 items per request

## Support

For assistance, contact support@perfexapi.com