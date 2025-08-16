'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X, Zap, Shield, HeadphonesIcon, RefreshCw } from 'lucide-react';
import StripeCheckout from './StripeCheckout';

const Pricing = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      name: 'Regular License',
      price: '$89',
      originalPrice: '$149',
      description: 'Perfect for single PerfexCRM installation',
      popular: false,
      priceId: process.env.NEXT_PUBLIC_STRIPE_REGULAR_PRICE_ID || 'price_1OExampleRegularLicense123',
      licenseType: 'regular' as const,
      features: [
        { text: 'Single domain license', included: true },
        { text: 'All API endpoints', included: true },
        { text: '40+ webhook events', included: true },
        { text: 'n8n workflows included', included: true },
        { text: 'Postman collection', included: true },
        { text: '6 months support', included: true },
        { text: 'Free updates for 1 year', included: true },
        { text: 'Installation guide', included: true },
        { text: 'Multi-domain use', included: false },
        { text: 'White-label option', included: false },
      ],
      cta: 'Purchase Now',
    },
    {
      name: 'Extended License',
      price: '$449',
      originalPrice: '$699',
      description: 'For SaaS applications and reselling',
      popular: true,
      priceId: process.env.NEXT_PUBLIC_STRIPE_EXTENDED_PRICE_ID || 'price_1OExampleExtendedLicense456',
      licenseType: 'extended' as const,
      features: [
        { text: 'Unlimited domains', included: true },
        { text: 'All API endpoints', included: true },
        { text: '40+ webhook events', included: true },
        { text: 'n8n workflows included', included: true },
        { text: 'Postman collection', included: true },
        { text: '12 months priority support', included: true },
        { text: 'Lifetime updates', included: true },
        { text: 'Installation assistance', included: true },
        { text: 'Use in SaaS application', included: true },
        { text: 'White-label option', included: true },
      ],
      cta: 'Get Extended License',
    },
  ];

  const guarantees = [
    {
      icon: Shield,
      title: '30-Day Money Back',
      description: 'Not satisfied? Get a full refund within 30 days',
    },
    {
      icon: RefreshCw,
      title: 'Free Updates',
      description: 'Get all future updates and improvements',
    },
    {
      icon: HeadphonesIcon,
      title: 'Premium Support',
      description: 'Direct support from the development team',
    },
    {
      icon: Zap,
      title: 'Instant Download',
      description: 'Get started immediately after purchase',
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-green-700">
              Limited Time Offer - Save 40%
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Simple, Transparent{' '}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            One-time payment, no hidden fees, lifetime ownership
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className={`relative bg-white rounded-2xl ${
                plan.popular
                  ? 'ring-2 ring-primary-500 shadow-xl scale-105'
                  : 'border border-slate-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-primary-600 to-accent-600 text-white text-sm font-semibold rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-600 mb-6">
                  {plan.description}
                </p>

                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-bold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="ml-3 text-2xl text-slate-400 line-through">
                    {plan.originalPrice}
                  </span>
                  <span className="ml-3 text-sm text-green-600 font-semibold">
                    SAVE {parseInt(plan.originalPrice.slice(1)) - parseInt(plan.price.slice(1))}$
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300 mr-3 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-slate-700' : 'text-slate-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <StripeCheckout
                  priceId={plan.priceId}
                  licenseType={plan.licenseType}
                  buttonText={plan.cta}
                  buttonClass={`block w-full py-3 px-6 text-center rounded-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:shadow-lg transform hover:scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl border border-slate-200"
              >
                <div className="inline-flex p-3 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  {guarantee.title}
                </h3>
                <p className="text-sm text-slate-600">
                  {guarantee.description}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-slate-600 mb-4">Trusted by 500+ companies worldwide</p>
          <div className="flex items-center justify-center space-x-8">
            <img src="https://img.shields.io/badge/CodeCanyon-Best%20Seller-green" alt="Best Seller" className="h-8" />
            <img src="https://img.shields.io/badge/Rating-4.8%2F5-yellow" alt="Rating" className="h-8" />
            <img src="https://img.shields.io/badge/Support-Premium-blue" alt="Support" className="h-8" />
            <img src="https://img.shields.io/badge/Updates-Lifetime-purple" alt="Updates" className="h-8" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;