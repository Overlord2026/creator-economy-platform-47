'use client';
import React,{createContext,useContext,useMemo} from 'react';
import { BOOTSTRAP_MODE } from '@/config/bootstrap';

type AuthValue = { user: any; loading: boolean; error?: any; session?: any };
const Ctx = createContext<AuthValue>({ user: null, loading: false });
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo<AuthValue>(() => ({ user: null, loading: false }), []);
  // In bootstrap mode, we render an inert provider to avoid any host/provider runtime issues
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export default AuthProvider;
