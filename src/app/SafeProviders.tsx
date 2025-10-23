import React from 'react';
import { BOOTSTRAP_MODE } from '@/config/bootstrap';
import AuthProvider from '@/context/AuthContext';

type Props = { children: React.ReactNode };

export default function SafeProviders({ children }: Props) {
  if (BOOTSTRAP_MODE) {
    // In Lovable preview, avoid heavy providers to prevent hook/dispatcher crashes
    return <>{children}</>;
  }
  return <AuthProvider>{children}</AuthProvider>;
}
