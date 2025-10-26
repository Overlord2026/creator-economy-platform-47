import { supabase } from '@/integrations/supabase/client';

export async function createContract(data: {
  offer_id: string;
  contract_text: string;
  signed_by_athlete_at?: string;
  signed_by_brand_at?: string;
}) {
  const { data: contract, error } = await supabase
    .from('nil_contracts')
    .insert({
      ...data,
      status: 'draft'
    })
    .select()
    .single();
  
  if (error) throw error;
  return contract;
}

export async function signContract(contractId: string, party: 'athlete' | 'brand') {
  const field = party === 'athlete' ? 'signed_by_athlete_at' : 'signed_by_brand_at';
  
  const { data: contract, error } = await supabase
    .from('nil_contracts')
    .select('*')
    .eq('id', contractId)
    .single();
  
  if (error) throw error;
  
  const updates: any = { [field]: new Date().toISOString() };
  
  // If both parties have signed, set status to active
  if (party === 'athlete' && contract.signed_by_brand_at) {
    updates.status = 'active';
  } else if (party === 'brand' && contract.signed_by_athlete_at) {
    updates.status = 'active';
  }
  
  const { data, error: updateError } = await supabase
    .from('nil_contracts')
    .update(updates)
    .eq('id', contractId)
    .select()
    .single();
  
  if (updateError) throw updateError;
  return data;
}

export async function getContractByOffer(offerId: string) {
  const { data, error } = await supabase
    .from('nil_contracts')
    .select('*')
    .eq('offer_id', offerId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function getContract(contractId: string) {
  const { data, error } = await supabase
    .from('nil_contracts')
    .select('*')
    .eq('id', contractId)
    .single();
  
  if (error) throw error;
  return data;
}
