'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Server, Lock, User, Send, TestTube, Save, Trash2, Shield, Check, X } from 'lucide-react';

const SmtpSettings = () => {
  const [config, setConfig] = useState({
    host: '',
    port: '587',
    secure: false,
    username: '',
    password: '',
    fromEmail: '',
    fromName: '',
    replyTo: ''
  });
  const [loading, setLoading] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [testing, setTesting] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    fetchSmtpConfig();
  }, []);

  const fetchSmtpConfig = async () => {
    try {
      const response = await fetch('/api/admin/smtp');
      const data = await response.json();
      
      if (data.configured && data.config) {
        setConfig({
          host: data.config.host || '',
          port: data.config.port?.toString() || '587',
          secure: data.config.secure || false,
          username: data.config.username || '',
          password: data.config.password || '',
          fromEmail: data.config.fromEmail || '',
          fromName: data.config.fromName || '',
          replyTo: data.config.replyTo || ''
        });
        setIsConfigured(true);
      }
    } catch (error) {
      console.error('Failed to fetch SMTP config:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/admin/smtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('SMTP settings saved successfully!');
        setIsConfigured(true);
        setTimeout(() => setMessage(''), 5000);
      } else {
        setError(data.error || 'Failed to save SMTP settings');
      }
    } catch (error) {
      setError('Failed to save SMTP settings');
    } finally {
      setLoading(false);
    }
  };

  const handleTest = async () => {
    if (!testEmail) {
      setError('Please enter a test email address');
      return;
    }

    setTesting(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/admin/smtp/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Test email sent successfully to ${testEmail}!`);
        setTestEmail('');
        setTimeout(() => setMessage(''), 5000);
      } else {
        setError(data.error || 'Failed to send test email');
      }
    } catch (error) {
      setError('Failed to send test email');
    } finally {
      setTesting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete the SMTP configuration?')) {
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/admin/smtp', {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('SMTP configuration deleted successfully');
        setConfig({
          host: '',
          port: '587',
          secure: false,
          username: '',
          password: '',
          fromEmail: '',
          fromName: '',
          replyTo: ''
        });
        setIsConfigured(false);
        setTimeout(() => setMessage(''), 5000);
      } else {
        setError(data.error || 'Failed to delete SMTP configuration');
      }
    } catch (error) {
      setError('Failed to delete SMTP configuration');
    } finally {
      setLoading(false);
    }
  };

  const commonProviders = [
    { name: 'Gmail', host: 'smtp.gmail.com', port: 587, secure: false },
    { name: 'Outlook', host: 'smtp-mail.outlook.com', port: 587, secure: false },
    { name: 'SendGrid', host: 'smtp.sendgrid.net', port: 587, secure: false },
    { name: 'Mailgun', host: 'smtp.mailgun.org', port: 587, secure: false },
    { name: 'Amazon SES', host: 'email-smtp.us-east-1.amazonaws.com', port: 587, secure: false },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">SMTP Email Settings</h2>
            <p className="text-gray-600">Configure email delivery for license keys and notifications</p>
          </div>
        </div>
        {isConfigured && (
          <div className="flex items-center space-x-2 text-green-600">
            <Check className="w-5 h-5" />
            <span className="font-medium">Configured</span>
          </div>
        )}
      </div>

      {/* Common Providers Quick Setup */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800 mb-2 font-medium">Quick Setup:</p>
        <div className="flex flex-wrap gap-2">
          {commonProviders.map((provider) => (
            <button
              key={provider.name}
              onClick={() => setConfig({
                ...config,
                host: provider.host,
                port: provider.port.toString(),
                secure: provider.secure
              })}
              className="px-3 py-1 bg-white text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              {provider.name}
            </button>
          ))}
        </div>
      </div>

      {/* SMTP Configuration Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SMTP Host */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Host
            </label>
            <div className="relative">
              <Server className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={config.host}
                onChange={(e) => setConfig({ ...config, host: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="smtp.gmail.com"
                required
              />
            </div>
          </div>

          {/* Port */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Port
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={config.port}
                onChange={(e) => setConfig({ 
                  ...config, 
                  port: e.target.value,
                  secure: e.target.value === '465'
                })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="25">25 (No encryption)</option>
                <option value="587">587 (STARTTLS)</option>
                <option value="465">465 (SSL/TLS)</option>
                <option value="2525">2525 (Alternative)</option>
              </select>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {config.port === '465' ? 'SSL/TLS encryption' : config.port === '587' ? 'STARTTLS encryption' : 'No encryption'}
            </p>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={config.username}
                onChange={(e) => setConfig({ ...config, username: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your-email@gmail.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password / App Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={config.password}
                onChange={(e) => setConfig({ ...config, password: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={isConfigured ? 'Enter new password to change' : 'Enter password'}
                required={!isConfigured}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              For Gmail, use an App Password instead of your regular password
            </p>
          </div>

          {/* From Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={config.fromEmail}
                onChange={(e) => setConfig({ ...config, fromEmail: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="noreply@yourdomain.com"
                required
              />
            </div>
          </div>

          {/* From Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Name
            </label>
            <input
              type="text"
              value={config.fromName}
              onChange={(e) => setConfig({ ...config, fromName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="PerfexAPI"
              required
            />
          </div>

          {/* Reply To (Optional) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reply To Email (Optional)
            </label>
            <input
              type="email"
              value={config.replyTo}
              onChange={(e) => setConfig({ ...config, replyTo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="support@yourdomain.com"
            />
            <p className="mt-1 text-xs text-gray-500">
              Leave empty to use the From Email as Reply To address
            </p>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <p className="text-green-800 flex items-center">
              <Check className="w-5 h-5 mr-2" />
              {message}
            </p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-red-800 flex items-center">
              <X className="w-5 h-5 mr-2" />
              {error}
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Settings'}
            </button>

            {isConfigured && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Config
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Test Email Section */}
      {isConfigured && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Email Delivery</h3>
          <div className="flex space-x-3">
            <div className="flex-1">
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email to send test"
              />
            </div>
            <button
              onClick={handleTest}
              disabled={testing || !testEmail}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <TestTube className="w-4 h-4 mr-2" />
              {testing ? 'Sending...' : 'Send Test'}
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Send a test email to verify your SMTP configuration is working correctly
          </p>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Configuration Help:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• For Gmail: Enable 2-factor authentication and use an App Password</li>
          <li>• For Outlook: Use your email and password, or app password if 2FA is enabled</li>
          <li>• Port 587 with STARTTLS is recommended for most providers</li>
          <li>• Port 465 uses SSL/TLS encryption (older standard)</li>
          <li>• Test your configuration after saving to ensure emails are delivered</li>
        </ul>
      </div>
    </div>
  );
};

export default SmtpSettings;