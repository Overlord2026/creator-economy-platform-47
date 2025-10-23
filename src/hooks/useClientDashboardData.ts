import { useState, useEffect } from 'react';
import { sb } from '@/lib/supabase-relaxed';

interface DashboardMetrics {
  netWorth: number;
  monthlyChange: number;
  goalProgress: number;
  vaultFiles: number;
  portfolioReturn: number;
  upcomingGoals: number;
  accounts: number;
}

export const useClientDashboardData = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    netWorth: 0,
    monthlyChange: 0,
    goalProgress: 0,
    vaultFiles: 0,
    portfolioReturn: 0,
    upcomingGoals: 0,
    accounts: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientMetrics = async () => {
    try {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) {
        setError('User not authenticated');
        return;
      }

      // Use existing tables for metrics calculation
      const { count: dealCount, error: dealError } = await supabase
        .from('deal_ledger')
        .select('*', { count: 'exact', head: true })
        .eq('org_id', user.id);

      if (dealError) {
        console.error('Error fetching deal data:', dealError);
      }

      const netWorth = dealCount ? dealCount * 50000 : 0; // Mock calculation

      // Fetch vault files count (using receipts table)
      const { count: vaultCount, error: vaultError } = await supabase
        .from('receipts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (vaultError) {
        console.error('Error fetching vault count:', vaultError);
      }

      // Mock goals progress using available data
      const goalProgress = 75; // Mock value

      // Fetch accounts count from bank_accounts table
      const { count: accountsCount, error: accountsError } = await supabase
        .from('bank_accounts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (accountsError) {
        console.error('Error fetching accounts count:', accountsError);
      }

      setMetrics({
        netWorth,
        monthlyChange: 2.8, // Calculate from historical data
        goalProgress,
        vaultFiles: vaultCount || 0,
        portfolioReturn: 8.2, // Calculate from portfolio performance
        upcomingGoals: 0, // Calculate from goal completion rates
        accounts: accountsCount || 0
      });

    } catch (error) {
      console.error('Error fetching client metrics:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientMetrics();

    // Set up real-time subscriptions for existing tables
    const dealsSubscription = supabase
      .channel('deals-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'deal_ledger'
        },
        () => {
          fetchClientMetrics();
        }
      )
      .subscribe();

    const receiptsSubscription = supabase
      .channel('receipts-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'receipts'
        },
        () => {
          fetchClientMetrics();
        }
      )
      .subscribe();

    const accountsSubscription = supabase
      .channel('accounts-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bank_accounts'
        },
        () => {
          fetchClientMetrics();
        }
      )
      .subscribe();

    return () => {
      sb.removeChannel(dealsSubscription);
      sb.removeChannel(receiptsSubscription);
      sb.removeChannel(accountsSubscription);
    };
  }, []);

  return { metrics, loading, error, refresh: fetchClientMetrics };
};