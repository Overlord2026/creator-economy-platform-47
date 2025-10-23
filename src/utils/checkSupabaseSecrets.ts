import { sb } from '@/lib/supabase-relaxed';

export async function checkSupabaseSecrets() {
  try {
    const { data, error } = await sb.functions.invoke('list-supabase-secrets');
    
    if (error) {
      console.error('Error checking Supabase secrets:', error);
      return null;
    }
    
    console.log('Supabase Secrets Status:', data);
    return data;
  } catch (error) {
    console.error('Failed to check Supabase secrets:', error);
    return null;
  }
}