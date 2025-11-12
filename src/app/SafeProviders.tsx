'use client';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BOOTSTRAP_MODE } from '@/config/bootstrap';
import AuthProvider from '@/context/AuthContext';

type Props = { children: React.ReactNode };

export default function SafeProviders({ children }: Props) {
  if (BOOTSTRAP_MODE) {
    return (
      <HelmetProvider>
        {children}
      </HelmetProvider>
    );
  }
  return (
    <HelmetProvider>
      <AuthProvider>{children}</AuthProvider>
    </HelmetProvider>
  );
}
