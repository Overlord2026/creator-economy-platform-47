import { supabase } from '@/integrations/supabase/client';

export async function createDisclosure(data: {
  post_id: string;
  athlete_id: string;
  platform: string;
  disclosure_text: string;
  jurisdiction: string;
}) {
  const { data: disclosure, error } = await supabase
    .from('nil_disclosures')
    .insert({
      ...data,
      verified: false
    })
    .select()
    .single();
  
  if (error) throw error;
  return disclosure;
}

export async function verifyDisclosure(disclosureId: string, verifiedBy: string) {
  const { data, error } = await supabase
    .from('nil_disclosures')
    .update({ 
      verified: true,
      verified_by: verifiedBy,
      verified_at: new Date().toISOString()
    })
    .eq('id', disclosureId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getDisclosuresByAthlete(athleteId: string) {
  const { data, error } = await supabase
    .from('nil_disclosures')
    .select('*')
    .eq('athlete_id', athleteId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function getDisclosureByPost(postId: string) {
  const { data, error } = await supabase
    .from('nil_disclosures')
    .select('*')
    .eq('post_id', postId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}
