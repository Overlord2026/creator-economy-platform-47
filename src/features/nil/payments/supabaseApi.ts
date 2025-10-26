import { supabase } from '@/integrations/supabase/client';

export async function createPayment(data: {
  contract_id: string;
  amount: number;
  currency: string;
  payment_method: string;
}) {
  const { data: payment, error } = await supabase
    .from('nil_payments')
    .insert({
      ...data,
      status: 'pending'
    })
    .select()
    .single();
  
  if (error) throw error;
  return payment;
}

export async function releasePayment(paymentId: string) {
  const { data, error } = await supabase
    .from('nil_payments')
    .update({ 
      status: 'completed',
      paid_at: new Date().toISOString()
    })
    .eq('id', paymentId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getPaymentsByContract(contractId: string) {
  const { data, error } = await supabase
    .from('nil_payments')
    .select('*')
    .eq('contract_id', contractId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function updatePaymentStatus(
  paymentId: string, 
  status: 'pending' | 'processing' | 'completed' | 'failed'
) {
  const { data, error } = await supabase
    .from('nil_payments')
    .update({ status })
    .eq('id', paymentId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}
