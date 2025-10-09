'use client';
import * as React from 'react';
import { BOOTSTRAP_MODE } from '@/config/bootstrap';

export type Entitlements = {
  tier?: 'free' | 'basic' | 'premium' | 'pro' | 'elite' | 'enterprise';
  flags?: Record<string, boolean>;
  can?: (key: string) => boolean;
  plan?: 'free' | 'basic' | 'premium' | 'pro' | 'elite' | 'enterprise';
  persona?: string;
  segment?: string;
};

const Ctx = React.createContext<Entitlements | undefined>(undefined);

export function useEntitlements() {
  const ctx = React.useContext(Ctx);
  if (ctx === undefined) throw new Error('useEntitlements must be used within EntitlementsProvider');
  return ctx;
}

export function EntitlementsProvider({ children }: { children: React.ReactNode }) {
  const value = React.useMemo<Entitlements>(() => {
    if (BOOTSTRAP_MODE) {
      return { 
        tier: 'premium', 
        plan: 'premium', 
        flags: {}, 
        can: () => true, 
        persona: 'user', 
        segment: 'bootstrap' 
      };
    }
    return { tier: 'free', plan: 'free', flags: {}, can: () => true };
  }, []);
  
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export default EntitlementsProvider;
