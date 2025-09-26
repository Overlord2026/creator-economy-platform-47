import type { PostgrestSingleResponse, PostgrestMaybeSingleResponse } from '@supabase/postgrest-js';

export function asList<T>(res: { data: T[] | null } | T[] | null | undefined): T[] {
  if (Array.isArray(res)) return res;
  if (res && 'data' in (res as any)) return ((res as { data: T[] | null }).data ?? []) as T[];
  return [];
}

export function asOne<T>(res: PostgrestSingleResponse<T> | PostgrestMaybeSingleResponse<T>): T | null {
  const anyRes = res as any;
  if (anyRes?.data === undefined) return null;
  return (anyRes.data ?? null) as T | null;
}
