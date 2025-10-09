// Safe bootstrap types (aligned to what the app expects)

export type SubscriptionTier = "free" | "basic" | "pro" | "enterprise";
export type Plan = SubscriptionTier;

export type FeatureKey = string;

export type UsageCheck = {
  hasAccess: boolean;
  remaining: number | "unlimited" | null;
  isAtLimit: boolean;
};

export type SubscriptionPlan = {
  tier: SubscriptionTier;
  name: string;
  features: Record<FeatureKey, boolean>;
  quotas?: Record<FeatureKey, number | "unlimited">;
};
