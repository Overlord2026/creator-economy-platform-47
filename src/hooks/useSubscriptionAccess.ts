import { useEntitlements } from '@/context/EntitlementsContext';

export type SubscriptionTierType = 'free' | 'basic' | 'premium' | 'elite';

export interface AddOnAccess {
  lending_access: boolean;
  tax_access: boolean;
  ai_features_access: boolean;
  premium_analytics_access: boolean;
  residency_optimization: boolean;
  advisor_marketplace: boolean;
  audit_risk_analyzer: boolean;
  relocation_concierge: boolean;
  bill_pay_premium: boolean;
  premium_property_features: boolean;
}

export interface UsageCounters {
  lending_applications: number;
  tax_analyses: number;
  ai_queries: number;
  document_uploads: number;
}

export interface UsageLimits {
  lending_applications_limit: number;
  tax_analyses_limit: number;
  ai_queries_limit: number;
  document_uploads_limit: number;
}

export function useSubscriptionAccess() {
  const { tier, loading } = useEntitlements();

  const subscriptionPlan = {
    subscription_tier: tier,
    subscription_status: 'active',
    subscription_end_date: null,
    stripe_customer_id: null,
    stripe_subscription_id: null,
    tier: tier,
    add_ons: {
      lending_access: tier === 'premium' || tier === 'elite',
      tax_access: tier === 'premium' || tier === 'elite',
      ai_features_access: tier === 'premium' || tier === 'elite',
      premium_analytics_access: tier === 'premium' || tier === 'elite',
      residency_optimization: tier === 'premium' || tier === 'elite',
      advisor_marketplace: tier === 'elite',
      audit_risk_analyzer: tier === 'elite',
      relocation_concierge: tier === 'elite',
      bill_pay_premium: tier === 'premium' || tier === 'elite',
      premium_property_features: tier === 'premium' || tier === 'elite',
    } as AddOnAccess,
    usage_counters: {
      lending_applications: 0,
      tax_analyses: 0,
      ai_queries: 0,
      document_uploads: 0,
    } as UsageCounters,
    usage_limits: {
      lending_applications_limit: tier === 'free' ? 1 : tier === 'basic' ? 5 : 999,
      tax_analyses_limit: tier === 'free' ? 1 : tier === 'basic' ? 3 : 999,
      ai_queries_limit: tier === 'free' ? 10 : tier === 'basic' ? 100 : 999,
      document_uploads_limit: tier === 'free' ? 5 : tier === 'basic' ? 25 : 999,
    } as UsageLimits,
    is_active: true,
  };

  const checkFeatureAccess = (requiredTier: SubscriptionTierType): boolean => {
    const tierHierarchy = { 'free': 0, 'basic': 1, 'premium': 2, 'elite': 3 };
    return (tierHierarchy[tier] || 0) >= (tierHierarchy[requiredTier] || 0);
  };

  const checkAddOnAccess = (addOnKey: keyof AddOnAccess): boolean => {
    return subscriptionPlan.add_ons[addOnKey] || false;
  };

  const checkUsageLimit = (usageType: keyof UsageCounters): boolean => {
    const current = subscriptionPlan.usage_counters[usageType] || 0;
    const limit = subscriptionPlan.usage_limits[`${usageType}_limit` as keyof UsageLimits] || 0;
    return current < limit;
  };

  const incrementUsage = async (usageType: keyof UsageCounters): Promise<void> => {
    console.log(`Incrementing usage for ${usageType}`);
  };

  const isSubscriptionActive = (): boolean => {
    return true;
  };

  const syncWithStripe = async () => {
    console.log('Syncing with Stripe...');
  };

  const fetchSubscriptionData = async () => {
    console.log('Fetching subscription data...');
  };

  return {
    subscriptionPlan,
    isLoading: loading,
    checkFeatureAccess,
    checkAddOnAccess,
    checkUsageLimit,
    incrementUsage,
    isSubscriptionActive,
    syncWithStripe,
    fetchSubscriptionData,
  };
}