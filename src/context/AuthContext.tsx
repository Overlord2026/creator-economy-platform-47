'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getAnonClient } from '@/integrations/supabase/client';

type AuthValue = { user: any; loading: boolean; error?: any };
const Ctx = createContext<AuthValue>({ user: null, loading: true });
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const s = getAnonClient();
    let mounted = true;
    s.auth.getUser().then(({ data, error }) => {
      if (!mounted) return;
      if (error) setError(error);
      setUser(data?.user ?? null);
      setLoading(false);
    });
    const { data: sub } = s.auth.onAuthStateChange((_e, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
    });
    return () => {
      mounted = false;
      // @ts-ignore — supabase-js v2 subscription shape (varies by minor)
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  const value = useMemo(() => ({ user, loading, error }), [user, loading, error]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
