'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code2, Shield, Zap, Globe, Database, Key, 
  RefreshCw, FileJson, Clock, Users, Lock, Gauge 
} from 'lucide-react';

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Code2,
      title: 'Complete REST API',
      description: 'Full CRUD operations for Customers, Tickets, Invoices, Projects, Leads, Tasks, Contracts, and Staff',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: '40+ Webhook Events',
      description: 'Real-time notifications for all major events with automatic retry mechanism and HMAC-SHA256 signatures',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'API key authentication, JWT tokens, OAuth 2.0, rate limiting, and IP whitelisting for maximum protection',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Globe,
      title: 'Universal Integration',
      description: 'Native support for n8n, Zapier, Make.com, and 1000+ other automation platforms',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Database,
      title: 'Smart Data Handling',
      description: 'Pagination, filtering, sorting, and field selection for efficient data management',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Key,
      title: 'Multi-Auth Support',
      description: 'API Keys with pk_ prefix, JWT tokens, and OAuth 2.0 for flexible authentication options',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: RefreshCw,
      title: 'Auto-Retry Logic',
      description: 'Intelligent webhook retry with exponential backoff and customizable retry limits',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: FileJson,
      title: 'Postman Collection',
      description: 'Ready-to-use Postman collection with 100+ pre-configured API endpoints',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Clock,
      title: 'Rate Limiting',
      description: 'Configurable rate limits per API key with 1000 requests/hour default',
      gradient: 'from-lime-500 to-green-500',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Multiple API keys per account with granular permissions and access control',
      gradient: 'from-sky-500 to-blue-500',
    },
    {
      icon: Lock,
      title: 'GDPR Compliant',
      description: 'Built with privacy in mind, fully GDPR compliant with data encryption',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Gauge,
      title: 'Performance Metrics',
      description: 'Real-time API usage dashboard with detailed analytics and monitoring',
      gradient: 'from-red-500 to-pink-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Everything You Need for{' '}
            <span className="gradient-text">Complete Integration</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Built by developers for developers, our module provides every feature you need 
            to seamlessly integrate PerfexCRM with your existing workflow
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative p-6 bg-white rounded-2xl border border-slate-200 hover:border-transparent hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  }}
                />
                
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { value: '100+', label: 'API Endpoints' },
            { value: '40+', label: 'Webhook Events' },
            { value: '1000+', label: 'Integrations' },
            { value: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-slate-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;