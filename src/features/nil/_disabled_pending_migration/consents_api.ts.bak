import { supabase } from '@/integrations/supabase/client';

export async function createConsentPassport(data: {
  athlete_id: string;
  scope_json: any;
  ttl_days: number;
  co_signer_id?: string;
}) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + data.ttl_days);
  
  const { data: passport, error } = await supabase
    .from('nil_consents')
    .insert({
      ...data,
      expires_at: expiresAt.toISOString(),
      status: 'active',
      freshness_score: 1.0
    })
    .select()
    .single();
  
  if (error) throw error;
  return passport;
}

export async function revokeConsent(consentId: string) {
  const { data, error } = await supabase
    .from('nil_consents')
    .update({ status: 'revoked' })
    .eq('id', consentId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getActiveConsents(athleteId: string) {
  const { data, error } = await supabase
    .from('nil_consents')
    .select('*')
    .eq('athlete_id', athleteId)
    .eq('status', 'active')
    .gte('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function checkConsentValidity(consentId: string) {
  const { data, error } = await supabase
    .from('nil_consents')
    .select('*')
    .eq('id', consentId)
    .single();
  
  if (error) return { valid: false, reason: 'CONSENT_NOT_FOUND' };
  
  if (data.status !== 'active') {
    return { valid: false, reason: 'CONSENT_REVOKED' };
  }
  
  if (new Date() > new Date(data.expires_at)) {
    return { valid: false, reason: 'CONSENT_EXPIRED' };
  }
  
  return { valid: true, consent: data };
}
