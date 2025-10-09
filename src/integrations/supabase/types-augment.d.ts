import type { Database as GenDB } from './types';

declare module './types' {
  interface Database {
    public: GenDB['public'] & {
      Tables: GenDB['public']['Tables'] & {
        leads: { 
          Row: { 
            id: string; 
            first_name?: string; 
            last_name?: string; 
            email?: string; 
            phone?: string; 
            lead_source?: string; 
            lead_status?: string; 
            lead_value?: number; 
            acquisition_cost?: number; 
            notes?: string; 
            advisor_id?: string; 
            campaign_id?: string; 
            agency_id?: string; 
            enrichment_data?: any; 
            catchlight_confidence?: number; 
            budget_score?: number; 
            verified_net_worth?: number; 
            created_at?: string; 
            updated_at?: string; 
          }; 
          Insert: Partial<Row>; 
          Update: Partial<Row>; 
          Relationships: [] 
        };
        user_onboarding_progress: { 
          Row: { 
            id: string; 
            user_id: string; 
            current_step?: number; 
            total_steps?: number; 
            progress_percentage?: number; 
            step_data?: any; 
            status?: string; 
            last_active_at?: string; 
            created_at?: string; 
            updated_at?: string; 
            completed_at?: string; 
          }; 
          Insert: Partial<Row>; 
          Update: Partial<Row>; 
          Relationships: [] 
        };
        employees: { 
          Row: { 
            id: string; 
            user_id?: string; 
            organization_id?: string; 
            role?: string; 
            created_at?: string; 
            updated_at?: string; 
          }; 
          Insert: Partial<Row>; 
          Update: Partial<Row>; 
          Relationships: [] 
        };
        organizations: { 
          Row: { 
            id: string; 
            name?: string; 
            organization_type?: string; 
            logo_url?: string; 
            created_at?: string; 
            updated_at?: string; 
          }; 
          Insert: Partial<Row>; 
          Update: Partial<Row>; 
          Relationships: [] 
        };
        advisor_profiles: {
          Row: {
            id: string;
            user_id: string;
            name?: string;
            bio?: string;
            specialties?: string[];
            created_at?: string;
            updated_at?: string;
          };
          Insert: Partial<Row>;
          Update: Partial<Row>;
          Relationships: [];
        };
        professional_invitations: {
          Row: {
            id: string;
            email: string;
            expires_at: string;
            status?: string;
            created_at?: string;
          };
          Insert: Partial<Row>;
          Update: Partial<Row>;
          Relationships: [];
        };
        professionals: {
          Row: {
            id: string;
            user_id: string;
            name?: string;
            created_at?: string;
          };
          Insert: Partial<Row>;
          Update: Partial<Row>;
          Relationships: [];
        };
        target_runs: {
          Row: {
            id: string;
            tenant_id?: string;
            created_at?: string;
          };
          Insert: Partial<Row>;
          Update: Partial<Row>;
          Relationships: [];
        };
        aies_receipts: {
          Row: {
            id: string;
            created_at: string;
            inputs?: any;
          };
          Insert: Partial<Row>;
          Update: Partial<Row>;
          Relationships: [];
        };
      };
      Functions: GenDB['public']['Functions'] & {
        get_table_rls_status: {
          Args: Record<string, never>;
          Returns: Array<{ table_name: string; rls_enabled: boolean }>;
        };
        get_table_policies: {
          Args: { table_name: string };
          Returns: Array<{ policy_name: string; command: string }>;
        };
      };
    };
  }
}
