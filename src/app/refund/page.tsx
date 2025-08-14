'use client';

import { motion } from 'framer-motion';
import { RefreshCw, ArrowLeft, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RefundPage() {
  const eligibleReasons = [
    'Module does not work as described',
    'Critical bugs that prevent normal operation',
    'Incompatibility with your PerfexCRM version (if requirements were met)',
    'Missing advertised features',
    'License key issues that cannot be resolved',
  ];

  const nonEligibleReasons = [
    'Change of mind or no longer needed',
    'Found a cheaper alternative',
    'Lack of features that were not advertised',
    'Issues caused by third-party modules or customizations',
    'Server or hosting-related problems',
    'Not reading documentation before purchase',
  ];

  const refundProcess = [
    {
      step: 1,
      title: 'Contact Support',
      description: 'Reach out to our support team within 30 days of purchase with your issue.',
      timeframe: 'Within 30 days',
    },
    {
      step: 2,
      title: 'Troubleshooting',
      description: 'Work with our team to attempt to resolve any technical issues.',
      timeframe: '24-48 hours',
    },
    {
      step: 3,
      title: 'Evaluation',
      description: 'If issues cannot be resolved, we\'ll evaluate your refund request.',
      timeframe: '1-2 business days',
    },
    {
      step: 4,
      title: 'Refund Processing',
      description: 'Approved refunds are processed through the original payment method.',
      timeframe: '5-7 business days',
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
            <RefreshCw className="w-10 h-10 text-primary-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            30-Day Money-Back Guarantee
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            We stand behind our product. If you\'re not satisfied, we offer a fair refund policy.
          </motion.p>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center"
            >
              <Clock className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">30-Day Window</h3>
              <p className="text-slate-600">
                Request a refund within 30 days of your purchase date
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center"
            >
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fair Evaluation</h3>
              <p className="text-slate-600">
                We evaluate each request fairly and work to resolve issues first
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center"
            >
              <RefreshCw className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Processing</h3>
              <p className="text-slate-600">
                Approved refunds processed within 5-7 business days
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Refund Eligibility</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Eligible */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl p-6"
            >
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold">Eligible for Refund</h3>
              </div>
              <ul className="space-y-3">
                {eligibleReasons.map((reason, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-slate-600">{reason}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Not Eligible */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl p-6"
            >
              <div className="flex items-center mb-4">
                <XCircle className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="text-xl font-semibold">Not Eligible for Refund</h3>
              </div>
              <ul className="space-y-3">
                {nonEligibleReasons.map((reason, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-slate-600">{reason}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Refund Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Refund Process</h2>
          <div className="max-w-3xl mx-auto">
            {refundProcess.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start mb-8"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold">
                  {item.step}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-slate-600 mb-1">{item.description}</p>
                  <p className="text-sm text-primary-600 font-medium">{item.timeframe}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Important Information</h2>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6"
            >
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Support First Policy</h3>
                  <p className="text-slate-600">
                    We require that you contact our support team first to attempt to resolve any issues.
                    Most problems can be solved quickly with our technical assistance.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6"
            >
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">License Deactivation</h3>
                  <p className="text-slate-600">
                    Upon refund approval, your license will be deactivated and you must remove the module
                    from your PerfexCRM installation.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6"
            >
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Processing Time</h3>
                  <p className="text-slate-600">
                    Refunds are processed through the original payment method. Bank processing times may
                    vary. Credit card refunds typically appear within 5-7 business days.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-2">How do I request a refund?</h3>
              <p className="text-slate-600">
                Contact our support team at support@perfexapi.com with your order number and detailed
                explanation of the issue you\'re experiencing.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-2">What information do I need to provide?</h3>
              <p className="text-slate-600">
                Your order number, purchase email, PerfexCRM version, PHP version, and a detailed
                description of the issue including any error messages.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-2">Can I get a partial refund?</h3>
              <p className="text-slate-600">
                We do not offer partial refunds. Refunds are processed for the full purchase amount
                if approved.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-2">What if I purchased the wrong license?</h3>
              <p className="text-slate-600">
                Contact support immediately. We can help you upgrade to the correct license type by
                paying the difference, or process a refund if within 30 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RefreshCw className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Need to Request a Refund?</h2>
          <p className="text-slate-600 mb-6">
            We\'re here to help. Contact our support team and we\'ll work to resolve your issue.
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-slate-600">
              <strong>Email:</strong> support@perfexapi.com
            </p>
            <p className="text-slate-600">
              <strong>Response Time:</strong> Within 24 hours
            </p>
          </div>
          <Link
            href="/support"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
          >
            Contact Support
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}