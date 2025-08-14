'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Zap, Shield, Code, Globe } from 'lucide-react';
import Image from 'next/image';
import { useTestMode } from '@/contexts/TestModeContext';

const Hero = () => {
  const { bannerHeight } = useTestMode();
  
  const features = [
    'Complete REST API for all PerfexCRM entities',
    '40+ webhook events for real-time automation',
    'Native n8n, Zapier & Make.com integration',
    'Enterprise-grade security & rate limiting',
  ];

  return (
    <section 
      className="relative pb-20 overflow-hidden"
      style={{ paddingTop: `${bannerHeight + 128}px` }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-200 rounded-full blur-3xl opacity-20" />

      <div className="relative max-container section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 rounded-full mb-6"
            >
              <Zap className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">
                Transform Your PerfexCRM
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
            >
              Professional <span className="gradient-text">REST API</span> &{' '}
              <span className="gradient-text">Webhooks</span> Module
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-slate-600 mb-8"
            >
              Unlock the full potential of your PerfexCRM with enterprise-grade API access, 
              real-time webhooks, and seamless integration with 1000+ automation platforms.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3 mb-8"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#purchase"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Get Instant Access
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-full font-semibold text-lg hover:border-primary-500 hover:text-primary-600 transition-all duration-300"
              >
                View Demo
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center space-x-6 mt-8"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 border-2 border-white"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-slate-600 mt-1">
                  <span className="font-semibold">500+</span> happy customers
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative lg:pl-8"
          >
            <div className="relative">
              {/* Floating badges */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -left-4 bg-white rounded-lg shadow-xl p-3 z-10"
              >
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-semibold">Secure API</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-xl p-3 z-10"
              >
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-semibold">1000+ Integrations</span>
                </div>
              </motion.div>

              {/* Main dashboard image */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <Code className="w-5 h-5 text-slate-400" />
                </div>
                
                {/* Code preview */}
                <div className="font-mono text-sm">
                  <div className="text-green-400 mb-2">// Get all customers</div>
                  <div className="text-slate-300">
                    <span className="text-blue-400">GET</span> /api/v1/customers
                  </div>
                  <div className="text-slate-500 mt-4">Response:</div>
                  <div className="text-slate-300">
                    {`{
  "status": "success",
  "data": [{
    "id": 1,
    "company": "Acme Corp",
    "email": "contact@acme.com",
    "created_at": "2024-01-15"
  }],
  "total": 127
}`}
                  </div>
                </div>

                {/* Activity indicators */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-600">
                  <div className="flex items-center space-x-2">
                    <div className="pulse-dot">
                      <span />
                    </div>
                    <span className="text-xs text-slate-400">API Active</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    1,247 requests today
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;