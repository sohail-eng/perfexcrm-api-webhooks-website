'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import IntegrationShowcase from '@/components/IntegrationShowcase';
import CodeExamples from '@/components/CodeExamples';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      <main>
        <Hero />
        <Features />
        <IntegrationShowcase />
        <CodeExamples />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}