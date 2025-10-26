/* lightweight fetch helpers + withFallback that supports array or factory */
import { supabase } from '@/integrations/supabase/client';

export type Ok<T>    = { ok: true;  data: T };
export type Err<E=any> = { ok: false; error: E };
export type Res<T>   = Ok<T> | Err;

export function isOk<T>(r: Res<T>): r is Ok<T> { return (r as any).ok === true; }

export async function withFallback<T>(
  valueOrFactory: T | (() => T | Promise<T>),
  fallback: T
): Promise<T> {
  try {
    const v = typeof valueOrFactory === 'function'
      ? await (valueOrFactory as any)()
      : valueOrFactory;
    return (v ?? fallback) as T;
  } catch {
    return fallback;
  }
}

// Check if a table exists
export async function tableExists(tableName: string): Promise<boolean> {
  try {
    const { error } = await supabase.from(tableName).select('*').limit(0);
    return !error;
  } catch {
    return false;
  }
}

// Safe select with fallback
export async function safeSelect<T = any>(
  tableName: string,
  columns = '*',
  filters: Record<string, any> = {}
): Promise<Res<T[]>> {
  try {
    const exists = await tableExists(tableName);
    if (!exists) {
      return { ok: false, error: `Table ${tableName} does not exist` };
    }

    let query = supabase.from(tableName).select(columns);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    });
    
    const { data, error } = await query;
    
    if (error) {
      return { ok: false, error };
    }
    
    return { ok: true, data: (data || []) as T[] };
  } catch (error) {
    return { ok: false, error };
  }
}

// Safe insert with fallback
export async function safeInsert<T = any>(
  tableName: string,
  record: Record<string, any>
): Promise<Res<T>> {
  try {
    const exists = await tableExists(tableName);
    if (!exists) {
      return { ok: false, error: `Table ${tableName} does not exist` };
    }

    const { data, error } = await supabase
      .from(tableName)
      .insert(record)
      .select()
      .single();
    
    if (error) {
      return { ok: false, error };
    }
    
    return { ok: true, data: data as T };
  } catch (error) {
    return { ok: false, error };
  }
}

// Safe update with fallback
export async function safeUpdate<T = any>(
  tableName: string,
  updates: Record<string, any>,
  filters: Record<string, any>
): Promise<Res<T[]>> {
  try {
    const exists = await tableExists(tableName);
    if (!exists) {
      return { ok: false, error: `Table ${tableName} does not exist` };
    }

    let query = supabase.from(tableName).update(updates);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    });
    
    const { data, error } = await query.select();
    
    if (error) {
      return { ok: false, error };
    }
    
    return { ok: true, data: (data || []) as T[] };
  } catch (error) {
    return { ok: false, error };
  }
}

// Safe query for optional table
export async function safeQueryOptionalTable<T = any>(
  tableName: string,
  columns = '*',
  filters: Record<string, any> = {}
): Promise<T[]> {
  const result = await safeSelect<T>(tableName, columns, filters);
  return isOk(result) ? result.data : [];
}
