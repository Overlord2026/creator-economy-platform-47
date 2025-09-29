import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { BOOTSTRAP_MODE } from '@/config/bootstrap';

// Local minimal types for UI-only mode
interface Firm {
  id: string;
  name: string;
  type: string;
  address?: string;
  seats_purchased: number;
  seats_in_use: number;
  subscription_status: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

interface ProfessionalUser {
  id: string;
  firm_id: string;
  user_id: string;
  role: string;
  status: string;
  created_at: string;
}

interface SeatAssignment {
  id: string;
  firm_id: string;
  user_id: string;
  assigned_at: string;
}

interface Subscription {
  id: string;
  firm_id: string;
  plan: string;
  status: string;
  seats: number;
}

interface ClientAssignment {
  id: string;
  professional_id: string;
  client_id: string;
  assigned_at: string;
}

export function useFirmManagement() {
  const { user } = useAuth();
  const [firm, setFirm] = useState<Firm | null>(null);
  const [professionals, setProfessionals] = useState<ProfessionalUser[]>([]);
  const [seatAssignments, setSeatAssignments] = useState<SeatAssignment[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [clientAssignments, setClientAssignments] = useState<ClientAssignment[]>([]);
  const [loading, setLoading] = useState(false);

  // Bootstrap mode: return UI-only stub
  if (BOOTSTRAP_MODE) {
    return {
      firm: null,
      professionals: [],
      seatAssignments: [],
      subscription: null,
      clientAssignments: [],
      loading: false,
      error: null,
      createFirm: async () => {},
      updateFirm: async () => {},
      deleteFirm: async () => {}
    };
  }

  useEffect(() => {
    if (user && !BOOTSTRAP_MODE) {
      // Placeholder for future implementation
      setLoading(false);
    }
  }, [user]);

  const createFirm = async (firmData: Partial<Firm>) => {
    if (BOOTSTRAP_MODE) return;
    // Placeholder for future implementation
  };

  const updateFirm = async (firmId: string, updates: Partial<Firm>) => {
    if (BOOTSTRAP_MODE) return;
    // Placeholder for future implementation
  };

  const deleteFirm = async (firmId: string) => {
    if (BOOTSTRAP_MODE) return;
    // Placeholder for future implementation
  };

  return {
    firm,
    professionals,
    seatAssignments,
    subscription,
    clientAssignments,
    loading,
    error: null,
    createFirm,
    updateFirm,
    deleteFirm
  };
}
