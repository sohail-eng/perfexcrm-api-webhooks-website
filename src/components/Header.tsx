'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Code2, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTestMode } from '@/contexts/TestModeContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { bannerHeight } = useTestMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: isHomePage ? '#features' : '/#features', label: 'Features' },
    { href: isHomePage ? '#integrations' : '/#integrations', label: 'Integrations' },
    { href: isHomePage ? '#code' : '/#code', label: 'Code Examples' },
    { href: isHomePage ? '#pricing' : '/#pricing', label: 'Pricing' },
    { href: isHomePage ? '#faq' : '/#faq', label: 'FAQ' },
  ];

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      style={{ top: `${bannerHeight}px` }}
    >
      <nav className="max-container section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">
                PerfexAPI Pro
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-slate-700 hover:text-primary-600 transition-colors font-medium"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href={isHomePage ? '#pricing' : '/#pricing'}
                className="px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-block"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-700"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-slate-200"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-slate-700 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              href={isHomePage ? '#pricing' : '/#pricing'}
              className="block mt-4 px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-semibold text-center"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;