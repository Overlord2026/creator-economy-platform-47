'use client';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sb } from '@/lib/supabase-relaxed';
import { Stepper, StepContent } from '@/components/ui/stepper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { colors } from '@/components/marketing/_shims/theme';

export default function OnboardingPage() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [persona, setPersona] = useState('creator');

  useEffect(() => {
    const qp = new URLSearchParams(search);
    const value = qp.get('persona');
    if (value) setPersona(value);
  }, [search]);

  const steps = useMemo(() => {
    switch (persona) {
      case 'coach':
        return ['email', 'org', 'policy', 'invite'];
      case 'pro':
        return ['email', 'profile', 'clients', 'tools'];
      default:
        return ['email', 'profile', 'platform', 'goals'];
    }
  }, [persona]);

  const handleEmail = async () => {
    setIsLoading(true);
    const { error } = await sb.auth.signInWithOtp({ email });
    if (!error) {
      navigate('/dashboard/' + persona);
    }
    setIsLoading(false);
  };

  return (
    <div className={`${colors.navyBg} text-white min-h-screen`}>
      <div className="mx-auto max-w-4xl px-4 pt-16">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          {persona === 'coach'
            ? 'Coach Onboarding'
            : persona === 'pro'
            ? 'Professional Setup'
            : 'Creator / Athlete Onboarding'}
        </h1>

        <Stepper steps={steps} activeStep={1} className="mb-12" />

        <div className="bg-white/5 rounded-xl border border-white/10 p-6 max-w-xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">Verify Your Email</h2>
          <p className="text-white/80 mb-4 text-sm">
            We’ll send you important updates about your onboarding progress.
          </p>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="bg-white/10 text-white placeholder:text-white/50 mb-4"
          />
          <div className="flex justify-between items-center">
            <Button
              onClick={handleEmail}
              disabled={isLoading}
              className={`${colors.goldBg} px-5`}
            >
              {isLoading ? 'Sending…' : 'Send Verification'}
            </Button>
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              Skip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
