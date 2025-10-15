import * as React from 'react';
import { useEntitlements } from '@/context/EntitlementsContext';

export type AccessFlag = string;
export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'pro' | 'elite' | 'enterprise';

export function useSubscriptionAccess() {
  const ctx = useEntitlements();

  const [tier, setTier] = React.useState<SubscriptionTier>(ctx.tier ?? 'free');
  const [flags, setFlags] = React.useState<Record<string, boolean>>(ctx.flags ?? {});

  React.useEffect(() => {
    if (ctx.tier && ctx.tier !== tier) setTier(ctx.tier);
    if (ctx.flags && ctx.flags !== flags) setFlags(ctx.flags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.tier, ctx.flags]);

  const can = React.useCallback((flag: AccessFlag) => Boolean(flags?.[flag]), [flags]);

  const checkFeatureAccess = React.useCallback((_feature: string) => true, []);
  const checkUsageLimit = React.useCallback((_feature: string) => ({ hasAccess: true, remaining: 999, isAtLimit: false }), []);
  const incrementUsage = React.useCallback(async (_feature: string) => {}, []);

  return {
    tier,
    flags,
    can,
    subscriptionPlan: { name: tier, tier, subscription_tier: tier, quotas: {}, features: {}, usage_counters: {}, usage_limits: {} },
    checkFeatureAccess,
    checkUsageLimit,
    incrementUsage,
    isLoading: false,
  };
}
