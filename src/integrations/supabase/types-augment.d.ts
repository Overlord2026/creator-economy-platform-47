import { Database } from './types';

declare module './types' {
  export interface Database {
    public: Database['public'] & {
      Tables: Database['public']['Tables'] & {
        tenants: any;
        tenant_settings: any;
        admin_users: any;
        v_ip_filings_by_family: any;
        ip_families: any;
        denial_telemetry: any;
        estate_requests: any;
        vault_items: any;
      };
      Functions: Database['public']['Functions'] & {
        get_health_receipts: any;
        custom_query: any;
      };
    };
  }
}
