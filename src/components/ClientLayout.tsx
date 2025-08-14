'use client';

import TestModeBanner from './TestModeBanner';
import { TestModeProvider } from '@/contexts/TestModeContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <TestModeProvider>
      <TestModeBanner />
      {children}
    </TestModeProvider>
  );
}