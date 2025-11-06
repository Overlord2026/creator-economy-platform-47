'use client';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Stepper, StepContent } from '@/components/ui/stepper';
// ...import your existing step components as needed

export default function OnboardingPage() {
  const { search } = useLocation();
  const [persona, setPersona] = useState('unknown');

  useEffect(() => {
    const qp = new URLSearchParams(search);
    const value = qp.get('persona');
    if (value) setPersona(value);
  }, [search]);

  // 💡 Optional: tweak step config based on persona
  const steps = useMemo(() => {
    switch (persona) {
      case 'coach':
        return ['email', 'org', 'policy', 'invite'];
      case 'pro':
        return ['email', 'profile', 'clients', 'tools'];
      case 'creator':
      default:
        return ['email', 'profile', 'platform', 'goals'];
    }
  }, [persona]);

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-white mb-6">
        {persona === 'coach' ? 'Coach Onboarding'
         : persona === 'pro' ? 'Professional Setup'
         : 'Creator / Athlete Onboarding'}
      </h1>

      <Stepper steps={steps}>
        {/* Replace this with your existing step logic */}
        {steps.map((step, index) => (
          <StepContent key={step} step={index + 1} title={step}>
            <p className="text-white/80">Form UI for: {step}</p>
          </StepContent>
        ))}
      </Stepper>
    </div>
  );
}
