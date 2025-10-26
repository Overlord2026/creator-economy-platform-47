import { supabase } from '@/integrations/supabase/client';

export async function recordTrainingCompletion(data: {
  athlete_id: string;
  module_id: string;
  module_title: string;
  completion_score?: number;
}) {
  const { data: record, error } = await supabase
    .from('nil_training_records')
    .insert(data)
    .select()
    .single();
  
  if (error) throw error;
  return record;
}

export async function getAthleteTrainingHistory(athleteId: string) {
  const { data, error } = await supabase
    .from('nil_training_records')
    .select('*')
    .eq('athlete_id', athleteId)
    .order('completed_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function checkModuleCompletion(athleteId: string, moduleId: string) {
  const { data, error } = await supabase
    .from('nil_training_records')
    .select('*')
    .eq('athlete_id', athleteId)
    .eq('module_id', moduleId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function getRequiredTrainingStatus(athleteId: string) {
  const requiredModules = ['edu_mod_01', 'edu_mod_02', 'edu_mod_03'];
  
  const { data, error } = await supabase
    .from('nil_training_records')
    .select('module_id')
    .eq('athlete_id', athleteId)
    .in('module_id', requiredModules);
  
  if (error) throw error;
  
  const completedIds = (data || []).map(r => r.module_id);
  return {
    completed: completedIds.length,
    required: requiredModules.length,
    isComplete: completedIds.length === requiredModules.length,
    missingModules: requiredModules.filter(id => !completedIds.includes(id))
  };
}
