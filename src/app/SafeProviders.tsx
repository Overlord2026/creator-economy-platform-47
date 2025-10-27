'use client';
import React from 'react';
import { BOOTSTRAP_MODE } from '@/config/bootstrap';
import AuthProvider from '@/context/AuthContext';

type Props = { children: React.ReactNode };

export default function SafeProviders({ children }: Props) {
  if (BOOTSTRAP_MODE) return <>{children}</>;
  return <AuthProvider>{children}</AuthProvider>;
}
