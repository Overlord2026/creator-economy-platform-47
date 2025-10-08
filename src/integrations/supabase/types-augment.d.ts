import type { Database as GenDB } from './types';
declare module './types' {
  interface Database {
    public: GenDB['public'] & {
      Tables: GenDB['public']['Tables'] & {
        leads?: { Row: any; Insert: any; Update: any };
        onboarding_flow_progress?: { Row: any; Insert: any; Update: any };
        employees?: { Row: any; Insert: any; Update: any };
        organizations?: { Row: any; Insert: any; Update: any };
        referral_payouts?: { Row: any; Insert: any; Update: any };
        payout_notifications?: { Row: any; Insert: any; Update: any };
        personas?: { Row: any; Insert: any; Update: any };
        persona_signals?: { Row: any; Insert: any; Update: any };
        portfolio_positions?: { Row: any; Insert: any; Update: any };
        portfolio_targets?: { Row: any; Insert: any; Update: any };
        private_fund_holdings?: { Row: any; Insert: any; Update: any };
        rebalancing_events?: { Row: any; Insert: any; Update: any };
        portfolio_performance?: { Row: any; Insert: any; Update: any };
        investment_accounts?: { Row: any; Insert: any; Update: any };
        public_stocks?: { Row: any; Insert: any; Update: any };
      };
      Functions: GenDB['public']['Functions'] & {
        create_referral_payout?: { Args: any; Returns: any };
        create_override_payout?: { Args: any; Returns: any };
      };
    };
  }
}
