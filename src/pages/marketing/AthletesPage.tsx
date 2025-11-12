import { Trophy, BadgeCheck, Package, ArrowRight, Shield, Zap, DollarSign } from 'lucide-react';
import MarketingPageLayout from '@/components/marketing/MarketingPageLayout';

export default function AthletesPage() {
  return (
    <MarketingPageLayout>
      {/* Hero Section */}
      <section className="relative border-b border-white/10 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--gold)]/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-2 text-sm font-semibold text-[var(--gold)]">
              <Trophy className="h-4 w-4" />
              For Athletes & Creators
            </div>
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              Take Control of Your NIL Deals
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Get verified, manage offers, build your brand, and get paid safely. Everything you need to turn your NIL into income—minus the drama.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/onboarding?persona=creator"
                className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-8 py-4 text-lg font-semibold text-black shadow-lg hover:bg-[#FFC700] transition-all hover:shadow-xl"
              >
                Start Free Workspace
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="/demo/offerlock?persona=creator"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all"
              >
                Try OfferLock Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="border-b border-white/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Athletes Choose Us</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Professional tools built specifically for NIL deals. No confusing contracts, no payment delays, no compliance surprises.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={BadgeCheck}
              title="Get NIL Verified"
              description="Complete NIL training and certification to unlock premium opportunities and boost your trust score with brands."
              link="/athletes/verified"
              linkText="Learn more"
            />

            <FeatureCard
              icon={Shield}
              title="OfferLock Protection"
              description="Lock in deal terms before you start work. No more bait-and-switch, surprise changes, or ghosting after delivery."
              link="/demo/offerlock?persona=creator"
              linkText="Try demo"
            />

            <FeatureCard
              icon={Package}
              title="Build Your Brand Kit"
              description="Create professional media kits that showcase your stats, reach, and value. Stand out to brands searching for talent."
              link="/athletes/brand-kit"
              linkText="Start building"
            />

            <FeatureCard
              icon={DollarSign}
              title="Instant Payouts"
              description="Get paid the same day deliverables are approved. Funds held in secure escrow, released instantly when work is done."
              link="/solutions#payments"
              linkText="See how"
            />

            <FeatureCard
              icon={Zap}
              title="Compliance Made Easy"
              description="Automatic checks for state NIL laws, school policies, and FTC requirements. Stay compliant without the headache."
              link="/solutions#compliance"
              linkText="Learn more"
            />

            <FeatureCard
              icon={Trophy}
              title="High School to Pro"
              description="Whether you're HS, college, or pro—we support every level with age-appropriate tools and compliance checks."
              link="/onboarding?persona=creator"
              linkText="Get started"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-[var(--gold)]/30 bg-gradient-to-br from-[var(--gold)]/10 to-transparent p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join 500+ athletes who trust Creator NIL Platform for their deals. Free workspace, no credit card required.
            </p>
            <a
              href="/onboarding?persona=creator"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-8 py-4 text-lg font-semibold text-black shadow-lg hover:bg-[#FFC700] transition-all"
            >
              Start Free Workspace
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  );
}

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

function FeatureCard({ icon: Icon, title, description, link, linkText }: FeatureCardProps) {
  return (
    <div className="group rounded-xl border border-white/10 bg-white/5 p-8 transition-all hover:border-[var(--gold)]/50 hover:bg-white/10">
      <div className="mb-4 inline-flex rounded-lg bg-[var(--gold)]/20 p-3 text-[var(--gold)]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-white/70 mb-4 leading-relaxed">{description}</p>
      <a
        href={link}
        className="inline-flex items-center gap-1 text-[var(--gold)] font-semibold hover:gap-2 transition-all"
      >
        {linkText} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
