import { supabase } from '@/lib/supabase';

export async function getCurrentUserId(): Promise<string> {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  const id = data?.user?.id;
  if (!id) throw new Error('No authenticated user.');
  return id;
}

export async function resolveOrgId(userId?: string): Promise<string> {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  const metaOrg = (data?.user?.app_metadata as any)?.org_id as string | undefined;
  if (metaOrg) return metaOrg;
  const uid = userId ?? data?.user?.id;
  if (!uid) throw new Error('No authenticated user.');
  const { data: m, error: mErr } = await supabase
    .from('org_members')
    .select('org_id')
    .eq('user_id', uid)
    .order('inserted_at', { ascending: false })
    .limit(1);
  if (mErr) throw mErr;
  const row = m?.[0];
  if (!row?.org_id) throw new Error('Missing org_id — user must belong to an organization.');
  return row.org_id as string;
}
