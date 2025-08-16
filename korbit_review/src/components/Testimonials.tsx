'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      name: 'David Chen',
      role: 'CTO at TechFlow Solutions',
      avatar: 'DC',
      content: 'This API module transformed how we integrate PerfexCRM with our other systems. The n8n workflows alone saved us weeks of development time. Absolutely worth every penny!',
      rating: 5,
    },
    {
      name: 'Sarah Martinez',
      role: 'Operations Manager at CloudSync',
      avatar: 'SM',
      content: 'Finally, a proper API for PerfexCRM! The webhook system is rock solid, and the documentation is excellent. We automated our entire customer onboarding process.',
      rating: 5,
    },
    {
      name: 'Michael Brown',
      role: 'Lead Developer at DataBridge Inc',
      avatar: 'MB',
      content: 'The security features are enterprise-grade. Rate limiting, HMAC signatures, multiple auth methods - everything we needed for our SaaS integration.',
      rating: 5,
    },
    {
      name: 'Emma Wilson',
      role: 'Product Manager at AutoFlow',
      avatar: 'EW',
      content: 'Seamless integration with Zapier and Make.com. Our team can now create automations without any coding. The pre-built workflows are a huge time-saver.',
      rating: 5,
    },
    {
      name: 'James Lee',
      role: 'CEO at StreamlineOps',
      avatar: 'JL',
      content: 'Outstanding support from the developer. They helped us set up complex workflows and even added custom features we requested. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Lisa Anderson',
      role: 'Tech Lead at ConnectHub',
      avatar: 'LA',
      content: 'The API performance is impressive. We are processing thousands of requests daily without any issues. The rate limiting keeps everything stable.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Loved by{' '}
            <span className="gradient-text">500+ Companies</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See what our customers are saying about the PerfexCRM API & Webhooks Module
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <Quote className="w-8 h-8 text-primary-200 mb-4" />
              
              <p className="text-slate-600 mb-6">
                {testimonial.content}
              </p>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-primary-50 to-accent-50 rounded-3xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Happy Customers' },
              { value: '4.8/5', label: 'Average Rating' },
              { value: '100%', label: 'Code Quality' },
              { value: '24h', label: 'Support Response' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;