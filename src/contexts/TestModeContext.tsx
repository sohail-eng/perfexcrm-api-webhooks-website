'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TestModeContextType {
  isTestMode: boolean;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
  bannerHeight: number;
}

const TestModeContext = createContext<TestModeContextType>({
  isTestMode: false,
  showBanner: true,
  setShowBanner: () => {},
  bannerHeight: 0,
});

export const useTestMode = () => useContext(TestModeContext);

export function TestModeProvider({ children }: { children: ReactNode }) {
  const [isTestMode, setIsTestMode] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [bannerHeight, setBannerHeight] = useState(0);

  useEffect(() => {
    checkStripeMode();
  }, []);

  useEffect(() => {
    // Calculate banner height when it's shown
    if (isTestMode && showBanner) {
      // Mobile: ~60px, Desktop: ~40px
      const isMobile = window.innerWidth < 768;
      setBannerHeight(isMobile ? 60 : 40);
    } else {
      setBannerHeight(0);
    }
  }, [isTestMode, showBanner]);

  const checkStripeMode = async () => {
    try {
      // First check if test mode is explicitly enabled
      if (process.env.NEXT_PUBLIC_TEST_MODE === 'true') {
        setIsTestMode(true);
        return;
      }

      // Check if we have Stripe configuration
      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      
      // Check from database config
      const response = await fetch('/api/admin/config');
      if (response.ok) {
        const data = await response.json();
        if (data.stripe?.connected && !data.stripe?.isLive) {
          setIsTestMode(true);
        }
      } else if (publishableKey && publishableKey.startsWith('pk_test_')) {
        // Fallback to env variable check
        setIsTestMode(true);
      }
    } catch (error) {
      // If can't fetch config, check env variable
      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      if (publishableKey && publishableKey.startsWith('pk_test_')) {
        setIsTestMode(true);
      }
    }
  };

  return (
    <TestModeContext.Provider value={{ isTestMode, showBanner, setShowBanner, bannerHeight }}>
      {children}
    </TestModeContext.Provider>
  );
}