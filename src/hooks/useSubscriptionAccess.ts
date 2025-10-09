// HOTFIX: pure function, no React hooks — prevents "useState of null"
export type AccessFlag = string;
export type SubscriptionTier = "free" | "basic" | "pro" | "enterprise";

export function useSubscriptionAccess() {
  return {
    tier: "free" as SubscriptionTier,
    flags: {} as Record<string, boolean>,
    can: (_flag: AccessFlag) => true,
  };
}
