import { supabase } from '@/integrations/supabase/client';

const isDev = import.meta?.env?.MODE === 'development';

export async function tableExists(name: string): Promise<boolean> {
  try {
    const r = await supabase.from(name).select('id', { head: true }).limit(1);
    return !r.error;
  } catch { return false; }
}

export async function safeSelect<T = any>(
  table: string,
  select: string = '*',
  opts: { head?: boolean; limit?: number; order?: { column: string; ascending?: boolean } } = {}
): Promise<{ ok: boolean; data?: T[]; error?: string }> {
  try {
    let q = supabase.from(table).select(select, { head: opts.head ?? false });
    if (opts.order) q = (q as any).order(opts.order.column, { ascending: opts.order.ascending ?? false });
    if (opts.limit) q = q.limit(opts.limit);
    const { data, error } = await q;
    if (error) throw error;
    return { ok: true, data: data as T[] };
  } catch (e: any) {
    if (isDev) console.warn(`[safeSelect] ${table} ->`, e?.message ?? e);
    return { ok: false, error: String(e?.message ?? e) };
  }
}

export async function safeInsert(table: string, rows: any | any[]) {
  try {
    const { error } = await supabase.from(table).insert(rows);
    if (error) throw error;
    return { ok: true };
  } catch (e: any) {
    if (isDev) console.warn(`[safeInsert] ${table} ->`, e?.message ?? e);
    return { ok: false, error: String(e?.message ?? e) };
  }
}

export async function safeUpdate(table: string, patch: any, match: Record<string, any>) {
  try {
    const { error } = await supabase.from(table).update(patch).match(match);
    if (error) throw error;
    return { ok: true };
  } catch (e: any) {
    if (isDev) console.warn(`[safeUpdate] ${table} ->`, e?.message ?? e);
    return { ok: false, error: String(e?.message ?? e) };
  }
}

export async function safeDelete(table: string, match: Record<string, any>) {
  try {
    const { error } = await supabase.from(table).delete().match(match);
    if (error) throw error;
    return { ok: true };
  } catch (e: any) {
    if (isDev) console.warn(`[safeDelete] ${table} ->`, e?.message ?? e);
    return { ok: false, error: String(e?.message ?? e) };
  }
}

/** One-liner: try real query; if table missing or query fails, return fallback() */
export async function withFallback<T>(
  table: string,
  query: () => Promise<{ ok: boolean; data?: T[] }>,
  fallback: () => Promise<T[]> | T[]
): Promise<T[]> {
  const exists = await tableExists(table);
  if (!exists) return await Promise.resolve(fallback());
  const res = await query();
  if (!res.ok || !res.data) return await Promise.resolve(fallback());
  return res.data;
}