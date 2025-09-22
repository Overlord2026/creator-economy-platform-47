import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { tableExists, safeQueryOptionalTable, safeInsertOptionalTable, safeUpdate } from '@/lib/db/safeSupabase';
import { 
  EnhancedProfessional, 
  TeamMember, 
  ProfessionalAssignment,
  ProfessionalReview,
  ProfessionalInvitation
} from '@/types/professionalTeam';

export const useProfessionalTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [allProfessionals, setAllProfessionals] = useState<EnhancedProfessional[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Fetch user's assigned team
  const fetchTeam = async () => {
    try {
      const hasProfessionals = await tableExists('professional_assignments');
      if (!hasProfessionals) {
        // Demo team data
        setTeam([
          {
            id: '1',
            name: 'Demo Advisor',
            email: 'advisor@demo.com',
            type: 'advisor',
            status: 'active',
            assignment: {
              id: '1',
              professional_id: '1',
              client_id: 'demo',
              relationship: 'advisor',
              status: 'active',
              assigned_by: 'demo',
              created_at: new Date().toISOString(),
              start_date: new Date().toISOString().split('T')[0]
            }
          } as TeamMember
        ]);
        return;
      }

      const assignmentRows = await safeQueryOptionalTable('professional_assignments', '*', {
        order: { column: 'created_at', ascending: false },
        limit: 50
      });

      if (assignmentRows.ok && assignmentRows.data) {
        // Would transform real data here
        setTeam([]);
      }
    } catch (error) {
      console.error('Error fetching team:', error);
      toast({
        title: "Error fetching team",
        description: "Failed to load your professional team",
        variant: "destructive"
      });
    }
  };

  // Fetch all professionals for marketplace
  const fetchAllProfessionals = async () => {
    try {
      const hasProfessionals = await tableExists('professionals');
      if (!hasProfessionals) {
        // Demo professionals data
        setAllProfessionals([
          {
            id: '1',
            name: 'Demo Advisor',
            email: 'advisor@demo.com',
            type: 'advisor',
            status: 'active',
            company: 'Demo Wealth Management',
            ratings_average: 4.8,
            ratings_count: 12,
            verified: true,
            specialties: ['Wealth Management', 'Tax Planning'],
            certifications: ['CFP', 'CPA']
          } as EnhancedProfessional
        ]);
        return;
      }

      const professionalRows = await safeQueryOptionalTable('professionals', '*', {
        order: { column: 'verified', ascending: false },
        limit: 100
      });

      if (professionalRows.ok && professionalRows.data) {
        // Would transform real data here
        setAllProfessionals([]);
      }
    } catch (error) {
      console.error('Error fetching professionals:', error);
      toast({
        title: "Error fetching professionals",
        description: "Failed to load professional directory",
        variant: "destructive"
      });
    }
  };

  // Assign professional to user's team
  const assignProfessional = async (
    professionalId: string, 
    relationship: string,
    notes?: string
  ) => {
    setSaving(true);
    try {
      const hasAssignments = await tableExists('professional_assignments');
      if (!hasAssignments) {
        toast({
          title: "Demo Mode",
          description: "Professional assignment saved in demo mode"
        });
        await fetchTeam();
        return { id: 'demo' };
      }

      const insertResult = await safeInsertOptionalTable('professional_assignments', {
        professional_id: professionalId,
        client_id: 'demo-user',
        assigned_by: 'demo-user',
        relationship,
        notes,
        status: 'active'
      });

      if (insertResult.ok) {
        toast({
          title: "Professional assigned",
          description: "Professional has been added to your team"
        });
        await fetchTeam();
      }

      return insertResult.ok ? { id: 'demo' } : null;
    } catch (error) {
      console.error('Error assigning professional:', error);
      toast({
        title: "Error assigning professional",
        description: "Failed to add professional to your team",
        variant: "destructive"
      });
      return null;
    } finally {
      setSaving(false);
    }
  };

  // Remove professional from team
  const removeProfessionalFromTeam = async (assignmentId: string) => {
    setSaving(true);
    try {
      const hasAssignments = await tableExists('professional_assignments');
      if (!hasAssignments) {
        toast({
          title: "Demo Mode",
          description: "Professional removed in demo mode"
        });
        await fetchTeam();
        return;
      }

      const updateResult = await safeUpdate('professional_assignments', 
        { status: 'ended', end_date: new Date().toISOString().split('T')[0] },
        { id: assignmentId }
      );

      if (updateResult.ok) {
        toast({
          title: "Professional removed",
          description: "Professional has been removed from your team"
        });
        await fetchTeam();
      }
    } catch (error) {
      console.error('Error removing professional:', error);
      toast({
        title: "Error removing professional",
        description: "Failed to remove professional from team",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  // Add review for professional
  const addReview = async (professionalId: string, rating: number, comment?: string) => {
    setSaving(true);
    try {
      const hasReviews = await tableExists('professional_reviews');
      if (!hasReviews) {
        toast({
          title: "Demo Mode",
          description: "Review saved in demo mode"
        });
        await fetchAllProfessionals();
        return { id: 'demo' };
      }

      const insertResult = await safeInsertOptionalTable('professional_reviews', {
        professional_id: professionalId,
        reviewer_id: 'demo-user',
        rating,
        comment
      });

      if (insertResult.ok) {
        toast({
          title: "Review added",
          description: "Your review has been submitted"
        });
        await fetchAllProfessionals();
      }

      return insertResult.ok ? { id: 'demo' } : null;
    } catch (error) {
      console.error('Error adding review:', error);
      toast({
        title: "Error adding review",
        description: "Failed to submit review",
        variant: "destructive"
      });
      return null;
    } finally {
      setSaving(false);
    }
  };

  // Invite professional to platform
  const inviteProfessional = async (email: string, invitedAs: string) => {
    setSaving(true);
    try {
      const hasInvitations = await tableExists('professional_invitations');
      if (!hasInvitations) {
        toast({
          title: "Demo Mode",
          description: `Demo invitation sent to ${email}`
        });
        return { id: 'demo' };
      }

      const insertResult = await safeInsertOptionalTable('professional_invitations', {
        email,
        invited_by: 'demo-user',
        invited_as: invitedAs,
        status: 'sent'
      });

      if (insertResult.ok) {
        toast({
          title: "Invitation sent",
          description: `Invitation has been sent to ${email}`
        });
      }

      return insertResult.ok ? { id: 'demo' } : null;
    } catch (error) {
      console.error('Error inviting professional:', error);
      toast({
        title: "Error sending invitation",
        description: "Failed to send invitation",
        variant: "destructive"
      });
      return null;
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchTeam(), fetchAllProfessionals()]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    team,
    allProfessionals,
    loading,
    saving,
    assignProfessional,
    removeProfessionalFromTeam,
    addReview,
    inviteProfessional,
    refreshTeam: fetchTeam,
    refreshProfessionals: fetchAllProfessionals
  };
};