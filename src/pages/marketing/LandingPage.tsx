import { Link } from "react-router-dom";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { colors } from "@/components/marketing/_shims/theme";
import { track } from "@/components/marketing/_shims/analytics";
import { ArrowRight, CheckCircle2, FileSignature, DollarSign, Shield, Sparkles } from "lucide-react";

export default function LandingPage() {
  const click = (label: string) => track({ type: "cta_click", label });

  return (
    <div className={`${colors.navyBg} text-white min-h-screen flex flex-col`}>
      <MarketingHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 pt-16 pb-14 sm:pt-20 sm:pb-18">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs tracking-wide">
              <Shield className="size-3.5" />
              <span className="opacity-80">AI with guardrails • private receipts</span>
            </div>
            <h1 className="mt-6 text-4xl font-semibold sm:text-5xl lg:text-6xl">
              “Deals and projects, minus the drama.”
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              One place for creators and athletes to lock offers, e-sign with confidence, and keep private proof of every step.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/demo/offerlock" onClick={() => click("hero_primary_offerlock")} className={`${colors.goldBg} inline-flex h-11 items-center justify-center rounded-md px-5 font-medium`}>
                Try the OfferLock demo <ArrowRight className="ml-2 size-4" />
              </Link>
              <Link to="/personas" onClick={() => click("hero_secondary_personas")} className="inline-flex h-11 items-center justify-center rounded-md px-5 font-medium bg-white/10 hover:bg-white/15">
                Explore personas
              </Link>
            </div>
            <div className="mt-8 text-sm text-white/70">Built by compliance nerds. Designed for humans.</div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 font-semibold"><Sparkles className={`${colors.goldText} size-5`} /> OfferLock</div>
              <p className="mt-2 text-white/80">“Write down what was discussed. No surprises.”</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 font-semibold"><FileSignature className={`${colors.goldText} size-5`} /> E-Sign</div>
              <p className="mt-2 text-white/80">“Everyone signs the same deal, the right way.”</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 font-semibold"><DollarSign className={`${colors.goldText} size-5`} /> Settlement</div>
              <p className="mt-2 text-white/80">“Payouts with a private receipt. Show what happened—without oversharing.”</p>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <h2 className="text-2xl font-semibold">Benefits</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "No more vague DMs or “ghost edits”",
              "Parents/Guardians see what matters—not private amounts",
              "Schools/Brands get compliance-friendly views",
              "Agents/Reps collaborate without inbox chaos",
              "Private receipts for audits or disputes",
              "Start in minutes—no training needed",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                <CheckCircle2 className={`${colors.goldText} mt-0.5 size-5 shrink-0`} />
                <span className="text-white/90">{b}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <h2 className="text-2xl font-semibold">Who it’s for</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              ["Athlete (HS/College/Pro)", "/personas?type=athlete"],
              ["Entertainer (music, film, live)", "/personas?type=entertainer"],
              ["Creator/Influencer (YouTube/TikTok/IG)", "/personas?type=creator"],
              ["Parent/Guardian", "/personas?type=parent"],
              ["Coach/School", "/personas?type=school"],
              ["Agent/Rep", "/personas?type=agent"],
              ["Brand/Partner", "/personas?type=brand"],
              ["Service Professional (Accountant • Attorney • Advisor)", "/personas?type=pros"],
            ].map(([label, href]) => (
              <Link key={label} to={href} className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/20">
                <div className="font-semibold group-hover:underline">{label}</div>
              </Link>
            ))}
          </div>
        </section>
        <section className="border-y border-white/10 bg-white/5">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <h3 className="text-xl font-semibold">Trusted pros, one tap away.</h3>
            <p className="mt-2 max-w-2xl text-white/80">
              Find accountants, attorneys, and advisors who understand creator taxes, contracts, and NIL policies.
            </p>
            <div className="mt-6">
              <Link to="/pros" className={`${colors.goldBg} inline-flex h-11 items-center justify-center rounded-md px-5 font-medium`}>
                Browse Service Pros
              </Link>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-white/90">Built by compliance nerds. Designed for humans.</div>
            <div className="flex items-center gap-2">
              <span className={`${colors.goldBg} rounded-md px-2.5 py-1 text-xs font-medium`}>Policy Gates</span>
              <span className="rounded-md border border-white/20 bg-white/5 px-2.5 py-1 text-xs font-medium">Receipts</span>
              <span className="rounded-md border border-white/20 bg-white/5 px-2.5 py-1 text-xs font-medium">Anchors</span>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
