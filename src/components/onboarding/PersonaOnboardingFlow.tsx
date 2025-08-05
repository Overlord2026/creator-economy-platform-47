import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Sparkles, CheckCircle, ArrowRight, Crown, Gift, FileText, Calendar, Shield, 
  Heart, Briefcase, UserCheck, Building2, GraduationCap, Users, Star 
} from 'lucide-react';
import { usePersona } from '@/context/PersonaContext';
import { PersonaType } from '@/types/personas';
import { useAdvancedEventTracking } from '@/hooks/useAdvancedEventTracking';
import { Celebration } from '@/components/ConfettiAnimation';
import { SWAGViralShare } from '@/components/leads/SWAGViralShare';
import { analytics } from '@/lib/analytics';

// Enhanced persona welcome messages with specific CTAs
const ENHANCED_PERSONA_MESSAGES = {
  advisor: {
    title: "Welcome to the Family Office Marketplace™!",
    subtitle: "Grow your practice, deliver SWAG™ client value, automate compliance, and maximize prospect conversion. Your advisor profile is ready to connect with high-net-worth families.",
    icon: <Briefcase className="h-8 w-8" />,
    color: "from-blue-500 to-blue-700",
    ctas: [
      { label: "Invite Clients Now", action: "invite_clients", primary: true },
      { label: "Create First Proposal", action: "create_proposal" },
      { label: "Book Demo with Platform Coach", action: "book_demo" },
      { label: "Watch SWAG Lead Score Demo", action: "watch_demo" }
    ]
  },
  accountant: {
    title: "Welcome, CPA/Enrolled Agent!",
    subtitle: "Deliver seamless tax planning, automate CE, and partner with fiduciaries for client retention. Your accountant dashboard is live with automated compliance monitoring.",
    icon: <FileText className="h-8 w-8" />,
    color: "from-green-500 to-green-700",
    ctas: [
      { label: "Import Clients", action: "import_clients", primary: true },
      { label: "Start Tax Planning Engagement", action: "tax_planning" },
      { label: "Connect to Family Office Partners", action: "connect_partners" }
    ]
  },
  attorney: {
    title: "Welcome, Counselor!",
    subtitle: "Connect with HNW families, automate CLE, streamline document workflows. Your legal practice center is ready with secure document vaults and compliance tracking.",
    icon: <Shield className="h-8 w-8" />,
    color: "from-purple-500 to-purple-700", 
    ctas: [
      { label: "Upload Legal Documents", action: "upload_docs", primary: true },
      { label: "Schedule Consultation", action: "schedule_consult" },
      { label: "Access CLE Resources", action: "cle_resources" }
    ]
  },
  coach: {
    title: "Welcome, Coach/Consultant!",
    subtitle: "Showcase curriculum, manage advisor cohorts, deliver trackable outcomes. Your practice growth hub is active with curriculum publishing and impact tracking.",
    icon: <GraduationCap className="h-8 w-8" />,
    color: "from-orange-500 to-orange-700",
    ctas: [
      { label: "Upload Training Content", action: "upload_training", primary: true },
      { label: "Publish Practice Audit", action: "publish_audit" },
      { label: "Connect to Teams", action: "connect_teams" }
    ]
  },
  consultant: {
    title: "Welcome, Consultant!",
    subtitle: "Showcase curriculum, manage advisor cohorts, deliver trackable outcomes. Share your specialized expertise with top-tier wealth management professionals.",
    icon: <Users className="h-8 w-8" />,
    color: "from-indigo-500 to-indigo-700",
    ctas: [
      { label: "Showcase Expertise", action: "showcase_expertise", primary: true },
      { label: "Publish Practice Audit", action: "publish_audit" },
      { label: "Connect to Teams", action: "connect_teams" }
    ]
  },
  compliance: {
    title: "Welcome, Compliance Officer!",
    subtitle: "Centralize audits, monitor filings, automate RIA/insurance/attorney compliance. Your compliance center is ready with mock audit capabilities.",
    icon: <UserCheck className="h-8 w-8" />,
    color: "from-red-500 to-red-700",
    ctas: [
      { label: "Launch Mock Audit", action: "mock_audit", primary: true },
      { label: "Track Regulatory Changes", action: "track_regulatory" },
      { label: "Start Compliance Training", action: "compliance_training" }
    ]
  },
  insurance_agent: {
    title: "Welcome, Insurance Agent!",
    subtitle: "Manage multi-state compliance, automate CE, grow your agent network. Your insurance hub is live with quote management and commission tracking.",
    icon: <Shield className="h-8 w-8" />,
    color: "from-cyan-500 to-cyan-700",
    ctas: [
      { label: "Start New Quote", action: "new_quote", primary: true },
      { label: "Upload Licensing", action: "upload_licensing" },
      { label: "Book Training", action: "book_training" }
    ]
  },
  imo_fmo: {
    title: "Welcome, IMO/FMO!",
    subtitle: "Manage multi-state compliance, automate CE, grow your agent network. Connect with qualified advisors and distribute approved solutions.",
    icon: <Building2 className="h-8 w-8" />,
    color: "from-teal-500 to-teal-700",
    ctas: [
      { label: "View Agent Network", action: "view_network", primary: true },
      { label: "Upload Training Materials", action: "upload_materials" },
      { label: "Track Compliance", action: "track_compliance" }
    ]
  },
  healthcare_consultant: {
    title: "Welcome, Healthcare Consultant!",
    subtitle: "Connect as a verified longevity consultant, manage client care, and join expert panels. Lead in family health and longevity nationwide.",
    icon: <Heart className="h-8 w-8" />,
    color: "from-emerald-500 to-emerald-700",
    ctas: [
      { label: "Set My Consultation Rates", action: "set_rates", primary: true },
      { label: "Share Medical Protocols", action: "share_protocols" },
      { label: "Join Longevity Network", action: "join_network" }
    ]
  },
  organization: {
    title: "Welcome, Industry Organization!",
    subtitle: "Early-adopter status, drive innovation, build strategic partnerships. Your VIP profile is ready to engage thousands of professionals.",
    icon: <Building2 className="h-8 w-8" />,
    color: "from-gold to-yellow-600",
    ctas: [
      { label: "Customize My VIP Profile", action: "customize_profile", primary: true },
      { label: "Upload Articles/Events", action: "upload_content" },
      { label: "Request Analytics Dashboard", action: "request_analytics" }
    ]
  },
  agency: {
    title: "Welcome, Marketing Partner!",
    subtitle: "Engage your audience, add value with VIP reserved access, cross-promote. Your partnership hub is ready for campaign management.",
    icon: <Star className="h-8 w-8" />,
    color: "from-pink-500 to-pink-700",
    ctas: [
      { label: "Launch Campaign", action: "launch_campaign", primary: true },
      { label: "Request VIP Access", action: "request_vip" },
      { label: "View Analytics", action: "view_analytics" }
    ]
  },
  client: {
    title: "Welcome to Your Financial Future!",
    subtitle: "Connect with vetted professionals and take control of your financial future with confidence.",
    icon: <Star className="h-8 w-8" />,
    color: "from-blue-500 to-purple-600",
    ctas: [
      { label: "Find Your Advisor", action: "find_advisor", primary: true },
      { label: "Complete Wealth Assessment", action: "wealth_assessment" }
    ]
  },
  vip_reserved: {
    title: "Welcome, VIP Member!",
    subtitle: "Your exclusive founding member profile awaits. Shape the future of family wealth management with early-adopter innovation status.",
    icon: <Crown className="h-8 w-8" />,
    color: "from-gold to-yellow-500",
    ctas: [
      { label: "Claim My Reserved Profile", action: "claim_profile", primary: true },
      { label: "Schedule VIP Onboarding", action: "vip_onboarding" }
    ]
  }
};

