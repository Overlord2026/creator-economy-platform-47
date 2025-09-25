import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { safeSelect, safeInsertOptionalTable, safeUpdate, withFallback, tableExists } from '@/lib/db/safeSupabase';

export interface AdvisorProduction {
  id: string;
  advisor_id: string;
  period_start: string;
  period_end: string;
  gross_revenue: number;
  net_revenue: number;
  client_fees: number;
  aum_fees: number;
  commission: number;
  created_at: string;
  updated_at: string;
}

export const useAdvisorProduction = () => {
  const [production, setProduction] = useState<AdvisorProduction[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchProduction = async (advisorId?: string) => {
    setLoading(true);
    try {
      const results = await withFallback<AdvisorProduction>(
        'advisor_production',
        () => safeSelect<AdvisorProduction>('advisor_production', '*', advisorId ? { advisor_id: advisorId } : {}),
        []
      );
      setProduction(results);
    } catch (error) {
      console.error('Error fetching advisor production:', error);
      toast({
        title: 'Error',
        description: 'Failed to load production data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addProduction = async (productionData: Omit<AdvisorProduction, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('tenant_id')
        .eq('id', user.id)
        .maybeSingle();

      const exists = await tableExists('advisor_production');
      if (!exists) {
        toast.info('Advisor production table not available in this environment.');
        return null as any;
      }

      const insertRow = { ...productionData, tenant_id: profile?.tenant_id } as any;
      const result = await safeInsertOptionalTable<AdvisorProduction>('advisor_production', insertRow);
      if (!result.ok) throw result.error;

      toast.success('Production data added successfully');

      await fetchProduction(productionData.advisor_id);
      return result.data?.[0];
    } catch (error) {
      console.error('Error adding production:', error);
      toast.error('Failed to add production data');
      throw error;
    }
  };

  const updateProduction = async (id: string, updates: Partial<AdvisorProduction>) => {
    try {
      const exists = await tableExists('advisor_production');
      if (!exists) {
        toast.info('Advisor production table not available in this environment.');
        return null as any;
      }

      const result = await safeUpdate<AdvisorProduction>('advisor_production', updates, { id });
      if (!result.ok) throw result.error;

      toast.success('Production data updated successfully');

      await fetchProduction();
      return result.data?.[0] as any;
    } catch (error) {
      console.error('Error updating production:', error);
      toast.error('Failed to update production data');
      throw error;
    }
  };

  const calculateOverrides = async (periodStart: string, periodEnd: string, advisorId?: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('calculate-advisor-overrides', {
        body: {
          periodStart,
          periodEnd,
          advisorId
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Override calculations completed successfully",
      });

      return data;
    } catch (error) {
      console.error('Error calculating overrides:', error);
      toast({
        title: "Error",
        description: "Failed to calculate overrides",
        variant: "destructive",
      });
      throw error;
    }
  };

  const getProductionSummary = (productions: AdvisorProduction[]) => {
    return productions.reduce(
      (acc, prod) => ({
        totalRevenue: acc.totalRevenue + prod.net_revenue,
        totalFees: acc.totalFees + prod.client_fees + prod.aum_fees,
        totalCommission: acc.totalCommission + prod.commission,
        periodsCount: acc.periodsCount + 1,
      }),
      { totalRevenue: 0, totalFees: 0, totalCommission: 0, periodsCount: 0 }
    );
  };

  useEffect(() => {
    fetchProduction();
  }, []);

  return {
    production,
    loading,
    fetchProduction,
    addProduction,
    updateProduction,
    calculateOverrides,
    getProductionSummary,
  };
};