'use client';

import { motion } from 'framer-motion';
import { FileText, ArrowLeft, Scale, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
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
            <Scale className="w-10 h-10 text-primary-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            Please read these terms carefully before using our services
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-slate-500 mt-4"
          >
            Effective Date: January 15, 2024
          </motion.p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg"
            >
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-amber-900 font-semibold mb-2">Important Notice</p>
                  <p className="text-amber-800">
                    By purchasing and using the PerfexCRM API & Webhooks Module, you agree to be bound by these
                    terms of service and our license agreement.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600">
                By accessing or using the PerfexCRM API & Webhooks Module ("the Service"), you agree to be
                bound by these Terms of Service ("Terms"). If you disagree with any part of these terms,
                then you may not access the Service.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4">2. License and Usage</h2>
              <p className="text-slate-600 mb-3">
                The Service is licensed, not sold. Your use of the Service is governed by the license agreement
                applicable to your purchase:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Regular License: Single domain/installation use</li>
                <li>Extended License: Multiple domains/installations and SaaS applications</li>
                <li>All licenses prohibit redistribution of source code</li>
                <li>Modification for personal use is permitted</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">3. Account Responsibilities</h2>
              <p className="text-slate-600">
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mt-3">
                <li>Maintaining the confidentiality of your API keys and credentials</li>
                <li>All activities that occur under your account</li>
                <li>Ensuring your use complies with all applicable laws and regulations</li>
                <li>Keeping your PerfexCRM installation secure and up-to-date</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4">4. Prohibited Uses</h2>
              <p className="text-slate-600 mb-3">
                You may not use the Service to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Distribute malware or harmful code</li>
                <li>Attempt to gain unauthorized access to systems</li>
                <li>Resell or redistribute the module without authorization</li>
                <li>Remove or alter copyright notices</li>
                <li>Use the Service for illegal or unethical purposes</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">5. Support and Updates</h2>
              <p className="text-slate-600">
                Support and updates are provided according to your license type:
              </p>
              <div className="bg-slate-50 rounded-lg p-4 mt-3">
                <p className="text-slate-700 font-semibold">Regular License:</p>
                <ul className="list-disc pl-6 mt-2 text-slate-600">
                  <li>6 months of technical support</li>
                  <li>1 year of updates</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 mt-3">
                <p className="text-slate-700 font-semibold">Extended License:</p>
                <ul className="list-disc pl-6 mt-2 text-slate-600">
                  <li>12 months of priority support</li>
                  <li>Lifetime updates</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-4">6. Payment Terms</h2>
              <p className="text-slate-600">
                All purchases are final and processed through Stripe. Prices are in USD and may be subject
                to applicable taxes. We offer a 30-day money-back guarantee as outlined in our refund policy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
              <p className="text-slate-600">
                The Service and its original content, features, and functionality are owned by PerfexAPI Solutions
                and are protected by international copyright, trademark, patent, trade secret, and other
                intellectual property laws.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-slate-600">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
              <p className="text-slate-600">
                IN NO EVENT SHALL PERFEXAPI SOLUTIONS, ITS DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION,
                LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF
                THE SERVICE.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <h2 className="text-2xl font-bold mb-4">10. Indemnification</h2>
              <p className="text-slate-600">
                You agree to defend, indemnify, and hold harmless PerfexAPI Solutions and its affiliates from
                and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or
                fees arising out of or relating to your violation of these Terms or your use of the Service.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <h2 className="text-2xl font-bold mb-4">11. Termination</h2>
              <p className="text-slate-600">
                We may terminate or suspend your access to the Service immediately, without prior notice or
                liability, for any reason whatsoever, including without limitation if you breach the Terms.
                Upon termination, your right to use the Service will cease immediately.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
              <p className="text-slate-600">
                We reserve the right to modify or replace these Terms at any time. If a revision is material,
                we will provide at least 30 days\' notice prior to any new terms taking effect.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">13. Governing Law</h2>
              <p className="text-slate-600">
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction
                in which PerfexAPI Solutions operates, without regard to its conflict of law provisions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
              <p className="text-slate-600">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="bg-slate-50 rounded-lg p-4 mt-3">
                <p className="text-slate-700">
                  <strong>Email:</strong> legal@perfexapi.com
                </p>
                <p className="text-slate-700">
                  <strong>Address:</strong> PerfexAPI Solutions, Legal Department
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Agreement Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <FileText className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Agreement</h2>
            <p className="text-slate-600 mb-6">
              By using the PerfexCRM API & Webhooks Module, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/license"
                className="px-6 py-3 bg-white border-2 border-primary-500 text-primary-600 rounded-lg font-semibold hover:bg-primary-50"
              >
                View License Agreement
              </Link>
              <Link
                href="/privacy"
                className="px-6 py-3 bg-white border-2 border-primary-500 text-primary-600 rounded-lg font-semibold hover:bg-primary-50"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}