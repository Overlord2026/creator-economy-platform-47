'use client';
import React, { createContext, useContext, useMemo } from 'react';
import { BOOTSTRAP_MODE } from '@/config/bootstrap';

type Entitlements = { 
  plan?: 'free'|'pro'|'enterprise'; 
  features?: Record<string, boolean>; 
  can?: (key: string)=>boolean;
  has?: (key: string)=>boolean;
  persona?: string;
  segment?: string;
};
const Ctx = createContext<Entitlements>({ plan: 'free', features: {}, can: () => true, has: () => true });

export function EntitlementsProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo<Entitlements>(() => ({ plan: 'free', features: {}, can: () => true, has: () => true }), []);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useEntitlements = () => useContext(Ctx);
export default EntitlementsProvider;
