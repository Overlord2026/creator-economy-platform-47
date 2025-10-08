import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { BOOTSTRAP_MODE } from '@/config/bootstrap';

// Relax Supabase generics for insurance tables
const sb = supabase as any;

export interface InsuranceAgent {
  id?: string;
  user_id?: string;
  name: string;
  email: string;
  license_type: string;
  nmls_id?: string;
  state: string;
  license_number: string;
  license_expiry?: Date;
  ce_credits_required: number;
  ce_credits_completed: number;
  ce_reporting_period_start?: Date;
  ce_reporting_period_end?: Date;
  status: 'active' | 'inactive' | 'suspended';
  created_at?: string;
  updated_at?: string;
}

export interface CECourse {
  id?: string;
  agent_id?: string;
  course_name: string;
  course_type?: string;
  provider_name?: string;
  completion_date?: Date;
  credits_earned: number;
  certificate_url?: string;
  verified: boolean;
  verified_by?: string;
  verified_at?: string;
  created_at?: string;
}

export interface CEReminder {
  id?: string;
  agent_id?: string;
  reminder_type: 'CE Due Soon' | 'License Expiry' | 'Deficiency' | 'Compliance Check';
  reminder_status: 'pending' | 'sent' | 'acknowledged' | 'resolved';
  trigger_date?: Date;
  resolved_date?: Date;
  message?: string;
  created_at?: string;
}

export const useInsuranceAgent = () => {
  // Bootstrap mode: return UI-only stub (before any hooks)
  if (BOOTSTRAP_MODE) {
    return {
      agent: null,
      courses: [],
      reminders: [],
      isLoading: false,
      addCourse: async () => {},
      updateAgent: async () => {},
      createAgent: async () => {},
      getDaysUntilExpiry: () => null,
      getDaysUntilPeriodEnd: () => null,
      getCEProgress: () => ({ percentage: 0, status: 'unknown' }),
      refreshData: () => {}
    };
  }

  const { user } = useAuth();
  const [agent, setAgent] = useState<InsuranceAgent | null>(null);
  const [courses, setCourses] = useState<CECourse[]>([]);
  const [reminders, setReminders] = useState<CEReminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAgent = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const { data, error } = await sb
        .from('insurance_agents')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setAgent(data);
      }
    } catch (error) {
      console.error('Error fetching agent:', error);
      toast.error('Failed to load agent profile');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourses = async () => {
    if (!agent?.id) return;

    try {
      const { data, error } = await sb
        .from('ce_courses')
        .select('*')
        .eq('agent_id', agent.id)
        .order('completion_date', { ascending: false });

      if (error) throw error;

      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load CE courses');
    }
  };

  const fetchReminders = async () => {
    if (!agent?.id) return;

    try {
      const { data, error } = await sb
        .from('ce_reminders')
        .select('*')
        .eq('agent_id', agent.id)
        .eq('reminder_status', 'pending')
        .order('trigger_date', { ascending: true });

      if (error) throw error;

      setReminders(data || []);
    } catch (error) {
      console.error('Error fetching reminders:', error);
      toast.error('Failed to load reminders');
    }
  };

  const addCourse = async (course: Omit<CECourse, 'id' | 'agent_id' | 'created_at'>) => {
    if (!agent?.id) return;

    try {
      const { data, error } = await sb
        .from('ce_courses')
        .insert([{
          ...course,
          agent_id: agent.id,
          completion_date: course.completion_date?.toISOString().split('T')[0]
        }])
        .select()
        .single();

      if (error) throw error;

      setCourses(prev => [data, ...prev]);
      toast.success('CE course added successfully!');
      
      // Refresh agent data to update credits
      await fetchAgent();
      
      return data;
    } catch (error) {
      console.error('Error adding course:', error);
      toast.error('Failed to add CE course');
      throw error;
    }
  };

  const updateAgent = async (updates: Partial<InsuranceAgent>) => {
    if (!agent?.id) return;

    try {
      const updateData = { ...updates };
      if (updateData.license_expiry) {
        (updateData as any).license_expiry = updateData.license_expiry.toISOString().split('T')[0];
      }
      if (updateData.ce_reporting_period_start) {
        (updateData as any).ce_reporting_period_start = updateData.ce_reporting_period_start.toISOString().split('T')[0];
      }
      if (updateData.ce_reporting_period_end) {
        (updateData as any).ce_reporting_period_end = updateData.ce_reporting_period_end.toISOString().split('T')[0];
      }

      const { data, error } = await sb
        .from('insurance_agents')
        .update(updateData as any)
        .eq('id', agent.id)
        .select()
        .single();

      if (error) throw error;

      setAgent(data);
      toast.success('Agent profile updated successfully!');
      
      return data;
    } catch (error) {
      console.error('Error updating agent:', error);
      toast.error('Failed to update agent profile');
      throw error;
    }
  };

  const createAgent = async (agentData: Omit<InsuranceAgent, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await sb
        .from('insurance_agents')
        .insert([{
          ...agentData,
          user_id: user.id,
          license_expiry: agentData.license_expiry?.toISOString().split('T')[0],
          ce_reporting_period_start: agentData.ce_reporting_period_start?.toISOString().split('T')[0],
          ce_reporting_period_end: agentData.ce_reporting_period_end?.toISOString().split('T')[0],
        }])
        .select()
        .single();

      if (error) throw error;

      setAgent(data);
      toast.success('Agent profile created successfully!');
      
      return data;
    } catch (error) {
      console.error('Error creating agent:', error);
      toast.error('Failed to create agent profile');
      throw error;
    }
  };

  const getDaysUntilExpiry = () => {
    if (!agent?.license_expiry) return null;
    const today = new Date();
    const expiry = new Date(agent.license_expiry);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getDaysUntilPeriodEnd = () => {
    if (!agent?.ce_reporting_period_end) return null;
    const today = new Date();
    const periodEnd = new Date(agent.ce_reporting_period_end);
    const diffTime = periodEnd.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getCEProgress = () => {
    if (!agent) return { percentage: 0, status: 'unknown' };
    
    const percentage = agent.ce_credits_required > 0 
      ? Math.min((agent.ce_credits_completed / agent.ce_credits_required) * 100, 100)
      : 0;
    
    let status = 'on-track';
    if (percentage >= 100) {
      status = 'complete';
    } else if (percentage >= 75) {
      status = 'on-track';
    } else if (percentage >= 50) {
      status = 'at-risk';
    } else {
      status = 'behind';
    }
    
    return { percentage, status };
  };

  useEffect(() => {
    fetchAgent();
  }, [user]);

  useEffect(() => {
    if (agent?.id) {
      fetchCourses();
      fetchReminders();
    }
  }, [agent?.id]);

  return {
    agent,
    courses,
    reminders,
    isLoading,
    addCourse,
    updateAgent,
    createAgent,
    getDaysUntilExpiry,
    getDaysUntilPeriodEnd,
    getCEProgress,
    refreshData: () => {
      fetchAgent();
      if (agent?.id) {
        fetchCourses();
        fetchReminders();
      }
    }
  };
};
