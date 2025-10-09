console.log('[BOOT] zero-hook useSubscriptionAccess loaded');

import { useEntitlements } from "@/context/EntitlementsContext";
import type { FeatureKey, SubscriptionTier, UsageCheck, SubscriptionPlan } from "@/types/subscription";

// Zero-hook shim - just passes through context
export function useSubscriptionAccess(): {
  tier: SubscriptionTier;
  flags: Record<string, boolean>;
  can: (key: FeatureKey) => boolean;
  subscriptionPlan: SubscriptionPlan;
  checkFeatureAccess: (key: FeatureKey) => boolean;
  checkUsageLimit: (key: FeatureKey) => UsageCheck;
  incrementUsage: (key: FeatureKey, by?: number) => Promise<void>;
  isLoading: boolean;
} {
  const ctx = useEntitlements();

  return {
    tier: ctx.plan ?? "free",
    flags: ctx.flags ?? {},
    can: ctx.has,
    subscriptionPlan: ctx.subscriptionPlan,
    checkFeatureAccess: ctx.checkFeatureAccess,
    checkUsageLimit: ctx.checkUsageLimit,
    incrementUsage: ctx.incrementUsage,
    isLoading: false,
  };
}
