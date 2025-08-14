'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, CreditCard, Key, AlertCircle, CheckCircle, 
  ExternalLink, Copy, Eye, EyeOff, Loader2 
} from 'lucide-react';

interface StripeSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function StripeSetupModal({ isOpen, onClose, onSuccess }: StripeSetupModalProps) {
  const [step, setStep] = useState(1);
  const [publishableKey, setPublishableKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  const handleSubmit = async () => {
    setError('');
    
    if (!publishableKey || !secretKey) {
      setError('Both keys are required');
      return;
    }

    if (!publishableKey.startsWith('pk_')) {
      setError('Invalid publishable key format');
      return;
    }

    if (!secretKey.startsWith('sk_')) {
      setError('Invalid secret key format');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/stripe/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publishableKey, secretKey }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to connect Stripe');
      }

      // Success!
      setStep(3);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center">
              <CreditCard className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-xl font-bold">Connect Stripe Account</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-semibold text-blue-900 mb-2">How to get your Stripe API keys:</p>
                      <ol className="list-decimal list-inside space-y-1 text-blue-800">
                        <li>Log in to your Stripe Dashboard</li>
                        <li>Navigate to Developers → API keys</li>
                        <li>Copy your Publishable key and Secret key</li>
                        <li>For testing, use test mode keys (starting with pk_test_ and sk_test_)</li>
                      </ol>
                      <a
                        href="https://dashboard.stripe.com/apikeys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-3 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Open Stripe Dashboard
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
                >
                  I have my API keys
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publishable Key
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={publishableKey}
                      onChange={(e) => setPublishableKey(e.target.value)}
                      placeholder="pk_test_... or pk_live_..."
                      className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                    />
                    <button
                      type="button"
                      onClick={() => copyToClipboard(publishableKey, 'pk')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {copied === 'pk' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    This key is safe to use in your frontend code
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secret Key
                  </label>
                  <div className="relative">
                    <input
                      type={showSecretKey ? 'text' : 'password'}
                      value={secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                      placeholder="sk_test_... or sk_live_..."
                      className="w-full px-4 py-3 pr-20 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowSecretKey(!showSecretKey)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showSecretKey ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(secretKey, 'sk')}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {copied === 'sk' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Keep this key secure and never share it publicly
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm text-amber-800">
                      <p className="font-semibold mb-1">Test Mode Recommended</p>
                      <p>Start with test keys to ensure everything works before going live.</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !publishableKey || !secretKey}
                    className="flex-1 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Connecting...
                      </>
                    ) : (
                      'Connect Stripe'
                    )}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Successfully Connected!</h3>
                <p className="text-gray-600">Your Stripe account has been connected successfully.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}