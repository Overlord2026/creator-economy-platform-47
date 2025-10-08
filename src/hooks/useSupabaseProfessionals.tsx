import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Professional, ProfessionalType } from '@/types/professional';
import { tableExists, safeQueryOptionalTable, safeInsertOptionalTable, safeUpdate, safeDelete } from '@/lib/db/safeSupabase';

export interface SupabaseProfessional {
  id: string;
  user_id: string;
  name: string;
  email: string;
  type: ProfessionalType;
  company?: string;
  phone?: string;
  website?: string;
  address?: string;
  notes?: string;
  rating?: number;
  specialties?: string[];
  certifications?: string[];
  created_at: string;
  updated_at: string;
}

export const useSupabaseProfessionals = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Fetch professionals from Supabase
  const fetchProfessionals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('No authenticated user found');
        setProfessionals([]);
        return;
      }

      const hasProfessionals = await tableExists('professionals');
      if (!hasProfessionals) {
        // Demo data
        setProfessionals([
          {
            id: '1',
            name: 'Demo Advisor',
            email: 'advisor@demo.com',
            type: 'advisor' as ProfessionalType,
            company: 'Demo Wealth Management',
            phone: '+1-555-0123',
            rating: 4.8,
            specialties: ['Wealth Management', 'Tax Planning'],
            certifications: ['CFP', 'CPA'],
            custom_fields: {}
          }
        ]);
        return;
      }

      const profRows = await safeQueryOptionalTable('professionals', '*', {
        order: { column: 'created_at', ascending: false },
        limit: 100
      });

      if (profRows.ok && profRows.data) {
        // Transform data if needed
        const transformedProfessionals: Professional[] = profRows.data.map((prof: any) => ({
          id: prof.id,
          name: prof.name,
          email: prof.email,
          type: prof.type,
          company: prof.company,
          phone: prof.phone,
          website: prof.website,
          address: prof.address,
          notes: prof.notes,
          rating: prof.rating,
          specialties: prof.specialties || [],
          certifications: prof.certifications || [],
          custom_fields: prof.custom_fields || {}
        }));

        setProfessionals(transformedProfessionals);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch professionals",
        variant: "destructive"
      });
    }
  };

  // Add professional
  const addProfessional = async (professional: Omit<Professional, 'id'>) => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to add professionals",
          variant: "destructive"
        });
        return null;
      }

      const hasProfessionals = await tableExists('professionals');
      if (!hasProfessionals) {
        toast({
          title: "Demo Mode",
          description: `${professional.name} added in demo mode`
        });
        await fetchProfessionals();
        return { id: 'demo' };
      }

      const insertResult = await safeInsertOptionalTable('professionals', {
        user_id: user.id,
        name: professional.name,
        email: professional.email,
        professional_type: professional.type,
        tenant_id: 'default',
        company: professional.company,
        phone: professional.phone,
        website: professional.website,
        address: professional.address,
        notes: professional.notes,
        rating: professional.rating,
        specialties: professional.specialties,
        certifications: professional.certifications,
        custom_fields: professional.custom_fields || {}
      });

      if (insertResult.ok) {
        toast({
          title: "Professional added",
          description: `${professional.name} has been added successfully`
        });
        await fetchProfessionals();
      }

      return insertResult.ok ? { id: 'demo' } : null;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to add professional",
        variant: "destructive"
      });
      return null;
    } finally {
      setSaving(false);
    }
  };

  // Update professional
  const updateProfessional = async (professional: Professional) => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to update professionals",
          variant: "destructive"
        });
        return null;
      }

      const hasProfessionals = await tableExists('professionals');
      if (!hasProfessionals) {
        toast({
          title: "Demo Mode",
          description: `${professional.name} updated in demo mode`
        });
        await fetchProfessionals();
        return { id: professional.id };
      }

      const updateResult = await safeUpdate('professionals', 
        {
          name: professional.name,
          email: professional.email,
          type: professional.type,
          company: professional.company,
          phone: professional.phone,
          website: professional.website,
          address: professional.address,
          notes: professional.notes,
          rating: professional.rating,
          specialties: professional.specialties,
          certifications: professional.certifications,
          custom_fields: professional.custom_fields || {}
        },
        { id: professional.id, user_id: user.id }
      );

      if (updateResult.ok) {
        toast({
          title: "Professional updated",
          description: `${professional.name} has been updated successfully`
        });
        await fetchProfessionals();
      }

      return updateResult.ok ? { id: professional.id } : null;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to update professional",
        variant: "destructive"
      });
      return null;
    } finally {
      setSaving(false);
    }
  };

  // Remove professional
  const removeProfessional = async (id: string) => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to remove professionals",
          variant: "destructive"
        });
        return;
      }

      const hasProfessionals = await tableExists('professionals');
      if (!hasProfessionals) {
        toast({
          title: "Demo Mode",
          description: "Professional removed in demo mode"
        });
        await fetchProfessionals();
        return;
      }

      const deleteResult = await safeDelete('professionals', { id, user_id: user.id });

      if (deleteResult.ok) {
        toast({
          title: "Professional removed",
          description: "Professional has been removed successfully"
        });
        await fetchProfessionals();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to remove professional",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchProfessionals();
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    professionals,
    loading,
    saving,
    addProfessional,
    updateProfessional,
    removeProfessional,
    refreshProfessionals: fetchProfessionals
  };
};