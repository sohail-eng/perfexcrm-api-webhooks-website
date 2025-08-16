'use client';

import { AlertTriangle, CreditCard, X } from 'lucide-react';
import { useTestMode } from '@/contexts/TestModeContext';

export default function TestModeBanner() {
  const { isTestMode, showBanner, setShowBanner } = useTestMode();

  if (!isTestMode || !showBanner) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-amber-500 to-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <div className="flex items-center space-x-2 text-sm font-medium">
              <span>🧪 TEST MODE</span>
              <span className="hidden sm:inline">- Payments are not real</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <CreditCard className="w-4 h-4" />
              <span>Use test card: 4242 4242 4242 4242</span>
            </div>
            
            <button
              onClick={() => setShowBanner(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Mobile test card info */}
        <div className="md:hidden pb-2 text-xs text-white/90">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-3 h-3" />
            <span>Test card: 4242 4242 4242 4242</span>
          </div>
        </div>
      </div>
    </div>
  );
}