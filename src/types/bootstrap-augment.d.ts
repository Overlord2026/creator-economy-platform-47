import type { Database as GenDB } from '@/types/supabase';

/**
 * Types-only augmentation for tables not yet present in generated types.
 * Safe during bootstrap; remove once schema & typegen include these tables.
 */
declare module '@/types/supabase' {
  interface Database {
    public: GenDB['public'] & {
      Tables: GenDB['public']['Tables'] & {

        // --- existing stubs (keep) ---
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

        // --- new stubs for current build ---
        leads?: {
          Row: {
            id: string;
            first_name?: string; last_name?: string;
            email?: string; phone?: string;
            lead_source?: string; lead_status?: string;
            lead_value?: number; acquisition_cost?: number;
            notes?: string;
            advisor_id?: string; campaign_id?: string; agency_id?: string;
            enrichment_data?: unknown;
            catchlight_confidence?: number; budget_score?: number; verified_net_worth?: number;
            created_at?: string; updated_at?: string;
          };
          Insert: Partial<{
            id: string; first_name: string; last_name: string; email: string; phone: string;
            lead_source: string; lead_status: string; lead_value: number; acquisition_cost: number;
            notes: string; advisor_id: string; campaign_id: string; agency_id: string;
            enrichment_data: unknown; catchlight_confidence: number; budget_score: number; verified_net_worth: number;
            created_at: string; updated_at: string;
          }>;
          Update: Partial<{
            id: string; first_name: string; last_name: string; email: string; phone: string;
            lead_source: string; lead_status: string; lead_value: number; acquisition_cost: number;
            notes: string; advisor_id: string; campaign_id: string; agency_id: string;
            enrichment_data: unknown; catchlight_confidence: number; budget_score: number; verified_net_worth: number;
            created_at: string; updated_at: string;
          }>;
          Relationships: [];
        };

        onboarding_flow_progress?: {
          Row: {
            id: string; user_id: string;
            current_step?: number; total_steps?: number; progress_percentage?: number;
            step_data?: unknown; status?: string; last_active_at?: string;
            created_at?: string; updated_at?: string; completed_at?: string;
          };
          Insert: Partial<{
            id: string; user_id: string; current_step: number; total_steps: number;
            progress_percentage: number; step_data: unknown; status: string; last_active_at: string;
            created_at: string; updated_at: string; completed_at: string;
          }>;
          Update: Partial<{
            id: string; user_id: string; current_step: number; total_steps: number;
            progress_percentage: number; step_data: unknown; status: string; last_active_at: string;
            created_at: string; updated_at: string; completed_at: string;
          }>;
          Relationships: [];
        };

        employees?: {
          Row: { id: string; user_id?: string; organization_id?: string; role?: string; created_at?: string; updated_at?: string };
          Insert: Partial<{ id: string; user_id: string; organization_id: string; role: string; created_at: string; updated_at: string }>;
          Update: Partial<{ id: string; user_id: string; organization_id: string; role: string; created_at: string; updated_at: string }>;
          Relationships: [];
        };

        organizations?: {
          Row: { id: string; name?: string; organization_type?: string; logo_url?: string; created_at?: string; updated_at?: string };
          Insert: Partial<{ id: string; name: string; organization_type: string; logo_url: string; created_at: string; updated_at: string }>;
          Update: Partial<{ id: string; name: string; organization_type: string; logo_url: string; created_at: string; updated_at: string }>;
          Relationships: [];
        };

      };
    };
  }
}
