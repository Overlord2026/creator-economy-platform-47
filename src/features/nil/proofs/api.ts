import { supabase } from '@/integrations/supabase/client';

export async function saveProofSlip(proof: {
  type: string;
  contract_id: string;
  payload_json: any;
  merkle_root: string;
}) {
  const { data, error } = await supabase
    .from('nil_proof_slips')
    .insert(proof)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getProofsByContract(contractId: string) {
  const { data, error } = await supabase
    .from('nil_proof_slips')
    .select('*')
    .eq('contract_id', contractId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function anchorProofSlip(proofId: string, anchorRef: string) {
  const { data, error } = await supabase
    .from('nil_proof_slips')
    .update({ 
      anchor_ref: anchorRef,
      anchor_status: 'anchored',
      anchored_at: new Date().toISOString()
    })
    .eq('id', proofId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getProofByType(contractId: string, type: string) {
  const { data, error } = await supabase
    .from('nil_proof_slips')
    .select('*')
    .eq('contract_id', contractId)
    .eq('type', type)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}
