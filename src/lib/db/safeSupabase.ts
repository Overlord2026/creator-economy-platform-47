/**
 * Minimal safe Supabase helpers (stub).
 * Replace getAnonClient/getAdminClient imports per your project.
 */
import { getAdminClient, getAnonClient } from '@/integrations/supabase/client';

const admin = getAdminClient();
const anon = getAnonClient();

export async function tableExists(name: string): Promise<boolean> {
  try {
    // simple probe - select 1 from table (adjust per privileges)
    const { error } = await admin.from(name).select('id', { head: true }).limit(1);
    return !error;
  } catch {
    return false;
  }
}

export async function safeInsertOptionalTable<T>(table:string, row:T) {
  const exists = await tableExists(table);
  if (!exists) return { warning: 'table_missing', data: row };
  try {
    const { data, error } = await admin.from(table).insert(row).select();
    if (error) return { error };
    return { data };
  } catch (err) {
    return { error: err };
  }
}

export default { tableExists, safeInsertOptionalTable };
