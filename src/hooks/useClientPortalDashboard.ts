import { useState, useEffect } from 'react';
import { sb } from '@/lib/supabase-relaxed';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type AttorneyDashboardMetrics = Database['public']['Tables']['attorney_dashboard_metrics']['Row'];

export function useClientPortalDashboard() {
  const [metrics, setMetrics] = useState<AttorneyDashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const user = (await sb.auth.getUser()).data.user;
      if (!user) throw new Error('Not authenticated');

      // Get today's metrics
      const today = new Date().toISOString().split('T')[0];
      
      let { data: existingMetrics, error } = await supabase
        .from('attorney_dashboard_metrics')
        .select('*')
        .eq('attorney_id', user.id)
        .eq('metric_date', today)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      // If no metrics exist for today, calculate and create them
      if (!existingMetrics) {
        // Calculate metrics
        const [clientsResult, invitationsResult, messagesResult, documentsResult] = await Promise.all([
          // Active clients count
          supabase
            .from('attorney_client_links')
            .select('id', { count: 'exact' })
            .eq('attorney_id', user.id)
            .eq('status', 'active'),
          
          // Pending invitations count
          supabase
            .from('attorney_client_invitations')
            .select('id', { count: 'exact' })
            .eq('attorney_id', user.id)
            .eq('status', 'pending'),
          
          // Unread messages count
          supabase
            .from('attorney_client_messages')
            .select('id', { count: 'exact' })
            .eq('attorney_id', user.id)
            .is('read_at', null),
          
          // Documents shared today count
          supabase
            .from('attorney_client_shared_documents')
            .select('id', { count: 'exact' })
            .eq('attorney_id', user.id)
            .gte('shared_at', `${today}T00:00:00Z`)
            .lt('shared_at', `${today}T23:59:59Z`)
        ]);

        const metricsData = {
          attorney_id: user.id,
          metric_date: today,
          active_clients: clientsResult.count || 0,
          pending_invitations: invitationsResult.count || 0,
          unread_messages: messagesResult.count || 0,
          documents_shared_today: documentsResult.count || 0,
          client_uploads_today: 0 // TODO: Implement client uploads tracking
        };

        // Insert new metrics
        const { data: newMetrics, error: insertError } = await supabase
          .from('attorney_dashboard_metrics')
          .insert(metricsData)
          .select()
          .single();

        if (insertError) throw insertError;
        setMetrics(newMetrics);
      } else {
        setMetrics(existingMetrics);
      }
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error);
      toast({
        title: "Error loading dashboard",
        description: "Could not load dashboard metrics. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchMetrics();
  };

  useEffect(() => {
    fetchMetrics();
<<<<<<< HEAD
=======

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
>>>>>>> demo/offerlock-202509261311
  }, []);

  return {
    metrics,
    loading,
    refetch
  };
}