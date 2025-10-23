/* lightweight fetch helpers + withFallback that supports array or factory */
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
<<<<<<< HEAD
    return false;
  }
}

export async function safeSelect<T>(tableName: string, columns: string = '*', filters: Record<string, any> = {}): Promise<Result<T[]>> {
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

export async function safeInsert<T>(tableName: string, data: any): Promise<Result<T[]>> {
  try {
    const { data: result, error } = await (supabase as any).from(tableName).insert(data).select();
    if (error) throw error;
    return { ok: true, data: (result || []) as T[] };
  } catch (error) {
    console.warn(`safeInsert failed for ${tableName}:`, error);
    return { ok: false, error };
  }
}

export async function safeUpdate<T>(tableName: string, data: any, filters: Record<string, any> = {}): Promise<Result<T[]>> {
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

export async function safeDelete<T>(tableName: string, filters: Record<string, any> = {}): Promise<Result<T[]>> {
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

export async function withFallback<T>(
  tableName: string, 
  queryFn: () => Promise<Result<T[]>>, 
  fallback: T[] | (() => T[] | Promise<T[]>)
): Promise<T[]> {
  const resolveFallback = async (): Promise<T[]> => {
    if (typeof fallback === 'function') {
      const result = fallback();
      return result instanceof Promise ? await result : result;
    }
    return fallback;
  };

  try {
    const exists = await tableExists(tableName);
    if (!exists) {
      console.warn(`Table ${tableName} does not exist, returning fallback`);
      return await resolveFallback();
    }
    const result = await queryFn();
    return result.ok ? (result.data || await resolveFallback()) : await resolveFallback();
  } catch (err) {
    console.warn(`withFallback failed for ${tableName}:`, err);
    return await resolveFallback();
  }
}

export async function safeInsertOptionalTable<T>(table: string, row: T): Promise<Result<T[]>> {
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

export async function safeQueryOptionalTable<T>(tableName: string, columns: string = '*', filters: Record<string, any> = {}): Promise<Result<T[]>> {
  try {
    const result = await safeSelect<T>(tableName, columns, filters);
    return result;
  } catch (error) {
    return { ok: false, error };
  }
}

export default { tableExists, safeSelect, safeInsert, safeUpdate, safeDelete, withFallback, safeInsertOptionalTable, safeQueryOptionalTable };
=======
    return fallback;
  }
}
>>>>>>> demo/offerlock-202509261311
