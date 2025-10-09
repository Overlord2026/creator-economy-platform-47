"use client";
import * as React from "react";
import { BOOTSTRAP_MODE } from "@/config/bootstrap";
import type { FeatureKey, SubscriptionTier, SubscriptionPlan, UsageCheck } from "@/types/subscription";

export type Entitlements = {
  // legacy/simple fields
  tier?: SubscriptionTier;
  flags?: Record<string, boolean>;
  can?: (key: FeatureKey) => boolean;

  // full system fields many components expect
  plan: SubscriptionTier; // alias for tier
  persona?: string; // e.g., 'athlete' | 'creator' | 'advisor'
  segment?: string; // e.g., 'basic' | 'pro'
  subscriptionPlan: SubscriptionPlan; // plan metadata

  // canonical API
  has: (key: FeatureKey) => boolean;
  checkFeatureAccess: (key: FeatureKey) => boolean;
  checkUsageLimit: (key: FeatureKey) => UsageCheck;
  incrementUsage: (key: FeatureKey, by?: number) => Promise<void>;
};

const Ctx = React.createContext<Entitlements | undefined>(undefined);

export function useEntitlements() {
  const ctx = React.useContext(Ctx);
  if (ctx === undefined) throw new Error("useEntitlements must be used within EntitlementsProvider");
  return ctx;
}

const BOOTSTRAP_FEATURES: Record<FeatureKey, boolean> = {
  // mark key features as available/hidden during demo; tweak as needed
  offerlock: true,
  "contract-esign": true,
  "settlement-proof": true,
  reports: true,
};

const BOOTSTRAP_QUOTAS: Record<FeatureKey, number | "unlimited"> = {
  offerlock: 999,
  "contract-esign": 999,
  "settlement-proof": 999,
  reports: "unlimited",
};

export function EntitlementsProvider({ children }: { children: React.ReactNode }) {
  // Small in-memory usage ledger for demo/preview (resets on reload).
  const usageRef = React.useRef<Record<FeatureKey, number>>({});

  const value = React.useMemo<Entitlements>(() => {
    // In bootstrap, return a full, inert entitlement surface so all components compile/run.
    if (BOOTSTRAP_MODE) {
      const plan: SubscriptionTier = "free";
      const subscriptionPlan: SubscriptionPlan = {
        tier: plan,
        name: "Free (Bootstrap)",
        features: BOOTSTRAP_FEATURES,
        quotas: BOOTSTRAP_QUOTAS,
      };

      const has = (key: FeatureKey) => Boolean(subscriptionPlan.features[key]);
      const checkFeatureAccess = has;

      const checkUsageLimit = (key: FeatureKey): UsageCheck => {
        const quotas = subscriptionPlan.quotas ?? {};
        const q = quotas[key];
        if (q === "unlimited" || q == null) return { hasAccess: has(key), remaining: q ?? null, isAtLimit: false };
        const used = usageRef.current[key] ?? 0;
        const remaining = Math.max(0, q - used);
        return { hasAccess: has(key), remaining, isAtLimit: remaining <= 0 };
      };

      const incrementUsage = async (key: FeatureKey, by = 1) => {
        const prev = usageRef.current[key] ?? 0;
        usageRef.current[key] = prev + by;
      };

      return {
        // minimal fields (kept for back-compat)
        tier: plan,
        flags: subscriptionPlan.features,
        can: has,

        // full interface
        plan,
        persona: "user",
        segment: "bootstrap",
        subscriptionPlan,
        has,
        checkFeatureAccess,
        checkUsageLimit,
        incrementUsage,
      };
    }

    // Non-bootstrap: until wired, expose the same full surface with conservative defaults
    const plan: SubscriptionTier = "free";
    const subscriptionPlan: SubscriptionPlan = { tier: plan, name: "Free", features: {}, quotas: {} };

    const has = (_: FeatureKey) => false;
    const checkFeatureAccess = has;
    const checkUsageLimit = (_: FeatureKey): UsageCheck => ({ hasAccess: false, remaining: 0, isAtLimit: true });
    const incrementUsage = async () => {};

    return {
      tier: plan,
      flags: {},
      can: has,
      plan,
      persona: "user",
      segment: "default",
      subscriptionPlan,
      has,
      checkFeatureAccess,
      checkUsageLimit,
      incrementUsage,
    };
  }, []);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export default EntitlementsProvider;
