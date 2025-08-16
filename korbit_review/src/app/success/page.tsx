'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Mail, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      fetchOrderDetails();
    }
  }, [sessionId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/checkout?session_id=${sessionId}`);
      const data = await response.json();
      setOrderDetails(data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>

          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-600 mb-8"
          >
            Thank you for purchasing the PerfexCRM API & Webhooks Module
          </motion.p>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-lg mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-3 text-left">
              <div className="flex justify-between py-2 border-b">
                <span className="text-slate-600">Product:</span>
                <span className="font-medium">PerfexCRM API & Webhooks Module</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-slate-600">License Type:</span>
                <span className="font-medium capitalize">
                  {orderDetails?.metadata?.licenseType || 'Regular'} License
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-slate-600">Amount Paid:</span>
                <span className="font-medium">
                  ${orderDetails?.amount ? (orderDetails.amount / 100).toFixed(2) : '0.00'}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Status:</span>
                <span className="text-green-600 font-medium">Completed</span>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-primary-50 rounded-2xl p-8 mb-8"
          >
            <h3 className="text-xl font-semibold mb-4">What happens next?</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary-600 mt-1" />
                <div>
                  <p className="font-medium">Check your email</p>
                  <p className="text-sm text-slate-600">
                    We have sent your download link and license key to your email address
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Download className="w-5 h-5 text-primary-600 mt-1" />
                <div>
                  <p className="font-medium">Download the module</p>
                  <p className="text-sm text-slate-600">
                    Use the link in your email to download the module files
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-primary-600 mt-1" />
                <div>
                  <p className="font-medium">Install and activate</p>
                  <p className="text-sm text-slate-600">
                    Follow the installation guide to set up the module in your PerfexCRM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/docs"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              View Documentation
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="mailto:support@perfexapi.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-full font-semibold hover:border-primary-500 transition-all duration-300"
            >
              Contact Support
            </a>
          </motion.div>

          {/* Support Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-sm text-slate-600"
          >
            <p>
              If you have any questions or need assistance, please contact us at{' '}
              <a href="mailto:support@perfexapi.com" className="text-primary-600 hover:underline">
                support@perfexapi.com
              </a>
            </p>
            <p className="mt-2">
              Order ID: {sessionId}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}