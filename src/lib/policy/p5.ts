import { sb } from '@/lib/supabase-relaxed';

export async function guardedAction(actionKey: string, personaId: string, context: Record<string, unknown> = {}) {
  const { data, error } = await sb.functions.invoke('gate-action', { 
    body: { 
      action_key: actionKey, 
      persona_id: personaId, 
      context 
    } 
  });
  if (error) throw error;
  return data as { allow: boolean; reason_code: string; receipt: { id: string } };
}