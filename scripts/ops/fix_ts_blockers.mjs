import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const targets = [
  'src/hooks/useLeads.ts',
  'src/hooks/useOnboardingProgress.ts',
  'src/hooks/useOrganization.ts',
];

function relaxSupabaseIn(file) {
  if (!existsSync(file)) { console.log('skip (missing):', file); return; }
  let s = readFileSync(file, 'utf8');

  // only operate on files that import the typed client
  if (!s.includes("@/integrations/supabase/client")) {
    console.log('skip (no supabase import):', file);
    return;
  }

  // insert local any-cast once right after the supabase import
  if (!/const\s+sb\s*=\s*supabase\s+as\s+any\s*;?/.test(s)) {
    s = s.replace(
      /(import\s+\{\s*supabase\s*\}\s+from\s+['"]@\/integrations\/supabase\/client['"];?\s*)/,
      '$1\nconst sb = supabase as any;\n'
    );
  }

  // replace calls to the typed client in this file only
  s = s.replace(/\bsupabase\.(from|rpc)\(/g, 'sb.$1(');

  // safer when rows may not exist yet
  s = s.replace(/\.single\(\)/g, '.maybeSingle()');

  writeFileSync(file, s);
  console.log('relaxed generics in:', file);
}

function augmentTypes() {
  const path = 'src/integrations/supabase/types-augment.d.ts';
  const augment = `
// AUTO-GENERATED: stubs for missing tables while bootstrapping.
// Remove when schema + typegen include these and the casts are gone.

import type { Database as GenDB } from './types';

declare module './types' {
  interface Database {
    public: GenDB['public'] & {
      Tables: GenDB['public']['Tables'] & {

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
`.trimStart();

  writeFileSync(path, augment);
  console.log('wrote augmentation:', path);
}

// run
targets.forEach(relaxSupabaseIn);
augmentTypes();
