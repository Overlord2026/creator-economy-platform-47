import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { BOOTSTRAP_MODE } from '@/config/bootstrap';

// Local minimal types for UI-only mode
interface FamilyVault {
  id: string;
  name: string;
  description?: string;
  family_name?: string;
  family_values?: string[];
  vault_photo_url?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  org_id: string;
}

interface VaultMember {
  id: string;
  vault_id: string;
  user_id: string;
  role: string;
  joined_at: string;
  created_at: string;
}

interface LegacyItem {
  id: string;
  vault_id: string;
  title: string;
  description?: string;
  item_type: string;
  file_url?: string;
  metadata: Record<string, any>;
  created_by: string;
  created_at: string;
}

interface VaultAccessLog {
  id: string;
  vault_id: string;
  user_id: string;
  action: string;
  resource_type?: string;
  resource_id?: string;
  details: Record<string, any>;
  created_at: string;
}

export interface CreateVaultData {
  name: string;
  description?: string;
  family_name?: string;
  family_values?: string[];
}

export interface InviteMemberData {
  email: string;
  role: string;
}

export interface UploadItemData {
  title: string;
  description?: string;
  item_type: string;
  file_url?: string;
  metadata?: Record<string, any>;
}

export interface UseFamilyVaultReturn {
  vaults: FamilyVault[];
  members: VaultMember[];
  legacyItems: LegacyItem[];
  auditLogs: VaultAccessLog[];
  loading: boolean;
  error: string | null;
  createVault: (vaultData: CreateVaultData) => Promise<FamilyVault | null>;
  inviteMember: (vaultId: string, memberData: InviteMemberData) => Promise<boolean>;
  uploadLegacyItem: (vaultId: string, itemData: UploadItemData) => Promise<boolean>;
}

export function useFamilyVault(vaultId?: string): UseFamilyVaultReturn {
  const { toast } = useToast();
  const [vaults, setVaults] = useState<FamilyVault[]>([]);
  const [members, setMembers] = useState<VaultMember[]>([]);
  const [legacyItems, setLegacyItems] = useState<LegacyItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<VaultAccessLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Bootstrap mode: return UI-only stub
  if (BOOTSTRAP_MODE) {
    return {
      vaults: [],
      members: [],
      legacyItems: [],
      auditLogs: [],
      loading: false,
      error: null,
      createVault: async () => null,
      inviteMember: async () => false,
      uploadLegacyItem: async () => false
    };
  }

  // Future: Non-bootstrap mode would implement actual Supabase calls
  useEffect(() => {
    if (BOOTSTRAP_MODE) return;
    
    // Placeholder for future implementation
    setLoading(false);
  }, [vaultId]);

  const createVault = async (vaultData: CreateVaultData): Promise<FamilyVault | null> => {
    if (BOOTSTRAP_MODE) return null;
    // Placeholder for future implementation
    return null;
  };

  const inviteMember = async (vaultId: string, memberData: InviteMemberData): Promise<boolean> => {
    if (BOOTSTRAP_MODE) return false;
    // Placeholder for future implementation
    return false;
  };

  const uploadLegacyItem = async (vaultId: string, itemData: UploadItemData): Promise<boolean> => {
    if (BOOTSTRAP_MODE) return false;
    // Placeholder for future implementation
    return false;
  };

  return {
    vaults,
    members,
    legacyItems,
    auditLogs,
    loading,
    error,
    createVault,
    inviteMember,
    uploadLegacyItem
  };
}
