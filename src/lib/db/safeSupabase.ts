import { supabase } from '@/integrations/supabase/client';

export type Result<T> = {
  ok: boolean;
  data?: T;
  error?: any;
  warning?: string;
};

export async function tableExists(name: string): Promise<boolean> {
  try {
    const { error } = await supabase.from(name).select('id', { head: true }).limit(1);
    return !error;
  } catch {
    return false;
  }
}

export async function safeSelect<T = any>(tableName: string, columns: string = '*', filters: Record<string, any> = {}): Promise<Result<T[]>> {
  try {
    let query = supabase.from(tableName).select(columns);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    });
    
    const { data, error } = await query;
    if (error) throw error;
    return { ok: true, data: (data || []) as T[] };
  } catch (error) {
    console.warn(`safeSelect failed for ${tableName}:`, error);
    return { ok: false, error };
  }
}

export async function safeInsert<T = any>(tableName: string, data: any): Promise<Result<T[]>> {
  try {
    const { data: result, error } = await (supabase as any).from(tableName).insert(data).select();
    if (error) throw error;
    return { ok: true, data: (result || []) as T[] };
  } catch (error) {
    console.warn(`safeInsert failed for ${tableName}:`, error);
    return { ok: false, error };
  }
}

export async function safeUpdate<T = any>(tableName: string, data: any, filters: Record<string, any> = {}): Promise<Result<T[]>> {
  try {
    let query = (supabase as any).from(tableName).update(data);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    });
    
    const { data: result, error } = await query.select();
    if (error) throw error;
    return { ok: true, data: (result || []) as T[] };
  } catch (error) {
    console.warn(`safeUpdate failed for ${tableName}:`, error);
    return { ok: false, error };
  }
}

export async function safeDelete<T = any>(tableName: string, filters: Record<string, any> = {}): Promise<Result<T[]>> {
  try {
    let query = (supabase as any).from(tableName).delete();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    });
    
    const { data: result, error } = await query.select();
    if (error) throw error;
    return { ok: true, data: (result || []) as T[] };
  } catch (error) {
    console.warn(`safeDelete failed for ${tableName}:`, error);
    return { ok: false, error };
  }
}

export async function withFallback<T = any>(tableName: string, queryFn: () => Promise<Result<T[]>>, fallback: (() => Promise<T[]>) | (() => T[]) | T[]): Promise<T[]> {
  try {
    const exists = await tableExists(tableName);
    if (!exists) {
      console.warn(`Table ${tableName} does not exist, returning fallback`);
      // Handle fallback as function or array
      if (typeof fallback === 'function') {
        const fallbackResult = fallback();
        return fallbackResult instanceof Promise ? await fallbackResult : fallbackResult;
      }
      return fallback;
    }
    const result = await queryFn();
    if (result.ok && result.data) {
      return result.data;
    }
    // Handle fallback as function or array for error case
    if (typeof fallback === 'function') {
      const fallbackResult = fallback();
      return fallbackResult instanceof Promise ? await fallbackResult : fallbackResult;
    }
    return fallback;
  } catch (err) {
    console.warn(`withFallback failed for ${tableName}:`, err);
    // Handle fallback as function or array for exception case
    if (typeof fallback === 'function') {
      const fallbackResult = fallback();
      return fallbackResult instanceof Promise ? await fallbackResult : fallbackResult;
    }
    return fallback;
  }
}

export async function safeInsertOptionalTable<T = any>(table: string, row: T): Promise<Result<T[]>> {
  const exists = await tableExists(table);
  if (!exists) return { ok: true, data: [row] as T[], warning: 'table_missing' };
  
  try {
    const { data, error } = await supabase.from(table).insert(row).select();
    if (error) throw error;
    return { ok: true, data: (data || []) as T[] };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function safeQueryOptionalTable<T = any>(tableName: string, columns: string = '*', filters: Record<string, any> = {}): Promise<Result<T[]>> {
  try {
    const result = await safeSelect<T>(tableName, columns, filters);
    return result;
  } catch (error) {
    return { ok: false, error };
  }
}

export default { tableExists, safeSelect, safeInsert, safeUpdate, safeDelete, withFallback, safeInsertOptionalTable, safeQueryOptionalTable };
