'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

type AuthValue = {
  user: any;
  userProfile?: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  loading: boolean;
  error?: any;
  session?: any;
  isQABypassActive?: boolean;
  login?: (...args: any[]) => Promise<any>;
  logout?: () => Promise<void> | void;
  refreshProfile?: () => Promise<void>;
};

const Ctx = createContext<AuthValue>({
  user: null,
  userProfile: null,
  isAuthenticated: false,
  isLoading: false,
  loading: false,
  error: undefined,
  session: undefined,
  isQABypassActive: false,
  login: async () => ({ success: false }),
  logout: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(Ctx);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const s = supabase;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(undefined);
  const [session, setSession] = useState<any>(undefined);

  useEffect(() => {
    if (!s) { setLoading(false); return; }
    let mounted = true;

    s.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      if (error) setError(error);
      setSession(data?.session);
      setUser(data?.session?.user ?? null);
      setLoading(false);
    });

    const { data: sub } = s.auth.onAuthStateChange((_e, sess) => {
      if (!mounted) return;
      setSession(sess ?? undefined);
      setUser(sess?.user ?? null);
    });

    return () => { mounted = false; sub?.subscription?.unsubscribe?.(); };
  }, [s]);

  const refreshProfile = async () => {
    try {
      if (!s) return;
      const { data } = await s.auth.getUser();
      setUser(data?.user ?? null);
    } catch (e) { setError(e); }
  };

  const value = useMemo<AuthValue>(() => ({
    user,
    userProfile: user,
    isAuthenticated: !!user,
    isLoading: loading,
    loading,
    error,
    session,
    isQABypassActive: false,
    login: async () => ({ success: false }),
    logout: async () => {},
    refreshProfile,
  }), [user, loading, error, session]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
