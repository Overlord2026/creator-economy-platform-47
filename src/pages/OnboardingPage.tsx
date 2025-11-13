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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const copy = useMemo(() => getPersonaCopy(persona, segment), [persona, segment]);
  const currentStep = STEPS.indexOf(active) + 1;

  useEffect(() => {
    analytics.trackEvent("onboarding.viewed", { persona, segment });

    // Check authentication status on mount
    sb.auth.getUser().then(({ data: user }) => {
      setIsAuthenticated(!!user?.user?.id);
    });
  }, [persona, segment]);

  async function markComplete(step: StepKey, data: Record<string, any> = {}) {
    setSaving(true);

    try {
      // Check if user is authenticated
      const { data: user } = await sb.auth.getUser();
      const user_id = user?.user?.id;

      if (user_id) {
        // User is authenticated - save to database
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
        console.log('✅ Onboarding progress saved to database');
      } else {
        // User not authenticated - save to localStorage
        const storageKey = `onboarding_progress_${persona}_${segment}`;
        const progress = JSON.parse(localStorage.getItem(storageKey) || '{}');
        progress[step] = {
          completed: true,
          completed_at: new Date().toISOString(),
          data
        };
        localStorage.setItem(storageKey, JSON.stringify(progress));
        console.log('💾 Onboarding progress saved to localStorage (user not logged in)');
      }

      analytics.trackEvent("onboarding.step_completed", { step, persona, segment, authenticated: !!user_id });

      // Advance to next step
      const nextIndex = Math.min(STEPS.indexOf(step) + 1, STEPS.length - 1);
      setActive(STEPS[nextIndex]);

      if (nextIndex === STEPS.length - 1) {
        analytics.trackEvent("onboarding.completed", { persona, segment, authenticated: !!user_id });
      }
    } catch (err) {
      console.error('❌ Failed to save onboarding progress:', err);
      // Continue anyway - don't block the user
      const nextIndex = Math.min(STEPS.indexOf(step) + 1, STEPS.length - 1);
      setActive(STEPS[nextIndex]);
    } finally {
      setSaving(false);
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
          {isAuthenticated ? '💾 Saving to account…' : '💾 Saving locally…'}
        </footer>
      )}

      {isAuthenticated === false && (
        <footer className="fixed bottom-6 left-6 bg-blue-50 px-4 py-3 rounded-lg shadow-lg border border-blue-200 text-sm text-blue-800 max-w-sm">
          <div className="font-semibold mb-1">Progress saved locally</div>
          <div className="text-xs text-blue-600">
            Sign up after completing to save to your account
          </div>
        </footer>
      )}
    </div>
  );
}