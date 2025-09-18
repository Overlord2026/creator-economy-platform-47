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
      audit_receipts: {
        Row: {
          action: string
          actor_id: string
          canonical: Json
          created_at: string
          entity: string
          entity_id: string
          id: string
          sha256: string
        }
        Insert: {
          action: string
          actor_id: string
          canonical: Json
          created_at?: string
          entity: string
          entity_id: string
          id?: string
          sha256: string
        }
        Update: {
          action?: string
          actor_id?: string
          canonical?: Json
          created_at?: string
          entity?: string
          entity_id?: string
          id?: string
          sha256?: string
        }
        Relationships: []
      }
      compliance_gates: {
        Row: {
          creator_id: string
          disclosure: boolean
          ftc_labels: boolean
          training: boolean
          updated_at: string
        }
        Insert: {
          creator_id: string
          disclosure?: boolean
          ftc_labels?: boolean
          training?: boolean
          updated_at?: string
        }
        Update: {
          creator_id?: string
          disclosure?: boolean
          ftc_labels?: boolean
          training?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      deals: {
        Row: {
          created_at: string
          id: string
          offer_id: string
          status: Database["public"]["Enums"]["deal_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          offer_id: string
          status?: Database["public"]["Enums"]["deal_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          offer_id?: string
          status?: Database["public"]["Enums"]["deal_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deals_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "v_my_offers"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          brand: string | null
          compensation: number | null
          compensation_currency: string | null
          created_at: string
          creator_id: string
          end_date: string | null
          id: string
          notes: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["offer_status"]
          title: string
          updated_at: string
        }
        Insert: {
          brand?: string | null
          compensation?: number | null
          compensation_currency?: string | null
          created_at?: string
          creator_id: string
          end_date?: string | null
          id?: string
          notes?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["offer_status"]
          title: string
          updated_at?: string
        }
        Update: {
          brand?: string | null
          compensation?: number | null
          compensation_currency?: string | null
          created_at?: string
          creator_id?: string
          end_date?: string | null
          id?: string
          notes?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["offer_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      payouts: {
        Row: {
          amount: number
          created_at: string
          currency: string
          deal_id: string
          funded: boolean
          id: string
          released: boolean
          splits: Json
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          deal_id: string
          funded?: boolean
          id?: string
          released?: boolean
          splits?: Json
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          deal_id?: string
          funded?: boolean
          id?: string
          released?: boolean
          splits?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payouts_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payouts_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "v_my_deals"
            referencedColumns: ["id"]
          },
        ]
      }
      proofs: {
        Row: {
          created_at: string
          hash: string | null
          id: string
          items: Json
          offer_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          hash?: string | null
          id?: string
          items?: Json
          offer_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          hash?: string | null
          id?: string
          items?: Json
          offer_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "proofs_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proofs_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "v_my_offers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      v_my_deals: {
        Row: {
          created_at: string | null
          id: string | null
          offer_id: string | null
          status: Database["public"]["Enums"]["deal_status"] | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "v_my_offers"
            referencedColumns: ["id"]
          },
        ]
      }
      v_my_offers: {
        Row: {
          brand: string | null
          compensation: number | null
          compensation_currency: string | null
          created_at: string | null
          creator_id: string | null
          end_date: string | null
          id: string | null
          notes: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["offer_status"] | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          brand?: string | null
          compensation?: number | null
          compensation_currency?: string | null
          created_at?: string | null
          creator_id?: string | null
          end_date?: string | null
          id?: string | null
          notes?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["offer_status"] | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          brand?: string | null
          compensation?: number | null
          compensation_currency?: string | null
          created_at?: string | null
          creator_id?: string | null
          end_date?: string | null
          id?: string | null
          notes?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["offer_status"] | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      v_my_payouts: {
        Row: {
          amount: number | null
          created_at: string | null
          currency: string | null
          deal_id: string | null
          funded: boolean | null
          id: string | null
          released: boolean | null
          splits: Json | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payouts_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payouts_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "v_my_deals"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      user_owns_deal: {
        Args: { p_deal_id: string }
        Returns: boolean
      }
      user_owns_offer: {
        Args: { p_offer_id: string }
        Returns: boolean
      }
    }
    Enums: {
      deal_status: "open" | "funded" | "released" | "closed"
      offer_status: "brief" | "locked" | "signed" | "cancelled"
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
    Enums: {
      deal_status: ["open", "funded", "released", "closed"],
      offer_status: ["brief", "locked", "signed", "cancelled"],
    },
  },
} as const
