"use client";
import * as React from "react";
import { BOOTSTRAP_MODE } from "@/config/bootstrap";

export type Entitlements = {
  tier?: "free" | "basic" | "pro" | "enterprise";
  flags?: Record<string, boolean>;
  can?: (key: string) => boolean;
};

const Ctx = React.createContext<Entitlements | undefined>(undefined);

export function useEntitlements() {
  const ctx = React.useContext(Ctx);
  if (ctx === undefined) throw new Error("useEntitlements must be used within EntitlementsProvider");
  return ctx;
}

export function EntitlementsProvider({ children }: { children: React.ReactNode }) {
  // In bootstrap, return an inert context so nothing heavy runs at boot.
  const value = React.useMemo<Entitlements>(() => {
    if (BOOTSTRAP_MODE) return { tier: "free", flags: {}, can: () => true };
    // TODO: replace with real entitlements when wiring data
    return { tier: "free", flags: {}, can: () => true };
  }, []);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export default EntitlementsProvider;
