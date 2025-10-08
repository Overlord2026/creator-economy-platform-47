import { useState, useEffect } from 'react';
import { sb } from '@/lib/supabase-relaxed';
import { useToast } from '@/hooks/use-toast';

interface ClientPortalMetrics {
  totalClients: number;
  pendingInvitations: number;
  recentMessages: number;
  sharedDocuments: number;
}

export function useClientPortalDashboard() {
  const [metrics, setMetrics] = useState<ClientPortalMetrics>({
    totalClients: 0,
    pendingInvitations: 0,
    recentMessages: 0,
    sharedDocuments: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const user = (await sb.auth.getUser()).data.user;
      if (!user) throw new Error('Not authenticated');

      // Use existing tables to calculate metrics
      const { count: clientsCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'client');

      const { count: invitationsCount } = await supabase
        .from('prospect_invitations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Mock values for now since we don't have these specific tables
      setMetrics({
        totalClients: clientsCount || 0,
        pendingInvitations: invitationsCount || 0,
        recentMessages: 0, // Mock value
        sharedDocuments: 0  // Mock value
      });

    } catch (error) {
      console.error('Error fetching client portal metrics:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard metrics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();

    // Set up real-time subscription for profile changes
    const profilesSubscription = supabase
      .channel('profiles-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        () => {
          fetchMetrics();
        }
      )
      .subscribe();

    const invitationsSubscription = supabase
      .channel('invitations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'prospect_invitations'
        },
        () => {
          fetchMetrics();
        }
      )
      .subscribe();

    return () => {
      sb.removeChannel(profilesSubscription);
      sb.removeChannel(invitationsSubscription);
    };
  }, []);

  return {
    metrics,
    loading,
    refresh: fetchMetrics
  };
}