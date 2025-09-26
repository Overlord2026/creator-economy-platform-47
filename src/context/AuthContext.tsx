'use client';
import React, { createContext, useContext } from 'react';

type AuthValue = { user: any; loading: boolean; error?: any; session?: any };
const Ctx = createContext<AuthValue>({ user: null, loading: false });
export const useAuth = () => useContext(Ctx);

// No-op provider for demo stability (no hooks, no supabase access)
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <Ctx.Provider value={{ user: null, loading: false }}>{children}</Ctx.Provider>;
}
