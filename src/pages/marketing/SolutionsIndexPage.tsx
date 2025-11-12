import { Lock, FileSignature, Banknote, Shield, FileCheck, Eye, ArrowRight, CheckCircle } from 'lucide-react';
import MarketingPageLayout from '@/components/marketing/MarketingPageLayout';

export default function SolutionsIndexPage() {
  return (
    <MarketingPageLayout>
      {/* Hero Section */}
      <section className="relative border-b border-white/10 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--gold)]/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-2 text-sm font-semibold text-[var(--gold)]">
              <Shield className="h-4 w-4" />
              Platform Solutions
            </div>
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              End-to-End NIL Platform
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Everything you need for compliant, transparent, and professional NIL deals. From offer to payment to proof—all in one platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/demo/offerlock"
                className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-8 py-4 text-lg font-semibold text-black shadow-lg hover:bg-[#FFC700] transition-all hover:shadow-xl"
              >
                Try OfferLock Demo
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="/onboarding"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {/* OfferLock */}
            <SolutionCard
              id="offerlock"
              icon={Lock}
              title="OfferLock"
              description="Lock in deal terms before work begins. No more bait-and-switch, no surprise changes, no ghosting."
              features={[
                'Terms frozen once both sides agree',
                'Transparent pricing, scope, deadlines',
                'Automatic breach detection',
                'Dispute resolution built-in'
              ]}
              demoLink="/demo/offerlock"
              demoText="See OfferLock Demo"
            />

            {/* Contract & E-Sign */}
            <SolutionCard
              id="esign"
              icon={FileSignature}
              title="Contract & E-Sign"
              description="Legally binding e-signatures with audit trails. Templates vetted by NIL attorneys."
              features={[
                'State-specific NIL contract templates',
                'School policy gate checks',
                'Parent/guardian co-signature for minors',
                'Timestamped audit logs'
              ]}
              demoLink="/demo/contract"
              demoText="See Contract Demo"
            />

            {/* Payments & Escrow */}
            <SolutionCard
              id="payments"
              icon={Banknote}
              title="Payments & Escrow"
              description="Secure escrow holds funds until deliverables are approved. Instant payouts once cleared."
              features={[
                'Escrow holds protect both sides',
                'Milestone-based releases',
                'Same-day ACH payouts',
                'Automatic 1099 generation'
              ]}
              demoLink="/demo/settlement"
              demoText="See Payment Demo"
            />

            {/* Compliance & Policy Gates */}
            <SolutionCard
              id="compliance"
              icon={Shield}
              title="Compliance & Policy Gates"
              description="Automated checks for state NIL laws, school policies, NCAA rules, and FTC requirements."
              features={[
                'State-by-state rule engine',
                'School policy enforcement',
                'Deal approval workflows',
                'FTC disclosure requirements'
              ]}
            />

            {/* Audit Receipts */}
            <SolutionCard
              id="receipts"
              icon={FileCheck}
              title="Audit Receipts (Proof Slips)"
              description="Immutable proof of every action, payment, and deliverable. Show schools, parents, and auditors exactly what happened."
              features={[
                'Timestamped activity log',
                'Downloadable PDF receipts',
                'Content hash verification',
                'Share with compliance officers'
              ]}
              demoLink="/why-receipts"
              demoText="Learn More About Receipts"
            />

            {/* School/Parent Oversight */}
            <SolutionCard
              id="oversight"
              icon={Eye}
              title="School/Parent Oversight"
              description="Invite coaches, compliance officers, and parents to review deals without giving them full access."
              features={[
                'Read-only viewer access',
                'Approval workflows for minors',
                'Bulk deal reporting for coaches',
                'Monthly summary emails'
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-[var(--gold)]/30 bg-gradient-to-br from-[var(--gold)]/10 to-transparent p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              All solutions are included in every workspace. Athletes get started free, brands start at $99/mo.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-8 py-4 text-lg font-semibold text-black shadow-lg hover:bg-[#FFC700] transition-all"
              >
                See Pricing
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="/onboarding"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  );
}

interface SolutionCardProps {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  demoLink?: string;
  demoText?: string;
}

function SolutionCard({ id, icon: Icon, title, description, features, demoLink, demoText }: SolutionCardProps) {
  return (
    <div id={id} className="scroll-mt-24 group">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-10 transition-all hover:border-[var(--gold)]/50 hover:bg-white/[0.07]">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="inline-flex rounded-xl bg-[var(--gold)]/20 p-4 text-[var(--gold)]">
              <Icon className="h-8 w-8" />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-lg text-white/80 mb-6 leading-relaxed">
              {description}
            </p>

            <ul className="space-y-3 mb-6">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/80">
                  <CheckCircle className="h-5 w-5 text-[var(--gold)] flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {demoLink && (
              <a
                href={demoLink}
                className="inline-flex items-center gap-2 text-[var(--gold)] font-semibold hover:gap-3 transition-all"
              >
                {demoText}
                <ArrowRight className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
