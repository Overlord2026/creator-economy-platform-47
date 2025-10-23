import React from 'react';
import { BOOTSTRAP_MODE } from '@/config/bootstrap';

// Import your real providers here (start small)
import AuthProvider from '@/context/AuthContext';

type Props = { children: React.ReactNode };

export default function SafeProviders({ children }: Props) {
  if (BOOTSTRAP_MODE) {
    // Lovable host: render children bare — no heavy providers, no hooks on mount
    return <>{children}</>;
  }
  // Normal env: wrap with providers
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
