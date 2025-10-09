import * as React from "react";
import { useEntitlements } from "@/context/EntitlementsContext";

export type AccessFlag = string;
export type SubscriptionTier = "free" | "basic" | "pro" | "enterprise";

export function useSubscriptionAccess() {
  // All hooks are inside this function (no top-level hooks).
  const ctx = useEntitlements();

  const [tier, setTier] = React.useState<SubscriptionTier>(ctx.tier ?? "free");
  const [flags, setFlags] = React.useState<Record<string, boolean>>(ctx.flags ?? {});

  React.useEffect(() => {
    if (ctx.tier && ctx.tier !== tier) setTier(ctx.tier);
    if (ctx.flags && ctx.flags !== flags) setFlags(ctx.flags);
  }, [ctx.tier, ctx.flags]); // keep deps; ESLint is fine here

  const can = React.useCallback((flag: AccessFlag) => Boolean(flags?.[flag]), [flags]);

  return { tier, flags, can };
}
