'use client';

import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Lock, Eye, UserCheck, Database } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Account information (name, email, company details)',
        'Payment information (processed securely through Stripe)',
        'API usage data and analytics',
        'Support ticket communications',
        'Module installation and activation data',
      ],
    },
    {
      icon: Lock,
      title: 'How We Protect Your Data',
      content: [
        'SSL/TLS encryption for all data transmission',
        'Secure storage with industry-standard encryption',
        'Regular security audits and updates',
        'Limited access to personal information',
        'Compliance with data protection regulations',
      ],
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'Process payments and manage licenses',
        'Provide customer support and technical assistance',
        'Send important updates about your module',
        'Improve our products and services',
        'Comply with legal obligations',
      ],
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: [
        'Access your personal data',
        'Request data correction or deletion',
        'Opt-out of marketing communications',
        'Data portability upon request',
        'Lodge complaints with supervisory authorities',
      ],
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
            <Shield className="w-10 h-10 text-primary-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-slate-500 mt-4"
          >
            Last updated: January 15, 2024
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg"
            >
              <p className="text-blue-900 font-semibold mb-2">GDPR Compliant</p>
              <p className="text-blue-800">
                We are committed to protecting your privacy and complying with the General Data Protection
                Regulation (GDPR) and other applicable data protection laws.
              </p>
            </motion.div>

            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-12"
                >
                  <div className="flex items-center mb-4">
                    <Icon className="w-8 h-8 text-primary-600 mr-3" />
                    <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                  </div>
                  <ul className="space-y-2 ml-11">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="text-slate-600 flex items-start">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}

            {/* Additional Sections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
                <p className="text-slate-600">
                  We retain your personal information only for as long as necessary to provide you with our
                  services and as described in this privacy policy. We will also retain and use your information
                  to the extent necessary to comply with our legal obligations, resolve disputes, and enforce
                  our agreements.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
                <p className="text-slate-600">
                  We use trusted third-party services for payment processing (Stripe), email communications,
                  and analytics. These services have their own privacy policies and we encourage you to review them.
                  We only share the minimum necessary information with these services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Cookies</h2>
                <p className="text-slate-600">
                  We use essential cookies to maintain your session and preferences. Analytics cookies help us
                  understand how visitors use our website. You can control cookie settings through your browser
                  preferences.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Children\'s Privacy</h2>
                <p className="text-slate-600">
                  Our services are not directed to individuals under the age of 16. We do not knowingly collect
                  personal information from children under 16. If we become aware that a child under 16 has
                  provided us with personal information, we will take steps to delete such information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
                <p className="text-slate-600">
                  Your information may be transferred to and maintained on servers located outside of your
                  jurisdiction. We ensure that such transfers comply with applicable data protection laws
                  and that your information remains protected.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
                <p className="text-slate-600">
                  We may update this privacy policy from time to time. We will notify you of any changes by
                  posting the new privacy policy on this page and updating the "Last updated" date.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Lock className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Questions About Privacy?</h2>
            <p className="text-slate-600 mb-6">
              If you have any questions about this privacy policy or our data practices,
              please don\'t hesitate to contact us.
            </p>
            <div className="space-y-2">
              <p className="text-slate-600">
                <strong>Email:</strong> privacy@perfexapi.com
              </p>
              <p className="text-slate-600">
                <strong>Address:</strong> PerfexAPI Solutions, Privacy Department
              </p>
            </div>
            <Link
              href="/support"
              className="inline-block mt-6 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* Legal Links */}
      <section className="py-8 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/terms" className="text-slate-600 hover:text-primary-600">
              Terms of Service
            </Link>
            <Link href="/license" className="text-slate-600 hover:text-primary-600">
              License Agreement
            </Link>
            <Link href="/refund" className="text-slate-600 hover:text-primary-600">
              Refund Policy
            </Link>
            <a href="https://gdpr.eu/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-primary-600">
              GDPR Information
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}