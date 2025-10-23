'use client';
import React,{createContext,useContext,useMemo} from 'react';
import { BOOTSTRAP_MODE } from '@/config/bootstrap';

type AuthValue = { 
  user: any; 
  loading: boolean; 
  error?: any; 
  session?: any;
  userProfile?: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  isQABypassActive: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
};

const Ctx = createContext<AuthValue>({ 
  user: null, 
  loading: false, 
  isAuthenticated: false,
  isLoading: false,
  isQABypassActive: false,
  login: async () => ({ success: false }),
  logout: () => {}
});

export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo<AuthValue>(() => ({ 
    user: null, 
    loading: false,
    isAuthenticated: false,
    isLoading: false,
    isQABypassActive: false,
    login: async () => ({ success: false }),
    logout: () => {}
  }), []);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export default AuthProvider;
