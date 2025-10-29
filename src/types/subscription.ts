// Safe bootstrap types (aligned to what the app expects)

export type SubscriptionTier = "free" | "basic" | "premium" | "pro" | "elite" | "enterprise";
export type SubscriptionTierType = SubscriptionTier; // Alias for compatibility
export type Plan = SubscriptionTier;

// Add-on access types
export type AddOnAccess = {
  lending_access?: boolean;
  tax_access?: boolean;
  ai_features_access?: boolean;
  premium_analytics_access?: boolean;
  residency_optimization?: boolean;
  advisor_marketplace?: boolean;
  audit_risk_analyzer?: boolean;
  relocation_concierge?: boolean;
  bill_pay_premium?: boolean;
  premium_property_features?: boolean;
};

// Usage counter types
export type UsageCounters = {
  lending_applications?: number;
  tax_analyses?: number;
  ai_queries?: number;
  document_uploads?: number;
};

export type FeatureKey = string;

export type UsageCheck = {
  hasAccess: boolean;
  remaining: number | "unlimited" | null;
  isAtLimit: boolean;
};

export type SubscriptionPlan = {
  tier: SubscriptionTier;
  subscription_tier?: SubscriptionTier; // Alias for compatibility
  name: string;
  features: Record<FeatureKey, boolean>;
  quotas?: Record<FeatureKey, number | "unlimited">;
  usage_counters?: UsageCounters;
  usage_limits?: UsageCounters;
};

// Subscription tier details (object shape for UI components)
export interface SubscriptionTierFeature {
  id: string;
  name: string;
  included: boolean;
}

export interface SubscriptionTierDetails {
  id: SubscriptionTier;
  name: string;
  price: number | string;
  description: string;
  buttonText: string;
  recommended?: boolean;
  color?: string;
  features: SubscriptionTierFeature[];
}

export interface PremiumUpgradePrompt {
  feature_name: string;
  required_tier: SubscriptionTier;
  current_usage?: number;
  usage_limit?: number;
  add_on_required?: boolean;
}
