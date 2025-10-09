console.log('[BOOT] zero-hook EntitlementsProvider loaded');

"use client";
import { createContext, useContext, type ReactNode } from "react";
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

const Ctx = createContext<Entitlements | undefined>(undefined);

export function useEntitlements() {
  const ctx = useContext(Ctx);
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

// In-memory usage ledger (resets on reload)
const usageLedger: Record<FeatureKey, number> = {};

// Static boot value - NO HOOKS
const plan: SubscriptionTier = BOOTSTRAP_MODE ? "premium" : "free";
const subscriptionPlan: SubscriptionPlan = {
  tier: plan,
  subscription_tier: plan,
  name: BOOTSTRAP_MODE ? "Premium (Bootstrap)" : "Free",
  features: BOOTSTRAP_MODE ? BOOTSTRAP_FEATURES : {},
  quotas: BOOTSTRAP_MODE ? BOOTSTRAP_QUOTAS : {},
  usage_counters: {},
  usage_limits: {},
};

const has = (key: FeatureKey) => Boolean(subscriptionPlan.features[key]);
const checkFeatureAccess = has;

const checkUsageLimit = (key: FeatureKey): UsageCheck => {
  const quotas = subscriptionPlan.quotas ?? {};
  const q = quotas[key];
  if (q === "unlimited" || q == null) return { hasAccess: has(key), remaining: q ?? null, isAtLimit: false };
  const used = usageLedger[key] ?? 0;
  const remaining = Math.max(0, q - used);
  return { hasAccess: has(key), remaining, isAtLimit: remaining <= 0 };
};

const incrementUsage = async (key: FeatureKey, by = 1) => {
  const prev = usageLedger[key] ?? 0;
  usageLedger[key] = prev + by;
};

const BOOT_VALUE: Entitlements = {
  tier: plan,
  flags: subscriptionPlan.features,
  can: has,
  plan,
  persona: "user",
  segment: BOOTSTRAP_MODE ? "bootstrap" : "default",
  subscriptionPlan,
  has,
  checkFeatureAccess,
  checkUsageLimit,
  incrementUsage,
};

export function EntitlementsProvider({ children }: { children: ReactNode }) {
  return <Ctx.Provider value={BOOT_VALUE}>{children}</Ctx.Provider>;
}

export default EntitlementsProvider;
