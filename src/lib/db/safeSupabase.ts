/**
 * Safe Supabase helpers with fallbacks for missing tables/methods
 */
import { supabase } from '@/integrations/supabase/client';

export async function tableExists(name: string): Promise<boolean> {
  try {
    const { error } = await supabase.from(name).select('id', { head: true }).limit(1);
    return !error;
  } catch {
    return false;
  }
}

export async function safeSelect<T>(tableName: string, columns: string = '*', filters: Record<string, any> = {}): Promise<T[]> {
  try {
    let query = supabase.from(tableName).select(columns);
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    });
    
    const { data, error } = await query;
    if (error) throw error;
    return (data || []) as T[];
  } catch (err) {
    console.warn(`safeSelect failed for ${tableName}:`, err);
    return [];
  }
}

export async function safeInsert<T>(tableName: string, data: any): Promise<{ data?: T[], error?: any, ok?: boolean }> {
  try {
    const result = await (supabase as any).from(tableName).insert(data).select();
    return { ...result, ok: !result.error };
  } catch (err) {
    console.warn(`safeInsert failed for ${tableName}:`, err);
    return { error: err, ok: false };
  }
}

export async function safeUpdate<T>(tableName: string, data: any, filters: Record<string, any> = {}): Promise<{ data?: T[], error?: any, ok?: boolean }> {
  try {
    let query = (supabase as any).from(tableName).update(data);
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    });
    
    const result = await query.select();
    return { ...result, ok: !result.error };
  } catch (err) {
    console.warn(`safeUpdate failed for ${tableName}:`, err);
    return { error: err, ok: false };
  }
}

export async function withFallback<T>(tableName: string, queryFnOrFallback: (() => Promise<T[]>) | T[], fallback?: T[]): Promise<T[]> {
  // Handle the case where this is called with (tableName, fallbackArray) instead of (tableName, queryFn, fallbackArray)
  if (Array.isArray(queryFnOrFallback)) {
    return queryFnOrFallback;
  }
  
  const queryFn = queryFnOrFallback as () => Promise<T[]>;
  const actualFallback = fallback || [];
  
  try {
    const exists = await tableExists(tableName);
    if (!exists) {
      console.warn(`Table ${tableName} does not exist, returning fallback`);
      return actualFallback;
    }
    return await queryFn();
  } catch (err) {
    console.warn(`withFallback failed for ${tableName}:`, err);
    return actualFallback;
  }
}

export async function safeQueryOptionalTable<T>(tableName: string, columns: string = '*', filters: Record<string, any> = {}): Promise<{ data?: T[], error?: any, ok?: boolean }> {
  try {
    const data = await safeSelect<T>(tableName, columns, filters);
    return { data, ok: true };
  } catch (error) {
    return { error, ok: false };
  }
}

export async function safeInsertOptionalTable<T>(table: string, row: T) {
  const exists = await tableExists(table);
  if (!exists) return { warning: 'table_missing', data: row };
  try {
    const { data, error } = await supabase.from(table).insert(row).select();
    if (error) return { error };
    return { data };
  } catch (err) {
    return { error: err };
  }
}

export default { tableExists, safeSelect, safeInsert, safeUpdate, withFallback, safeInsertOptionalTable, safeQueryOptionalTable };
