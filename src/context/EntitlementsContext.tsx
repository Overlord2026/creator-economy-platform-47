import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { BOOTSTRAP_MODE } from '@/config/bootstrap';
import type { Plan } from '@/types/pricing';

interface EntitlementsContextType {
  tier: Plan;
  loading: boolean;
  has: (key: string) => boolean;
  quota: (key: string) => number | 'unlimited' | null;
  remainingQuota: (key: string) => number | 'unlimited' | null;
  plan: Plan;
  persona?: string;
  segment?: string;
  loadEntitlements: () => Promise<void>;
}

const EntitlementsContext = createContext<EntitlementsContextType | undefined>(undefined);

export function useEntitlements() {
  const context = useContext(EntitlementsContext);
  if (context === undefined) {
    throw new Error('useEntitlements must be used within an EntitlementsProvider');
  }
  return context;
}

export function EntitlementsProvider({ children }: { children: ReactNode }) {
  const value = useMemo<EntitlementsContextType>(() => {
    if (BOOTSTRAP_MODE) {
      console.log('[EntitlementsProvider] Bootstrap mode active - returning stub entitlements');
      return {
        tier: 'basic' as Plan,
        loading: false,
        has: () => true,
        quota: () => 'unlimited',
        remainingQuota: () => 'unlimited',
        plan: 'basic' as Plan,
        persona: 'user',
        segment: 'basic',
        loadEntitlements: async () => {},
      };
    }
    
    return {
      tier: 'basic' as Plan,
      loading: false,
      has: (key: string) => true,
      quota: () => 1000,
      remainingQuota: () => 1000,
      plan: 'basic' as Plan,
      persona: 'user',
      segment: 'basic',
      loadEntitlements: async () => {},
    };
  }, []);

  return (
    <EntitlementsContext.Provider value={value}>
      {children}
    </EntitlementsContext.Provider>
  );
}