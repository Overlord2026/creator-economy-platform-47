import type { Database as GenDB } from './types';

declare module './types' {
  interface Database {
    public: GenDB['public'] & {
      Tables: GenDB['public']['Tables'] & {
        leads?: { Row: { id: string; first_name?: string; last_name?: string; email?: string; phone?: string; lead_source?: string; lead_status?: string; lead_value?: number; acquisition_cost?: number; notes?: string; advisor_id?: string; campaign_id?: string; agency_id?: string; enrichment_data?: unknown; catchlight_confidence?: number; budget_score?: number; verified_net_worth?: number; created_at?: string; updated_at?: string; }; Insert: Partial<Row>; Update: Partial<Row>; Relationships: [] };
        onboarding_flow_progress?: { Row: { id: string; user_id: string; current_step?: number; total_steps?: number; progress_percentage?: number; step_data?: unknown; status?: string; last_active_at?: string; created_at?: string; updated_at?: string; completed_at?: string; }; Insert: Partial<Row>; Update: Partial<Row>; Relationships: [] };
        employees?: { Row: { id: string; user_id?: string; organization_id?: string; role?: string; created_at?: string; updated_at?: string; }; Insert: Partial<Row>; Update: Partial<Row>; Relationships: [] };
        organizations?: { Row: { id: string; name?: string; organization_type?: string; logo_url?: string; created_at?: string; updated_at?: string; }; Insert: Partial<Row>; Update: Partial<Row>; Relationships: [] };
      };
    };
  }
}
