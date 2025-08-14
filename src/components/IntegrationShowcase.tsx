'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Workflow, Webhook, Sparkles } from 'lucide-react';

const IntegrationShowcase = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const integrations = [
    {
      name: 'n8n',
      logo: '🔄',
      description: 'Native n8n integration with pre-built workflows',
      color: 'bg-orange-100 text-orange-600',
      features: ['4 Pre-built workflows', 'Custom nodes', 'Real-time sync'],
    },
    {
      name: 'Zapier',
      logo: '⚡',
      description: 'Connect with 5000+ apps through Zapier',
      color: 'bg-purple-100 text-purple-600',
      features: ['Instant triggers', 'Multi-step zaps', 'Filters & paths'],
    },
    {
      name: 'Make.com',
      logo: '🔧',
      description: 'Visual automation with Make (Integromat)',
      color: 'bg-blue-100 text-blue-600',
      features: ['Visual builder', 'Advanced routing', 'Error handling'],
    },
    {
      name: 'Pabbly',
      logo: '📊',
      description: 'Automate workflows with Pabbly Connect',
      color: 'bg-green-100 text-green-600',
      features: ['Unlimited operations', 'Multi-step workflows', 'Scheduling'],
    },
  ];

  const workflows = [
    {
      title: 'Lead to Customer Automation',
      description: 'Automatically convert qualified leads to customers, create projects, and send welcome emails',
      steps: ['Lead qualifies', 'Convert to customer', 'Create project', 'Send email'],
    },
    {
      title: 'Invoice Payment Workflow',
      description: 'Process payments, update records, and trigger follow-up actions automatically',
      steps: ['Payment received', 'Update invoice', 'Log activity', 'Send receipt'],
    },
    {
      title: 'Support Ticket Routing',
      description: 'Intelligently route tickets based on priority, department, and customer status',
      steps: ['Ticket created', 'Analyze priority', 'Assign to team', 'Send notification'],
    },
    {
      title: 'Customer Onboarding',
      description: 'Streamline customer onboarding with automated tasks and communications',
      steps: ['Customer created', 'Setup account', 'Create tasks', 'Schedule follow-up'],
    },
  ];

  return (
    <section id="integrations" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent-100 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-accent-600" />
            <span className="text-sm font-semibold text-accent-700">
              Powerful Integrations
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Connect with Your{' '}
            <span className="gradient-text">Favorite Tools</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Seamlessly integrate PerfexCRM with 1000+ applications and automate your entire workflow
          </p>
        </motion.div>

        {/* Integration Platforms */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${integration.color} text-3xl mb-4`}>
                {integration.logo}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {integration.name}
              </h3>
              <p className="text-slate-600 mb-4">
                {integration.description}
              </p>
              <ul className="space-y-2">
                {integration.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-slate-600">
                    <ArrowRight className="w-4 h-4 mr-2 text-primary-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Pre-built Workflows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 lg:p-12"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Pre-built n8n Workflows Included
            </h3>
            <p className="text-lg text-slate-600">
              Get started immediately with our ready-to-use automation templates
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {workflows.map((workflow, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg">
                    <Workflow className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">
                      {workflow.title}
                    </h4>
                    <p className="text-sm text-slate-600 mb-4">
                      {workflow.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {workflow.steps.map((step, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full"
                        >
                          {idx + 1}. {step}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual Connection Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center space-x-8 p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-2xl font-bold text-slate-900">PerfexCRM</div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              <div className="w-16 h-0.5 bg-primary-500" />
              <Webhook className="w-8 h-8 text-primary-500" />
              <div className="w-16 h-0.5 bg-primary-500" />
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            </div>
            <div className="text-2xl font-bold gradient-text">1000+ Apps</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntegrationShowcase;