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
import { CheckCircle2 } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section with White Background */}
      <header className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{copy.hero}</h1>
          <div className="grid gap-3 md:grid-cols-2 mt-6">
            {copy.bullets.map((bullet, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="text-base text-gray-600">{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Progress Section with White Background */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <OnboardingProgress
            currentStep={currentStep}
            totalSteps={STEPS.length}
            steps={STEPS.map(s => s.replace('-', ' '))}
          />
        </div>
      </div>

      {/* Main Content with Generous Top Padding */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
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
        </div>
      </section>

      {saving && (
        <footer className="fixed bottom-6 right-6 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200 text-sm text-gray-600">
          Saving…
        </footer>
      )}
    </div>
  );
}