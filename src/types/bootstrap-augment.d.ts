import type { Database as GenDB } from '@/types/supabase';
declare module '@/types/supabase' {
  interface Database {
    public: GenDB['public'] & {
      Tables: GenDB['public']['Tables'] & {
        franchise_referrals?: {
          Row: { id: string; created_at?: string; status?: string; code?: string };
          Insert: Partial<{ id: string; created_at: string; status: string; code: string }>;
          Update: Partial<{ id: string; created_at: string; status: string; code: string }>;
          Relationships: [];
        };
        franchise_referral_payouts?: {
          Row: { id: string; referral_id: string; amount_cents?: number; status?: string };
          Insert: Partial<{ id: string; referral_id: string; amount_cents: number; status: string }>;
          Update: Partial<{ id: string; referral_id: string; amount_cents: number; status: string }>;
          Relationships: [];
        };
        insurance_agents?: {
          Row: { id: string; name?: string; email?: string };
          Insert: Partial<{ id: string; name: string; email: string }>;
          Update: Partial<{ id: string; name: string; email: string }>;
          Relationships: [];
        };
      };
    };
  }
}
