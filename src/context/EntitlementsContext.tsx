'use client';
import * as React from 'react';
import { useSubscriptionAccess } from '@/hooks/useSubscriptionAccess';
type Entitlements = { plan?: string; features?: string[]; has: (f: string) => boolean };
const Ctx = React.createContext<Entitlements | null>(null);
export function useEntitlements(){return React.useContext(Ctx) ?? { plan: undefined, features: [], has: ()=>false };}
export default function EntitlementsProvider({children}:{children:React.ReactNode}) {
  const ent = useSubscriptionAccess();
  const value = React.useMemo(()=>({ plan: ent.plan, features: ent.features ?? [], has: ent.has }),[ent.plan,ent.features,ent.has]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
