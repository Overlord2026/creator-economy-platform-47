import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { analytics } from "@/lib/analytics";
import { sb } from '@/lib/supabase-relaxed';
import { goToPricingForFeature } from "@/lib/upgrade";
import { getPersonaCopy } from "@/config/personaCopy";
import { OnboardingProgress } from "@/components/OnboardingProgress";
import { EmailVerify } from "./onboarding/steps/EmailVerify";
import { Profile } from "./onboarding/steps/Profile";
import { Household } from "./onboarding/steps/Household";
import { LinkAccounts } from "./onboarding/steps/LinkAccounts";
import { UploadDoc } from "./onboarding/steps/UploadDoc";
import { Goals } from "./onboarding/steps/Goals";
import { InvitePro } from "./onboarding/steps/InvitePro";
import { Check } from "lucide-react";

type StepKey =
  | "email-verify" | "profile" | "household" | "link-accounts"
  | "upload-doc" | "goals" | "invite-pro";

const STEPS: StepKey[] = [
  "email-verify","profile","household","link-accounts","upload-doc","goals","invite-pro"
];

export default function OnboardingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const persona = (params.get("persona") ?? "family") as "family" | "professional";
  const segment = params.get("segment") ?? "retirees";
  const [active, setActive] = useState<StepKey>(STEPS[0]);
  const [saving, setSaving] = useState(false);

  const copy = useMemo(() => getPersonaCopy(persona, segment), [persona, segment]);
  const currentStep = STEPS.indexOf(active) + 1;

  useEffect(() => {
    analytics.trackEvent("onboarding.viewed", { persona, segment });
  }, [persona, segment]);

  async function markComplete(step: StepKey, data: Record<string, any> = {}) {
    setSaving(true);
    const { data: user } = await sb.auth.getUser();
    const user_id = user?.user?.id;
    if (!user_id) { setSaving(false); return; }

    await sb
      .from('user_onboarding_progress')
      .upsert(
        { 
          user_id, 
          user_type: persona, 
          step_name: step, 
          is_completed: true, 
          completed_at: new Date().toISOString(), 
          updated_at: new Date().toISOString() 
        },
        { onConflict: 'user_id,user_type,step_name' }
      );

    analytics.trackEvent("onboarding.step_completed", { step, persona, segment });
    setSaving(false);
    const nextIndex = Math.min(STEPS.indexOf(step) + 1, STEPS.length - 1);
    setActive(STEPS[nextIndex]);
    if (nextIndex === STEPS.length - 1) {
      analytics.trackEvent("onboarding.completed", { persona, segment });
    }
  }

  function requirePremium(featureKey: string) {
    goToPricingForFeature(navigate, featureKey, { planHint: "premium", source: "onboarding" });
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
            {copy.hero}
          </h1>
          <div className="max-w-2xl mx-auto">
            <ul className="space-y-3">
              {copy.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3 text-lg text-slate-200">
                  <Check className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* Progress Bar */}
        <OnboardingProgress 
          currentStep={currentStep} 
          totalSteps={STEPS.length} 
          steps={STEPS.map(s => s.replace('-', ' '))} 
          className="mb-12"
        />

        {/* Step Content */}
        <section className="mt-8">
          {active === "email-verify" && (
            <EmailVerify 
              onComplete={(data) => markComplete("email-verify", data)}
              persona={persona}
              segment={segment}
            />
          )}
          {active === "profile" && (
            <Profile 
              onComplete={(data) => markComplete("profile", data)}
              persona={persona}
              segment={segment}
            />
          )}
          {active === "household" && (
            <Household 
              onComplete={(data) => markComplete("household", data)}
              persona={persona}
              segment={segment}
            />
          )}
          {active === "link-accounts" && (
            <LinkAccounts
              onComplete={(data) => markComplete("link-accounts", data)}
              persona={persona}
              segment={segment}
            />
          )}
          {active === "upload-doc" && (
            <UploadDoc
              onComplete={(data) => markComplete("upload-doc", data)}
              persona={persona}
              segment={segment}
            />
          )}
          {active === "goals" && (
            <Goals 
              onComplete={(data) => markComplete("goals", data)}
              persona={persona}
              segment={segment}
            />
          )}
          {active === "invite-pro" && (
            <InvitePro 
              onComplete={(data) => markComplete("invite-pro", data)}
              persona={persona}
              segment={segment}
            />
          )}
        </section>

        {/* Footer */}
        {saving && (
          <footer className="mt-8 text-center">
            <p className="text-sm text-slate-400 animate-pulse">Saving your progress...</p>
          </footer>
        )}
      </div>
    </div>
  );
}
