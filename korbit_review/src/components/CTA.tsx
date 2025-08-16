'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Sparkles, Clock, Shield } from 'lucide-react';

const CTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="purchase" className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-container section-padding">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">
              Limited Time Offer - 40% OFF
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Ready to Transform Your PerfexCRM?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
          >
            Join 500+ companies already using our API & Webhooks module to automate their workflows and integrate with 1000+ applications
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            <div className="flex items-center space-x-2 text-white">
              <Clock className="w-5 h-5" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Shield className="w-5 h-5" />
              <span>30-Day Money Back</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Sparkles className="w-5 h-5" />
              <span>Free Updates</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://codecanyon.net/item/perfex-api-webhooks/12345678"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Get Regular License - $89
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="https://codecanyon.net/item/perfex-api-webhooks/12345678?license=extended"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent-500 text-white rounded-full font-semibold text-lg hover:bg-accent-600 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Get Extended License - $449
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </motion.div>

          {/* Urgency */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10"
          >
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30"
                  />
                ))}
              </div>
              <span className="text-white text-sm">
                <span className="font-semibold">47 people</span> purchased in the last 24 hours
              </span>
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10"
          >
            <p className="text-white/80 mb-4">Offer ends in:</p>
            <div className="flex justify-center space-x-4">
              {[
                { value: '02', label: 'Days' },
                { value: '14', label: 'Hours' },
                { value: '37', label: 'Minutes' },
                { value: '29', label: 'Seconds' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[60px]">
                    <div className="text-2xl font-bold text-white">{item.value}</div>
                  </div>
                  <div className="text-xs text-white/70 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;