interface PersonaOnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  forcePersona?: PersonaType;
}

export const PersonaOnboardingFlow: React.FC<PersonaOnboardingFlowProps> = ({
  isOpen,
  onClose,
  forcePersona
}) => {
  const { currentPersona, markWelcomeModalSeen } = usePersona();
  const { trackOnboardingEvent, trackViralShare } = useAdvancedEventTracking();
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const persona = forcePersona || currentPersona;
  const welcomeData = ENHANCED_PERSONA_MESSAGES[persona] || ENHANCED_PERSONA_MESSAGES.client;

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [isOpen]);

  const handleCTAAction = async (action: string, isPrimary = false) => {
    await trackOnboardingEvent({
      step: `cta_${action}`,
      persona,
      channel: 'direct',
      source: 'welcome_modal'
    });
    
    // Handle specific actions
    switch (action) {
      case 'invite_clients':
      case 'import_clients':
        // Navigate to client import/invite
        break;
      case 'create_proposal':
        // Navigate to proposal builder
        break;
      case 'upload_docs':
        // Navigate to document vault
        break;
      case 'book_demo':
        // Open demo booking
        break;
      default:
        console.log(`CTA action: ${action}`);
    }
    
    markWelcomeModalSeen();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {showConfetti && <Celebration trigger={showConfetti} />}
          
          <DialogHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${welcomeData.color} flex items-center justify-center text-white`}
              >
                {welcomeData.icon}
              </motion.div>
            </div>
            
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
              {welcomeData.title}
            </DialogTitle>
            
            <p className="text-muted-foreground leading-relaxed mt-2">
              {welcomeData.subtitle}
            </p>
          </DialogHeader>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* SWAG Score Display */}
            <Card className="border-gold/20 bg-gradient-to-br from-gold/5 to-primary/5">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-gold mb-1">Got SWAG?</div>
                <div className="text-sm text-muted-foreground">
                  Your AI-powered professional score is ready!
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="space-y-3">
              {welcomeData.ctas.map((cta, index) => (
                <motion.div
                  key={cta.action}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Button
                    onClick={() => handleCTAAction(cta.action, cta.primary)}
                    className={`w-full ${
                      cta.primary 
                        ? `bg-gradient-to-r ${welcomeData.color} hover:opacity-90 text-white` 
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                    size="lg"
                  >
                    {cta.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Viral Share */}
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3 text-center">
                🎯 Invite colleagues and get 1 month free for each professional who joins!
              </p>
              <SWAGViralShare 
                leadData={{
                  name: "Sample Lead",
                  swagScore: 85,
                  band: "Gold"
                }}
              />
              <div className="text-center mt-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    trackViralShare({
                      platform: 'copy',
                      persona,
                      shareType: 'profile'
                    });
                  }}
                >
                  Share my SWAG profile
                </Button>
              </div>
            </div>

            {/* Skip Option */}
            <div className="text-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  markWelcomeModalSeen();
                  onClose();
                }}
                className="text-muted-foreground"
              >
                Maybe Later
              </Button>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
};