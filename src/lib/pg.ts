import { sb } from '@/lib/supabase-relaxed';
const supabase = sb as any;

// Version-proof way to get one row from a Supabase query
export async function firstRow<T = any>(q: any): Promise<T | null> {
  const { data, error } = await q.limit(1);
  if (error) throw error;
  return (data?.[0] ?? null) as T | null;
}

// Generic helper for tables not in generated types
export async function queryTable<T = any>(tableName: string, columns = '*', filters: Record<string, any> = {}): Promise<{ data: T[] | null, error: any }> {
  try {
    // Use raw SQL query to bypass TypeScript restrictions
    let whereClause = '';
    const values: any[] = [];
    
    if (Object.keys(filters).length > 0) {
      const conditions = Object.entries(filters).map(([key, value], index) => {
        values.push(value);
        return `${key} = $${index + 1}`;
      });
      whereClause = ` WHERE ${conditions.join(' AND ')}`;
    }
    
    const { data, error } = await supabase.rpc('custom_query', {
      query: `SELECT ${columns} FROM ${tableName}${whereClause}`,
      params: values
    });
    
    return { data: data as T[], error };
  } catch (error) {
    // Fallback: try using the client directly (will work for existing tables)
    try {
      let query = (supabase as any).from(tableName).select(columns);
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
      
      const result = await query;
      return result;
    } catch (fallbackError) {
      return { data: null, error: fallbackError };
    }
  }
}