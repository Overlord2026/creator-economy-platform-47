'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getAnonClient } from '@/integrations/supabase/client';

type AuthValue = { user: any; loading: boolean; error?: any };
const Ctx = createContext<AuthValue>({ user: null, loading: true });
export const useAuth = () => useContext(Ctx);

<<<<<<< HEAD
interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isEmailConfirmed: boolean;
  isQABypassActive: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; requires2FA?: boolean; userId?: string }>;
  signup: (email: string, password: string, userData?: any) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signInWithApple: () => Promise<{ success: boolean; error?: string }>;
  signInWithMicrosoft: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
  resendConfirmation: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  complete2FALogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecking2FA, setIsChecking2FA] = useState(false);
  const [isQABypassActive, setIsQABypassActive] = useState(MOCK_MODE);
  
  // Create a safe hook instance that won't break React
  const toolInstaller = (() => {
    try {
      if (typeof window !== 'undefined' && user) {
        return useFirstLoginToolInstaller();
      }
      return { checkAndInstallDefaultTools: () => Promise.resolve() };
    } catch {
      return { checkAndInstallDefaultTools: () => Promise.resolve() };
    }
  })();

  // Mock mode user profile
  const mockUserProfile: UserProfile = {
    id: 'mock-user-id',
    name: 'Mock User',
    displayName: 'Mock Admin',
    email: 'mock@example.com',
    firstName: 'Mock',
    lastName: 'User',
    role: 'admin',
    permissions: ['admin'],
    twoFactorEnabled: false,
    tenant_id: 'mock-tenant',
    segments: []
  };

  // Helper function to safely parse date from database
  const parseDateSafely = (dateString: string): Date => {
    if (!dateString) return new Date();
    
    // If it's a date-only string (YYYY-MM-DD), parse it in local timezone
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    
    // For datetime strings, create date object
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? new Date() : date;
  };

  const loadUserProfile = async (userId: string) => {
    try {
      console.log("Loading user profile for user:", userId);
      
      const { safeSelect } = await import('@/lib/db/safeSupabase');
      const result = await safeSelect('profiles', '*, two_factor_enabled', { id: userId });
      
      if (!result.ok || !result.data?.length) {
        console.error('Error loading profile:', result.error);
        return;
      }

      const profile = result.data[0] as any;
      if (profile) {
        console.log("Loaded profile from database:", profile);
        
        // Handle date conversion properly
        let dateOfBirth: Date | undefined;
        if (profile.date_of_birth_date) {
          dateOfBirth = parseDateSafely(profile.date_of_birth_date);
        } else if (profile.date_of_birth) {
          dateOfBirth = parseDateSafely(profile.date_of_birth);
        }

        const userProfileData = {
          id: profile.id,
          name: profile.display_name || `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
          displayName: profile.display_name,
          email: profile.email,
          firstName: profile.first_name,
          lastName: profile.last_name,
          middleName: profile.middle_name,
          title: profile.title,
          suffix: profile.suffix,
          gender: profile.gender,
          maritalStatus: profile.marital_status,
          dateOfBirth: dateOfBirth,
          phone: profile.phone,
          investorType: profile.investor_type,
          role: (profile.role as UserProfile['role']) || 'client',
          permissions: profile.permissions || [],
          twoFactorEnabled: profile.two_factor_enabled || false,
          tenant_id: profile.tenant_id,
          segments: profile.client_segment ? [profile.client_segment] : [],
          advisor_role: profile.role === 'advisor' ? profile.role : undefined
        };
        
        setUserProfile(userProfileData);
        setIsQABypassActive(isQABypassAllowed(profile.email));
        
        // Check for first login and auto-install tools (safely)
        if (userProfileData.role && toolInstaller?.checkAndInstallDefaultTools) {
          try {
            toolInstaller.checkAndInstallDefaultTools(userProfileData.role as PersonaType);
          } catch (error) {
            console.warn('Tool installation failed:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
    }
  };
=======
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
>>>>>>> 93ba1212 (feat(auth): client-only AuthContext with safe mount to avoid multi-React/useState null crashes)

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
