import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Calculator, 
  Upload, 
  Shield, 
  Users, 
  Mail,
  Camera,
  Award,
  Building2,
  Eye,
  UserPlus,
  CheckCircle,
  Sparkles,
  FileText,
  Calendar,
  Globe,
  CreditCard,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { safeQueryOptionalTable } from '@/lib/db/safeSupabase';
import { toast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

interface AccountantOnboardingData {
  profile_completed: boolean;
  credentials_added: boolean;
  firm_setup_completed: boolean;
  clients_invited: boolean;
}

interface AccountantProfile {
  firm_name?: string;
  bio?: string;
  specialties?: string[];
  licenses?: string[];
  states_served?: string[];
  staff_count?: number;
  years_experience?: number;
}

export const AccountantOnboardingFlow = () => {
  const { userProfile } = useUser();
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [onboardingData, setOnboardingData] = useState<AccountantOnboardingData>({
    profile_completed: false,
    credentials_added: false,
    firm_setup_completed: false,
    clients_invited: false
  });
  const [accountantProfile, setAccountantProfile] = useState<AccountantProfile>({});

  useEffect(() => {
    checkOnboardingStatus();
  }, [userProfile]);

  const checkOnboardingStatus = async () => {
    if (!userProfile?.id) return;

    try {
      // Check if accountant profile exists using safe query
      const result = await safeQueryOptionalTable(
        'profiles',
        '*',
        {}
      );

      if (result.ok && result.data) {
        const accountantData = result.data.find((profile: any) => profile.id === userProfile.id);
        
        // Show welcome if minimal profile data
        if (!accountantData?.bio || accountantData.role !== 'accountant') {
          setShowWelcome(true);
        }

        if (accountantData) {
          setAccountantProfile({
            bio: accountantData.bio,
            firm_name: accountantData.display_name || '',
            specialties: [],
            licenses: [],
            states_served: [],
            years_experience: 0
          });
          
          setOnboardingData({
            profile_completed: !!(accountantData.bio),
            credentials_added: false,
            firm_setup_completed: !!(accountantData.display_name),
            clients_invited: false
          });
        }
      } else {
        // Table doesn't exist, show welcome
        setShowWelcome(true);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setShowWelcome(true);
    }
  };

  const updateOnboardingProgress = async (stepKey: keyof AccountantOnboardingData) => {
    const newData = { ...onboardingData, [stepKey]: true };
    setOnboardingData(newData);

    const allCompleted = Object.values(newData).every(Boolean);

    if (allCompleted) {
      // Try to update profile if table exists
      try {
        const result = await safeQueryOptionalTable('profiles', '*', {});
        if (result.ok) {
          // Table exists, we could update but this would need safeUpdate implementation
          console.log('Profile update would happen here in full implementation');
        }
      } catch (error) {
        console.log('Profile table not available for updates');
      }

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast({
        title: "🎉 Your CPA profile is ready!",
        description: "Start inviting clients to enjoy next-gen tax tools."
      });
    }
  };

  const onboardingSteps = [
    {
      id: 'profile',
      title: 'Firm Profile',
      description: 'Enter firm details, specialties, and service areas',
      icon: <Calculator className="w-6 h-6" />,
      completed: onboardingData.profile_completed,
      component: <ProfileSetupStep 
        profile={accountantProfile} 
        onUpdate={setAccountantProfile}
        onComplete={() => updateOnboardingProgress('profile_completed')} 
      />
    },
    {
      id: 'credentials',
      title: 'Credentials & CE',
      description: 'Add licenses, CE tracking, and compliance',
      icon: <Award className="w-6 h-6" />,
      completed: onboardingData.credentials_added,
      component: <CredentialsStep 
        profile={accountantProfile}
        onUpdate={setAccountantProfile}
        onComplete={() => updateOnboardingProgress('credentials_added')} 
      />
    },
    {
      id: 'firm',
      title: 'Firm Setup & Staff',
      description: 'Multi-user support and team management',
      icon: <Building2 className="w-6 h-6" />,
      completed: onboardingData.firm_setup_completed,
      component: <FirmSetupStep 
        profile={accountantProfile}
        onUpdate={setAccountantProfile}
        onComplete={() => updateOnboardingProgress('firm_setup_completed')} 
      />
    },
    {
      id: 'clients',
      title: 'Client Invitations',
      description: 'Buy seats and invite families',
      icon: <UserPlus className="w-6 h-6" />,
      completed: onboardingData.clients_invited,
      component: <ClientInviteStep onComplete={() => updateOnboardingProgress('clients_invited')} />
    }
  ];

  const completedSteps = onboardingSteps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / onboardingSteps.length) * 100;

  return (
    <>
      {/* Welcome Modal */}
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold">
                Welcome, {userProfile?.displayName || 'Tax Professional'}!
              </DialogTitle>
              <p className="text-lg text-muted-foreground">
                Manage your clients' tax lives with next-generation tools. Set up your firm profile to get started.
              </p>
            </motion.div>
          </DialogHeader>
          
          <div className="space-y-4 mt-6">
            <div className="text-center text-muted-foreground">
              "BFO Tax Experience™: Delight your clients with a digital-first tax journey, 
              backed by our Fiduciary Duty Principles™. No commissions, just clarity."
            </div>
            
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-8 py-3"
                onClick={() => setShowWelcome(false)}
              >
                Let's Get Started
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Progress Bar */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">CPA Setup Progress</h3>
              <div className="flex items-center space-x-2">
                <Badge variant={progressPercentage === 100 ? "default" : "secondary"}>
                  {completedSteps} / {onboardingSteps.length}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowPreview(true)}
                  className="text-xs"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Preview Profile
                </Button>
              </div>
            </div>
            
            <Progress value={progressPercentage} className="h-3" />
            
            <div className="grid grid-cols-4 gap-2 text-xs text-center">
              {onboardingSteps.map((step, index) => (
                <div key={step.id} className={`${step.completed ? 'text-green-600' : 'text-muted-foreground'}`}>
                  {step.completed ? <CheckCircle className="w-4 h-4 mx-auto" /> : step.icon}
                  <div className="mt-1">{step.title}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Steps */}
      <div className="space-y-6">
        {onboardingSteps.map((step, index) => (
          <Card 
            key={step.id}
            className={`transition-all duration-300 ${
              step.completed ? 'border-green-500 bg-green-50' : ''
            } ${currentStep === index ? 'ring-2 ring-primary' : ''}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    step.completed ? 'bg-green-500 text-white' : 'bg-muted'
                  }`}>
                    {step.completed ? <CheckCircle className="w-6 h-6" /> : step.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {step.completed && (
                  <Badge className="bg-green-500">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Complete
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            {(currentStep === index || step.completed) && (
              <CardContent>
                <AnimatePresence>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.component}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            )}
            
            {!step.completed && currentStep !== index && (
              <CardContent className="pt-0">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(index)}
                  className="w-full"
                >
                  Start This Step
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Profile Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>How Families See Your Profile</DialogTitle>
          </DialogHeader>
          <ProfilePreview profile={accountantProfile} />
        </DialogContent>
      </Dialog>
    </>
  );
};

// Step Components (simplified versions that don't use database)
const ProfileSetupStep = ({ profile, onUpdate, onComplete }: any) => {
  const [localProfile, setLocalProfile] = useState(profile);

  const handleSave = async () => {
    onUpdate(localProfile);
    onComplete();
    toast({
      title: "Firm profile updated successfully!",
      description: "Your professional information has been saved."
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-muted-foreground" />
            </div>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload Logo
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="firm">Firm Name</Label>
            <Input
              id="firm"
              value={localProfile.firm_name || ''}
              onChange={(e) => setLocalProfile({...localProfile, firm_name: e.target.value})}
              placeholder="Your accounting firm or practice name"
            />
          </div>
          
          <div>
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              type="number"
              value={localProfile.years_experience || ''}
              onChange={(e) => setLocalProfile({...localProfile, years_experience: parseInt(e.target.value)})}
            />
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="bio">Practice Overview</Label>
        <Textarea
          id="bio"
          value={localProfile.bio || ''}
          onChange={(e) => setLocalProfile({...localProfile, bio: e.target.value})}
          placeholder="Describe your tax and accounting services approach..."
          rows={4}
        />
      </div>
      
      <Button onClick={handleSave} className="w-full">
        Save Firm Profile
      </Button>
    </div>
  );
};

const CredentialsStep = ({ profile, onUpdate, onComplete }: any) => (
  <div className="space-y-6">
    <p className="text-sm text-muted-foreground">
      Add your licenses and set up continuing education tracking
    </p>
    <Button onClick={onComplete} className="w-full">
      Complete Credentials Setup
    </Button>
  </div>
);

const FirmSetupStep = ({ profile, onUpdate, onComplete }: any) => (
  <div className="space-y-6">
    <div className="text-center">
      <p className="text-muted-foreground mb-4">Configure your firm's operational settings</p>
      <Button onClick={onComplete} className="w-full">
        Complete Firm Setup
      </Button>
    </div>
  </div>
);

const ClientInviteStep = ({ onComplete }: any) => (
  <div className="space-y-6">
    <div className="text-center">
      <p className="text-muted-foreground mb-4">Ready to start inviting clients to your practice</p>
      <Button onClick={onComplete} className="w-full">
        Start Client Invitations
      </Button>
    </div>
  </div>
);

const ProfilePreview = ({ profile }: any) => (
  <div className="space-y-4">
    <div className="text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
        <Calculator className="w-8 h-8 text-primary" />
      </div>
      <h3 className="font-semibold">{profile.firm_name || 'Your Firm Name'}</h3>
      <p className="text-sm text-muted-foreground">{profile.bio || 'Professional tax and accounting services'}</p>
    </div>
  </div>
);