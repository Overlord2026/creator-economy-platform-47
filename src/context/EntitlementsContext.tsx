'use client';
import React, { createContext, useContext, useMemo } from "react";
import { BOOTSTRAP_MODE } from "@/config/bootstrap";

type Entitlements = {
  plan?: "free"|"pro"|"enterprise";
  features?: Record<string, boolean>;
  can: (key: string) => boolean;
};

const Ctx = createContext<Entitlements>({ plan: "free", features: {}, can: () => true });

export function EntitlementsProvider({ children }: { children: React.ReactNode }) {
  if (BOOTSTRAP_MODE) {
    const value = useMemo<Entitlements>(() => ({ plan: "free", features: {}, can: () => true }), []);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
  }
  // TODO: replace with real entitlement loader when BOOTSTRAP_MODE=false
  const value = useMemo<Entitlements>(() => ({ plan: "free", features: {}, can: () => true }), []);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useEntitlements = () => useContext(Ctx);
export default EntitlementsProvider;
