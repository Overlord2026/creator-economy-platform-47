'use client';
import * as React from 'react';
import { BOOTSTRAP_MODE } from '@/config/bootstrap';

// Extended shape to match existing codebase expectations
export interface AuthContextShape {
  user: { 
    id: string; 
    email?: string;
    user_metadata?: any;
    email_confirmed_at?: string;
    created_at?: string;
  } | null;
  userProfile: { 
    id: string; 
    email?: string; 
    full_name?: string; 
    firstName?: string;
    first_name?: string;
    displayName?: string;
    display_name?: string;
    bio?: string;
    created_at?: string;
    total_referrals?: number;
    successful_referrals?: number;
    role?: string; 
    plan?: 'free'|'basic'|'pro'|'enterprise';
    twoFactorEnabled?: boolean;
    two_factor_enabled?: boolean;
    client_tier?: string;
  } | null;
  session: { 
    access_token?: string;
    user?: any;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authReady?: boolean;
  isEmailConfirmed?: boolean;
  isQABypassActive?: boolean;
  login?: (email: string, password: string) => Promise<any>;
  signup?: (email: string, password: string, userData?: any) => Promise<any>;
  logout?: () => Promise<void>;
  signIn?: (opts?: unknown) => Promise<void>;
  signOut?: () => Promise<void>;
  refresh?: () => Promise<void>;
  refreshProfile?: () => Promise<void>;
  getToken?: () => Promise<string | null>;
  updateUserProfile?: (profile: any) => Promise<void>;
}

// ✅ Constant, hook‑free bootstrap value.
// (No useState/useEffect anywhere in this file.)
const BOOT_AUTH: AuthContextShape = {
  user: null,
  userProfile: null,
  session: null,
  isAuthenticated: false,
  isLoading: false,
  authReady: true,
  signIn: async () => { console.log('[AUTH] signIn (bootstrap no-op)'); },
  signOut: async () => { console.log('[AUTH] signOut (bootstrap no-op)'); },
  refresh: async () => { /* no-op */ },
  getToken: async () => null,
};

export const AuthContext = React.createContext<AuthContextShape>(BOOT_AUTH);

export function useAuth(): AuthContextShape {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // In bootstrap we provide a constant value so there is NO hook call here.
  const value = BOOTSTRAP_MODE ? BOOT_AUTH : BOOT_AUTH; // swap in real logic later
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Provide both named & default to satisfy any import style used elsewhere.
export default AuthProvider;
