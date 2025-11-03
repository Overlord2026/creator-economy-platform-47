'use client';
<<<<<<< Updated upstream
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
=======
import React, { createContext, useContext } from 'react';

type Entitlements = { has: (feature: string) => boolean };
const Ctx = createContext<Entitlements>({ has: () => false });

export const useEntitlements = () => useContext(Ctx);

export const EntitlementsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Ctx.Provider value={{ has: () => false }}>{children}</Ctx.Provider>;
};

>>>>>>> Stashed changes
export default EntitlementsProvider;
