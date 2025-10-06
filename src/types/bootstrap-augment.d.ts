/**
 * Minimal augmentation so code like Tables<"franchise_referrals"> compiles
 * even when the generated supabase.ts lacks these tables (bootstrap/dev).
 * This has no runtime effect; it's types-only.
 */
import type { Database as GenDB } from "@/types/supabase";

declare module "@/types/supabase" {
  // Extend the generated Database type with stubs
  interface Database {
    public: GenDB["public"] & {
      Tables: GenDB["public"]["Tables"] & {
        franchise_referrals?: {
          Row: { id: string; created_at?: string; status?: string };
          Insert: Partial<{ id: string; created_at: string; status: string }>;
          Update: Partial<{ id: string; created_at: string; status: string }>;
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
