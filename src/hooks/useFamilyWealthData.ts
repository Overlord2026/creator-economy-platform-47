import { useMemo } from 'react';
import { useBankAccounts } from '@/hooks/useBankAccounts';
import { useFinancialPlans } from '@/hooks/useFinancialPlans';
import { useNetWorth } from '@/context/NetWorthContext';

interface FamilyWealthSummary {
  totalBalance: string;
  formattedTotalBalance: string;
  accountCount: number;
  planCount: number;
  activePlanCount: number;
  draftPlanCount: number;
  totalGoals: number;
  averageSuccessRate: number;
  netWorth: number;
  isLoading: boolean;
}

export const useFamilyWealthData = (): FamilyWealthSummary => {
  const { 
    accounts, 
    loading: accountsLoading
  } = useBankAccounts();
  
  const { 
    plans, 
    summary, 
    loading: plansLoading 
  } = useFinancialPlans();
  
  const { 
    getTotalNetWorth,
    loading: netWorthLoading 
  } = useNetWorth();

  // ✅ FIXED: Calculate total balance locally instead of calling non-existent method
  const totalBalanceNumber = useMemo(() => {
    return accounts.reduce((sum, account) => sum + (account.balance || 0), 0);
  }, [accounts]);

  const totalBalance = useMemo(() => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      maximumFractionDigits: 0 
    }).format(totalBalanceNumber);
  }, [totalBalanceNumber]);

  const accountCount = useMemo(() => {
    return accounts.length;
  }, [accounts.length]);

  const planMetrics = useMemo(() => {
    return {
      planCount: plans.length,
      activePlanCount: summary.activePlans,
      draftPlanCount: summary.draftPlans,
      totalGoals: summary.totalGoals,
      averageSuccessRate: summary.averageSuccessRate
    };
  }, [plans.length, summary.activePlans, summary.draftPlans, summary.totalGoals, summary.averageSuccessRate]);

  const netWorth = useMemo(() => {
    return getTotalNetWorth();
  }, [getTotalNetWorth]);

  const isLoading = useMemo(() => {
    return accountsLoading || plansLoading || netWorthLoading;
  }, [accountsLoading, plansLoading, netWorthLoading]);

  return useMemo(() => ({
    totalBalance,
    formattedTotalBalance: totalBalance,
    accountCount,
    ...planMetrics,
    netWorth,
    isLoading
  }), [totalBalance, accountCount, planMetrics, netWorth, isLoading]);
};
