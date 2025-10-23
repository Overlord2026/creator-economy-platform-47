'use client';
<<<<<<< HEAD
import * as React from 'react';
import { BOOTSTRAP_MODE } from '@/config/bootstrap';

export type Entitlements = {
  tier?: 'free' | 'basic' | 'premium' | 'pro' | 'elite' | 'enterprise';
  subscription_tier?: 'free' | 'basic' | 'premium' | 'pro' | 'elite' | 'enterprise';
  flags?: Record<string, boolean>;
  can?: (key: string) => boolean;
  has: (key: string) => boolean;
  quota: (key: string) => number | 'unlimited';
  remainingQuota: (key: string) => number | 'unlimited';
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
        subscription_tier: 'premium',
        plan: 'premium', 
        flags: {}, 
        can: () => true,
        has: () => true,
        quota: () => 'unlimited',
        remainingQuota: () => 'unlimited',
        persona: 'user', 
        segment: 'bootstrap' 
      };
    }
    return { 
      tier: 'free',
      subscription_tier: 'free',
      plan: 'free', 
      flags: {}, 
      can: () => true,
      has: () => false,
      quota: () => 0,
      remainingQuota: () => 0
    };
  }, []);
  
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

=======
import React, { createContext, useContext, useMemo } from 'react';
import { BOOTSTRAP_MODE } from '@/config/bootstrap';

type Entitlements = { plan?: 'free'|'pro'|'enterprise'; features?: Record<string, boolean>; can?: (key: string)=>boolean; };
const Ctx = createContext<Entitlements>({ plan: 'free', features: {}, can: () => true });

export function EntitlementsProvider({ children }: { children: React.ReactNode }) {
  if (BOOTSTRAP_MODE) {
    const value = useMemo<Entitlements>(() => ({ plan: 'free', features: {}, can: () => true }), []);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
  }
  const value = useMemo<Entitlements>(() => ({ plan: 'free', features: {}, can: () => true }), []);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useEntitlements = () => useContext(Ctx);
>>>>>>> demo/offerlock-202509261311
export default EntitlementsProvider;
