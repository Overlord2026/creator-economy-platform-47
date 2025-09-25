export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      cap_spend: {
        Row: {
          amount_committed: number
          amount_paid: number
          created_at: string
          deal_id: string | null
          id: string
          org_id: string
          school_id: string
          sport_id: string | null
        }
        Insert: {
          amount_committed?: number
          amount_paid?: number
          created_at?: string
          deal_id?: string | null
          id?: string
          org_id: string
          school_id: string
          sport_id?: string | null
        }
        Update: {
          amount_committed?: number
          amount_paid?: number
          created_at?: string
          deal_id?: string | null
          id?: string
          org_id?: string
          school_id?: string
          sport_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cap_spend_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deal_ledger"
            referencedColumns: ["id"]
          },
        ]
      }
      dd_packages: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          org_id: string
          package_data: Json | null
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          org_id: string
          package_data?: Json | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          org_id?: string
          package_data?: Json | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      deal_ledger: {
        Row: {
          athlete_id: string | null
          brand_id: string | null
          created_at: string
          created_by: string | null
          deliverables: Json
          description: string | null
          id: string
          org_id: string
          school_id: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          athlete_id?: string | null
          brand_id?: string | null
          created_at?: string
          created_by?: string | null
          deliverables?: Json
          description?: string | null
          id?: string
          org_id: string
          school_id?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          athlete_id?: string | null
          brand_id?: string | null
          created_at?: string
          created_by?: string | null
          deliverables?: Json
          description?: string | null
          id?: string
          org_id?: string
          school_id?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      disclosures: {
        Row: {
          checked_at: string | null
          checksum: string | null
          created_at: string
          created_by: string | null
          deal_id: string
          id: string
          label_variant: string
          media_url: string | null
          org_id: string
          passed_preflight: boolean | null
          placement: string | null
          platform: string
        }
        Insert: {
          checked_at?: string | null
          checksum?: string | null
          created_at?: string
          created_by?: string | null
          deal_id: string
          id?: string
          label_variant: string
          media_url?: string | null
          org_id: string
          passed_preflight?: boolean | null
          placement?: string | null
          platform: string
        }
        Update: {
          checked_at?: string | null
          checksum?: string | null
          created_at?: string
          created_by?: string | null
          deal_id?: string
          id?: string
          label_variant?: string
          media_url?: string | null
          org_id?: string
          passed_preflight?: boolean | null
          placement?: string | null
          platform?: string
        }
        Relationships: [
          {
            foreignKeyName: "disclosures_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deal_ledger"
            referencedColumns: ["id"]
          },
        ]
      }
      fmv_quotes: {
        Row: {
          comps_ref: string | null
          created_at: string
          deal_id: string | null
          id: string
          inputs_json: Json
          model_hash: string
          model_version: string
          org_id: string
          quote_band: number | null
          quote_value: number
        }
        Insert: {
          comps_ref?: string | null
          created_at?: string
          deal_id?: string | null
          id?: string
          inputs_json: Json
          model_hash: string
          model_version: string
          org_id: string
          quote_band?: number | null
          quote_value: number
        }
        Update: {
          comps_ref?: string | null
          created_at?: string
          deal_id?: string | null
          id?: string
          inputs_json?: Json
          model_hash?: string
          model_version?: string
          org_id?: string
          quote_band?: number | null
          quote_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "fmv_quotes_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deal_ledger"
            referencedColumns: ["id"]
          },
        ]
      }
      fund_holdings_lookup: {
        Row: {
          as_of_date: string
          created_at: string
          fund_id: string
          holding_id: string
          id: string
          org_id: string
          value: number | null
          weight: number | null
        }
        Insert: {
          as_of_date?: string
          created_at?: string
          fund_id: string
          holding_id: string
          id?: string
          org_id: string
          value?: number | null
          weight?: number | null
        }
        Update: {
          as_of_date?: string
          created_at?: string
          fund_id?: string
          holding_id?: string
          id?: string
          org_id?: string
          value?: number | null
          weight?: number | null
        }
        Relationships: []
      }
      liquidity_events: {
        Row: {
          amount: number | null
          created_at: string
          event_date: string
          event_type: string
          fund_id: string | null
          id: string
          org_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          event_date?: string
          event_type: string
          fund_id?: string | null
          id?: string
          org_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          event_date?: string
          event_type?: string
          fund_id?: string | null
          id?: string
          org_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      liquidity_scores: {
        Row: {
          calculated_at: string
          created_at: string
          fund_id: string | null
          id: string
          org_id: string
          score: number | null
          score_type: string | null
        }
        Insert: {
          calculated_at?: string
          created_at?: string
          fund_id?: string | null
          id?: string
          org_id: string
          score?: number | null
          score_type?: string | null
        }
        Update: {
          calculated_at?: string
          created_at?: string
          fund_id?: string | null
          id?: string
          org_id?: string
          score?: number | null
          score_type?: string | null
        }
        Relationships: []
      }
      org_members: {
        Row: {
          inserted_at: string
          org_id: string
          role: string | null
          user_id: string
        }
        Insert: {
          inserted_at?: string
          org_id: string
          role?: string | null
          user_id: string
        }
        Update: {
          inserted_at?: string
          org_id?: string
          role?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payouts: {
        Row: {
          amount_usd: number
          created_at: string
          currency: string
          deal_id: string | null
          external_id: string | null
          fee_usd: number
          id: string
          method: string
          org_id: string
          paid_at: string | null
          payee_id: string
          status: string
          tax_form_id: string | null
        }
        Insert: {
          amount_usd: number
          created_at?: string
          currency?: string
          deal_id?: string | null
          external_id?: string | null
          fee_usd?: number
          id?: string
          method: string
          org_id: string
          paid_at?: string | null
          payee_id: string
          status?: string
          tax_form_id?: string | null
        }
        Update: {
          amount_usd?: number
          created_at?: string
          currency?: string
          deal_id?: string | null
          external_id?: string | null
          fee_usd?: number
          id?: string
          method?: string
          org_id?: string
          paid_at?: string | null
          payee_id?: string
          status?: string
          tax_form_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payouts_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deal_ledger"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          client_segment: string | null
          created_at: string
          date_of_birth: string | null
          date_of_birth_date: string | null
          display_name: string | null
          email: string | null
          first_name: string | null
          gender: string | null
          id: string
          investor_type: string | null
          last_name: string | null
          marital_status: string | null
          middle_name: string | null
          permissions: Json | null
          phone: string | null
          role: string | null
          suffix: string | null
          tenant_id: string | null
          title: string | null
          two_factor_enabled: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          client_segment?: string | null
          created_at?: string
          date_of_birth?: string | null
          date_of_birth_date?: string | null
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          investor_type?: string | null
          last_name?: string | null
          marital_status?: string | null
          middle_name?: string | null
          permissions?: Json | null
          phone?: string | null
          role?: string | null
          suffix?: string | null
          tenant_id?: string | null
          title?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          client_segment?: string | null
          created_at?: string
          date_of_birth?: string | null
          date_of_birth_date?: string | null
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          investor_type?: string | null
          last_name?: string | null
          marital_status?: string | null
          middle_name?: string | null
          permissions?: Json | null
          phone?: string | null
          role?: string | null
          suffix?: string | null
          tenant_id?: string | null
          title?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      proofs: {
        Row: {
          captured_at: string
          deal_id: string
          id: string
          meta: Json
          org_id: string
          sha256: string | null
          type: string
          uri: string
        }
        Insert: {
          captured_at?: string
          deal_id: string
          id?: string
          meta?: Json
          org_id: string
          sha256?: string | null
          type: string
          uri: string
        }
        Update: {
          captured_at?: string
          deal_id?: string
          id?: string
          meta?: Json
          org_id?: string
          sha256?: string | null
          type?: string
          uri?: string
        }
        Relationships: [
          {
            foreignKeyName: "proofs_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deal_ledger"
            referencedColumns: ["id"]
          },
        ]
      }
      qa_findings: {
        Row: {
          created_at: string
          deal_id: string
          evidence_ref: string | null
          id: string
          notes: string | null
          org_id: string
          passed: boolean
          rule: string
          severity: string
        }
        Insert: {
          created_at?: string
          deal_id: string
          evidence_ref?: string | null
          id?: string
          notes?: string | null
          org_id: string
          passed: boolean
          rule: string
          severity?: string
        }
        Update: {
          created_at?: string
          deal_id?: string
          evidence_ref?: string | null
          id?: string
          notes?: string | null
          org_id?: string
          passed?: boolean
          rule?: string
          severity?: string
        }
        Relationships: [
          {
            foreignKeyName: "qa_findings_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deal_ledger"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qa_findings_evidence_ref_fkey"
            columns: ["evidence_ref"]
            isOneToOne: false
            referencedRelation: "proofs"
            referencedColumns: ["id"]
          },
        ]
      }
      receipts: {
        Row: {
          anchor_ref: Json | null
          anchor_status: string | null
          canonical: Json
          created_at: string
          id: string
          inputs_hash: string
          org_id: string | null
          payload: Json
          policy_version: string
          reasons: string[] | null
          result: Json | null
          sha256_hash: string
          tenant_id: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          anchor_ref?: Json | null
          anchor_status?: string | null
          canonical?: Json
          created_at?: string
          id?: string
          inputs_hash: string
          org_id?: string | null
          payload?: Json
          policy_version: string
          reasons?: string[] | null
          result?: Json | null
          sha256_hash: string
          tenant_id?: string | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          anchor_ref?: Json | null
          anchor_status?: string | null
          canonical?: Json
          created_at?: string
          id?: string
          inputs_hash?: string
          org_id?: string | null
          payload?: Json
          policy_version?: string
          reasons?: string[] | null
          result?: Json | null
          sha256_hash?: string
          tenant_id?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      school_caps: {
        Row: {
          cap_amount: number
          created_at: string
          fiscal_year: number
          id: string
          org_id: string
          school_id: string
        }
        Insert: {
          cap_amount: number
          created_at?: string
          fiscal_year: number
          id?: string
          org_id: string
          school_id: string
        }
        Update: {
          cap_amount?: number
          created_at?: string
          fiscal_year?: number
          id?: string
          org_id?: string
          school_id?: string
        }
        Relationships: []
      }
      submissions: {
        Row: {
          ack_at: string | null
          ack_id: string | null
          ack_status: string
          created_at: string
          deal_id: string
          destination: string
          id: string
          org_id: string
          payload_uri: string
          response: Json
        }
        Insert: {
          ack_at?: string | null
          ack_id?: string | null
          ack_status?: string
          created_at?: string
          deal_id: string
          destination: string
          id?: string
          org_id: string
          payload_uri: string
          response?: Json
        }
        Update: {
          ack_at?: string | null
          ack_id?: string | null
          ack_status?: string
          created_at?: string
          deal_id?: string
          destination?: string
          id?: string
          org_id?: string
          payload_uri?: string
          response?: Json
        }
        Relationships: [
          {
            foreignKeyName: "submissions_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deal_ledger"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_org_member: {
        Args: { row_org: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
