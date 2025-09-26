'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Try to load Supabase client if it exists; stay no-op if not
let supabase: any = null;
try {
  const mod = require('@/integrations/supabase/client');
  supabase = typeof mod.getAnonClient === 'function' ? mod.getAnonClient() : null;
} catch (_) { /* no-op for demo/dev */ }

type AuthValue = { user: any; loading: boolean; error?: any; session?: any };
const Ctx = createContext<AuthValue>({ user: null, loading: true });
export const useAuth = () => useContext(Ctx);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }

    let mounted = true;
    supabase.auth.getUser().then(({ data, error }: any) => {
      if (!mounted) return;
      if (error) setError(error);
      setUser(data?.user ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e: any, session: any) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
    });
    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  const value = useMemo(() => ({ user, loading, error, session: null }), [user, loading, error]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
