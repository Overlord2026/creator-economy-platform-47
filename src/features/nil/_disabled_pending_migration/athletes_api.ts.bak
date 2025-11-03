import { supabase } from '@/integrations/supabase/client';

export async function createAthlete(data: {
  user_id: string;
  full_name: string;
  sport: string;
  school_id: string;
  eligibility_year: number;
  profile_data?: any;
}) {
  const { data: athlete, error } = await supabase
    .from('athletes')
    .insert(data)
    .select()
    .single();
  
  if (error) throw error;
  return athlete;
}

export async function getAthleteByUserId(userId: string) {
  const { data, error } = await supabase
    .from('athletes')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updateAthlete(athleteId: string, updates: any) {
  const { data, error } = await supabase
    .from('athletes')
    .update(updates)
    .eq('id', athleteId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function listAthletesBySchool(schoolId: string) {
  const { data, error } = await supabase
    .from('athletes')
    .select('*')
    .eq('school_id', schoolId)
    .order('full_name');
  
  if (error) throw error;
  return data || [];
}
