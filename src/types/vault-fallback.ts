export type AuditLogEntry = {
  id: string;
  user_id: string;
  action_type: string;
  resource_type?: string;
  details?: Record<string, unknown>;
  created_at: string;
  ip_address?: string;
  user_agent?: string;
  profiles?: { id: string; first_name?: string; last_name?: string; email?: string };
};

export type VaultSettingsForm = {
  family_name?: string | null;
  family_values?: string[] | null;
  vault_photo_url?: string | null;
  [k: string]: unknown;
};

export type LegacyItem = {
  id: string;
  vault_id: string;
  created_by: string;
  title: string;
  description?: string;
  created_at?: string;
};