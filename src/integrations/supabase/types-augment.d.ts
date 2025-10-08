import type { Database as GenDB } from './types';

declare module './types' {
  interface Database {
    public: GenDB['public'] & {
      Tables: GenDB['public']['Tables'] & {
        leads?: { Row: { id: string; first_name?: string; last_name?: string; email?: string; phone?: string; lead_source?: string; lead_status?: string; lead_value?: number; acquisition_cost?: number; notes?: string; advisor_id?: string; campaign_id?: string; agency_id?: string; enrichment_data?: unknown; catchlight_confidence?: number; budget_score?: number; verified_net_worth?: number; created_at?: string; updated_at?: string }; Insert: Partial<any>; Update: Partial<any>; Relationships: [] };
        onboarding_flow_progress?: { Row: { id: string; user_id: string; current_step?: number; total_steps?: number; progress_percentage?: number; step_data?: unknown; status?: string; last_active_at?: string; created_at?: string; updated_at?: string; completed_at?: string }; Insert: Partial<any>; Update: Partial<any>; Relationships: [] };
        employees?: { Row: { id: string; user_id?: string; organization_id?: string; role?: string; created_at?: string; updated_at?: string }; Insert: Partial<any>; Update: Partial<any>; Relationships: [] };
        organizations?: { Row: { id: string; name?: string; organization_type?: string; logo_url?: string; created_at?: string; updated_at?: string }; Insert: Partial<any>; Update: Partial<any>; Relationships: [] };
        referral_payouts?: { Row: { id: string; tenant_id?: string; payout_type?: string; amount?: number; created_at?: string }; Insert: Partial<any>; Update: Partial<any>; Relationships: [] };
        payout_notifications?: { Row: { id: string; created_at?: string }; Insert: Partial<any>; Update: Partial<any>; Relationships: [] };
        personas?: { Row: { id: string; persona_kind?: string; created_at?: string }; Insert: Partial<any>; Update: Partial<any>; Relationships: [] };
        persona_signals?: { Row: { id: string; user_id?: string; tenant_id?: string; signal_type?: string; signal_value?: unknown; created_at?: string }; Insert: Partial<any>; Update: Partial<any>; Relationships: [] };
        portfolio_positions?: { Row: { id: string; user_id?: string; created_at?: string }; Insert: Partial<any>; Update: Partial<any>; Relationships: [] };
        portfolio_targets?: { Row: { id: string; user_id?: string; created_at?: string }; Insert: Partial<any>; Update: Partial<any>; Relationships: [] };
        private_fund_holdings?: { Row: { id: string; user_id?: string; created_at?: string }; Insert: Partial<any>; Update: Partial<any>; Relationships: [] };
        rebalancing_events?: { Row: { id: string; user_id?: string; created_at?: string }; Insert: Partial<any>; Update: Partial<any>; Relationships: [] };
        portfolio_performance?: { Row: { id: string; user_id?: string; created_at?: string }; Insert: Partial<any>; Update: Partial<any>; Relationships: [] };
        investment_accounts?: { Row: { id: string; user_id?: string; created_at?: string }; Insert: Partial<any>; Update: Partial<any>; Relationships: [] };
        public_stocks?: { Row: { id: string; ticker_symbol?: string; created_at?: string }; Insert: Partial<any>; Update: Partial<any>; Relationships: [] };
      };
      Functions: GenDB['public']['Functions'] & {
        create_referral_payout?: { Args: any; Returns: any };
        create_override_payout?: { Args: any; Returns: any };
      };
    };
  }
}
