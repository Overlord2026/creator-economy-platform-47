import { supabase } from '@/integrations/supabase/client';

export async function createDispute(data: {
  contract_id: string;
  raised_by_role: string;
  reason: string;
  description: string;
}) {
  const { data: dispute, error } = await supabase
    .from('nil_disputes')
    .insert({
      ...data,
      status: 'open'
    })
    .select()
    .single();
  
  if (error) throw error;
  return dispute;
}

export async function resolveDispute(
  disputeId: string, 
  resolution: string,
  resolved_by_role: string
) {
  const { data, error } = await supabase
    .from('nil_disputes')
    .update({ 
      status: 'resolved',
      resolution,
      resolved_by_role,
      resolved_at: new Date().toISOString()
    })
    .eq('id', disputeId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getDisputesByContract(contractId: string) {
  const { data, error } = await supabase
    .from('nil_disputes')
    .select('*')
    .eq('contract_id', contractId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function updateDisputeStatus(
  disputeId: string,
  status: 'open' | 'under_review' | 'resolved' | 'closed'
) {
  const { data, error } = await supabase
    .from('nil_disputes')
    .update({ status })
    .eq('id', disputeId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}
