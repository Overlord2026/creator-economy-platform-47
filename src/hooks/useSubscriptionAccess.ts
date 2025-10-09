import * as React from "react";
import { useEntitlements } from "@/context/EntitlementsContext";
import type { FeatureKey, SubscriptionTier, UsageCheck, SubscriptionPlan } from "@/types/subscription";

// The hook returns the rich API most components expect.
export function useSubscriptionAccess(): {
  // legacy/simple
  tier: SubscriptionTier;
  flags: Record<string, boolean>;
  can: (key: FeatureKey) => boolean;

  // rich
  subscriptionPlan: SubscriptionPlan;
  checkFeatureAccess: (key: FeatureKey) => boolean;
  checkUsageLimit: (key: FeatureKey) => UsageCheck;
  incrementUsage: (key: FeatureKey, by?: number) => Promise<void>;

  // convenience
  isLoading: boolean;
} {
  const ctx = useEntitlements();

  // Mirror context → local state so components relying on state changes still re-render.
  const [tier, setTier] = React.useState<SubscriptionTier>(ctx.plan ?? "free");
  const [flags, setFlags] = React.useState<Record<string, boolean>>(ctx.flags ?? {});
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setTier(ctx.plan ?? "free");
    setFlags(ctx.flags ?? {});
  }, [ctx.plan, ctx.flags]);

  const can = React.useCallback((key: FeatureKey) => ctx.has(key), [ctx]);
  const checkFeatureAccess = React.useCallback((key: FeatureKey) => ctx.checkFeatureAccess(key), [ctx]);
  const checkUsageLimit = React.useCallback((key: FeatureKey) => ctx.checkUsageLimit(key), [ctx]);
  const incrementUsage = React.useCallback(async (key: FeatureKey, by = 1) => ctx.incrementUsage(key, by), [ctx]);

  return {
    tier,
    flags,
    can,
    subscriptionPlan: ctx.subscriptionPlan,
    checkFeatureAccess,
    checkUsageLimit,
    incrementUsage,
    isLoading,
  };
}
