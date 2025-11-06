'use client';
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
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 pt-16 pb-14 sm:pt-20 sm:pb-18">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs tracking-wide bg-white/5">
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
              <Link to="/onboarding?persona=creator" onClick={() => click("hero_primary_offerlock")} className={`${colors.goldBg} inline-flex h-11 items-center justify-center rounded-md px-5 font-medium`}>
                Try the OfferLock demo <ArrowRight className="ml-2 size-4" />
              </Link>
              <Link to="/personas" onClick={() => click("hero_secondary_personas")} className="inline-flex h-11 items-center justify-center rounded-md px-5 font-medium bg-white/10 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30">
                Explore personas
              </Link>
            </div>
            <div className="mt-8 text-sm text-white/70">Built by compliance nerds. Designed for humans.</div>
          </div>
        </section>

        {/* WHO IT’S FOR */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <h2 className="text-2xl font-semibold">Who it’s for</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Link to="/onboarding?persona=creator" className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/20">
              <div className="font-semibold group-hover:underline">Athletes & Creators</div>
              <p className="mt-2 text-white/80 text-sm">
                Brand kit • Approvals • Proof-backed reports
              </p>
              <div className="mt-4">
                <span className={`${colors.goldBg} inline-block px-3 py-1 rounded text-sm font-medium`}>Start free workspace</span>
              </div>
            </Link>
            <Link to="/onboarding?persona=coach" className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/20">
              <div className="font-semibold group-hover:underline">Coaches & Schools</div>
              <p className="mt-2 text-white/80 text-sm">
                Oversight • Policy gates • Exportable receipts
              </p>
              <div className="mt-4">
                <span className={`${colors.goldBg} inline-block px-3 py-1 rounded text-sm font-medium`}>Request demo</span>
              </div>
            </Link>
            <Link to="/onboarding?persona=pro" className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/20">
              <div className="font-semibold group-hover:underline">Professionals</div>
              <p className="mt-2 text-white/80 text-sm">
                Multi-party visibility • Audit trails • Secure client tools
              </p>
              <div className="mt-4">
                <span className={`${colors.goldBg} inline-block px-3 py-1 rounded text-sm font-medium`}>Explore professional tools</span>
              </div>
            </Link>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
