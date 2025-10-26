import { supabase } from '@/integrations/supabase/client';

export async function createOffer(data: {
  brand_id: string;
  athlete_id: string;
  title: string;
  amount: number;
  terms: any;
  deliverables?: any;
}) {
  const { data: offer, error } = await supabase
    .from('nil_offers')
    .insert({
      ...data,
      status: 'pending'
    })
    .select()
    .single();
  
  if (error) throw error;
  return offer;
}

export async function getOffersByAthlete(athleteId: string) {
  const { data, error } = await supabase
    .from('nil_offers')
    .select('*')
    .eq('athlete_id', athleteId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function getOffersByBrand(brandId: string) {
  const { data, error } = await supabase
    .from('nil_offers')
    .select('*')
    .eq('brand_id', brandId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function updateOfferStatus(
  offerId: string, 
  status: 'pending' | 'accepted' | 'rejected' | 'active' | 'completed'
) {
  const { data, error } = await supabase
    .from('nil_offers')
    .update({ status })
    .eq('id', offerId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getOffer(offerId: string) {
  const { data, error } = await supabase
    .from('nil_offers')
    .select('*')
    .eq('id', offerId)
    .single();
  
  if (error) throw error;
  return data;
}
