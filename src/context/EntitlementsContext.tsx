import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { Plan, FeatureKey } from '@/types/pricing';

type SubscriptionTier = 'free' | 'basic' | 'premium' | 'elite';

interface EntitlementsContextType {
  tier: SubscriptionTier;
  loading: boolean;
  has: (key: string) => boolean;
  quota: (key: string) => number | 'unlimited' | null;
  remainingQuota: (key: string) => number | 'unlimited' | null;
  plan: SubscriptionTier;
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
  const [tier, setTier] = useState<SubscriptionTier>('basic');
  const [loading, setLoading] = useState(true);
  const [persona, setPersona] = useState<string>('user');
  const [segment, setSegment] = useState<string>('basic');

  const loadEntitlements = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profile) {
        setPersona(profile.role || 'user');
        setSegment('basic');
        setTier('basic');
      }
    } catch (error) {
      console.error('Error loading entitlements:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntitlements();
  }, []);

  const has = (key: string): boolean => {
    return tier === 'premium' || tier === 'elite';
  };

  const quota = (key: string): number | 'unlimited' | null => {
    if (tier === 'elite') return 'unlimited';
    if (tier === 'premium') return 1000;
    return 10;
  };

  const remainingQuota = (key: string): number | 'unlimited' | null => {
    return quota(key);
  };

  const value: EntitlementsContextType = {
    tier,
    loading,
    has,
    quota,
    remainingQuota,
    plan: tier,
    persona,
    segment,
    loadEntitlements,
  };

  return (
    <EntitlementsContext.Provider value={value}>
      {children}
    </EntitlementsContext.Provider>
  );
}