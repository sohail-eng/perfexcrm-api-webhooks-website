'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What version of PerfexCRM is required?',
      answer: 'Our module is compatible with PerfexCRM version 2.0 and above. We regularly update the module to ensure compatibility with the latest PerfexCRM releases.',
    },
    {
      question: 'Is this a one-time payment or subscription?',
      answer: 'This is a one-time payment with lifetime ownership. You get the module, all current features, and free updates for the specified period (1 year for regular license, lifetime for extended license).',
    },
    {
      question: 'Can I use this module on multiple domains?',
      answer: 'The Regular License allows usage on a single domain. If you need to use the module on multiple domains or in a SaaS application, you will need the Extended License.',
    },
    {
      question: 'How does the n8n integration work?',
      answer: 'We provide 4 pre-built n8n workflows that you can import directly into your n8n instance. These workflows cover common automation scenarios like lead conversion, invoice processing, ticket routing, and customer onboarding. You can also create custom workflows using our API endpoints.',
    },
    {
      question: 'What authentication methods are supported?',
      answer: 'The module supports three authentication methods: API Keys (with pk_ prefix for added security), JWT tokens for session-based auth, and OAuth 2.0 for third-party integrations.',
    },
    {
      question: 'How secure is the API?',
      answer: 'Security is our top priority. The module includes rate limiting, HMAC-SHA256 webhook signatures, IP whitelisting, SQL injection prevention, XSS protection, and timing-safe authentication. All API keys are hashed before storage.',
    },
    {
      question: 'Can I customize the webhook events?',
      answer: 'Yes! While we provide 40+ pre-configured webhook events, you can easily add custom events or modify existing ones. The webhook system is fully extensible.',
    },
    {
      question: 'Do you provide installation support?',
      answer: 'Yes, we provide comprehensive installation documentation. Extended License customers also get direct installation assistance from our team. We also offer paid installation service for Regular License customers.',
    },
    {
      question: 'What happens if I need help after purchase?',
      answer: 'You get 6 months of support with Regular License and 12 months with Extended License. Support includes bug fixes, answering questions, and helping with basic customization. Extended support can be purchased separately after the initial period.',
    },
    {
      question: 'Can I test the API before purchasing?',
      answer: 'We provide detailed documentation, video demos, and screenshots. While we do not offer a trial version, we have a 30-day money-back guarantee if the module does not meet your requirements.',
    },
    {
      question: 'Will this work with my existing PerfexCRM modules?',
      answer: 'Yes, our module is designed to work alongside other PerfexCRM modules. It does not modify core files and uses PerfexCRM hooks and standards for maximum compatibility.',
    },
    {
      question: 'How often do you release updates?',
      answer: 'We release updates regularly, typically monthly, to add new features, improve performance, and ensure compatibility with the latest PerfexCRM versions. All updates are free during your update period.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="max-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 rounded-full mb-6">
            <HelpCircle className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">
              Got Questions?
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Everything you need to know about the PerfexCRM API & Webhooks Module
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 text-left"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-primary-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-white border-t border-slate-100">
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-600 mb-4">
            Still have questions? We are here to help!
          </p>
          <a
            href="mailto:support@perfexapi.com"
            className="inline-flex items-center px-6 py-3 bg-white border-2 border-primary-500 text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-colors duration-300"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;