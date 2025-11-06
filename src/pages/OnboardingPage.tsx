import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { sb } from '@/lib/supabase-relaxed';
import { Stepper } from '@/components/ui/stepper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { colors } from '@/components/marketing/_shims/theme';

export default function OnboardingPage() {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [persona, setPersona] = useState<'creator' | 'coach' | 'pro'>('creator');
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Read persona from ?persona=
  useEffect(() => {
    const qp = new URLSearchParams(search);
    const v = (qp.get('persona') || 'creator') as 'creator' | 'coach' | 'pro';
    setPersona(v);
  }, [search]);

  // Persona-aware steps
  const steps = useMemo(() => {
    switch (persona) {
      case 'coach': return ['Email Verify', 'Org', 'Policy', 'Invite'];
      case 'pro':   return ['Email Verify', 'Profile', 'Clients', 'Tools'];
      default:      return ['Email Verify', 'Profile', 'Platform', 'Goals'];
    }
  }, [persona]);

  // After real sign-in, store persona and route to dashboard
  useEffect(() => {
    const { data: { subscription } } = sb.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await sb.auth.updateUser({ data: { persona } });
        navigate(persona === 'coach' ? '/dashboard/coach'
               : persona === 'pro'   ? '/dashboard/pro'
               : '/dashboard/creator');
      }
    });
    return () => subscription?.unsubscribe();
  }, [persona, navigate]);

  // Navigation helpers
  const goNext = () => setActiveStep((s) => Math.min(s + 1, steps.length));
  const goPrev = () => setActiveStep((s) => Math.max(s - 1, 1));

  // OTP flow (optional)
  const sendOtp = async () => {
    if (!email) return;
    setIsSending(true);
    const { error } = await sb.auth.signInWithOtp({ email });
    setIsSending(false);
    if (!error) {
      localStorage.setItem('onboarding_email', email);
    }
  };

  return (
    <div className={`${colors.navyBg} text-white min-h-screen`}>
      {/* Compact top bar with Home link */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-white/80 hover:text-white transition-colors">← Home</Link>
          <div className="text-sm text-white/60">Onboarding</div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-10 pb-16">
        <h1 className="text-3xl font-bold text-center mb-2">
          {persona === 'coach' ? 'Coach Onboarding'
           : persona === 'pro' ? 'Professional Setup'
           : 'Creator / Athlete Onboarding'}
        </h1>
        <p className="text-white/70 text-center mb-8">A fast, 90-second setup. You can verify and finish later.</p>

        <Stepper steps={steps} activeStep={activeStep} className="mb-12" />

        {/* STEP 1: Email verify (with bypass) */}
        {activeStep === 1 && (
          <div className="bg-white/5 rounded-xl border border-white/10 p-6 max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-2">Verify your email</h2>
            <p className="text-white/80 mb-4 text-sm">We'll send a one-time code to continue. You can do this later.</p>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="bg-white/10 text-white placeholder:text-white/50 mb-4"
            />
            <div className="flex flex-wrap gap-3 justify-between items-center">
              <Button onClick={sendOtp} disabled={isSending || !email} className={`${colors.goldBg} px-5`}>
                {isSending ? 'Sending…' : 'Send Verification'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => { if (email) localStorage.setItem('onboarding_email', email); goNext(); }}
                className="bg-white/10 hover:bg-white/15"
              >
                Continue without verifying
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Profile */}
        {activeStep === 2 && (
          <div className="bg-white/5 rounded-xl border border-white/10 p-6 max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-2">Your profile</h2>
            <p className="text-white/80 text-sm mb-4">Tell us a bit about you. You can edit later.</p>
            <div className="flex justify-between">
              <Button variant="ghost" onClick={goPrev}>Back</Button>
              <Button className={`${colors.goldBg}`} onClick={goNext}>Next</Button>
            </div>
          </div>
        )}

        {/* STEP 3+ placeholders */}
        {activeStep > 2 && (
          <div className="bg-white/5 rounded-xl border border-white/10 p-6 max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-2">{steps[activeStep - 1]}</h2>
            <p className="text-white/80 text-sm mb-4">This step is coming next. Continue to preview the flow.</p>
            <div className="flex justify-between">
              <Button variant="ghost" onClick={goPrev}>Back</Button>
              <Button className={`${colors.goldBg}`} onClick={goNext} disabled={activeStep === steps.length}>
                {activeStep === steps.length ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
