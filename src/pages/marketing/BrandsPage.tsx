import { Briefcase, FileText, Shield, CheckCircle, BarChart, ArrowRight } from 'lucide-react';
import MarketingPageLayout from '@/components/marketing/MarketingPageLayout';

export default function BrandsPage() {
  return (
    <MarketingPageLayout>
      {/* Hero Section */}
      <section className="relative border-b border-white/10 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--gold)]/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-2 text-sm font-semibold text-[var(--gold)]">
              <Briefcase className="h-4 w-4" />
              For Brands & Agencies
            </div>
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              Launch Compliant NIL Campaigns
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Post briefs, match with verified athletes, manage deliverables, and track ROI—all in one platform built for NIL compliance.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/onboarding?persona=pro"
                className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-8 py-4 text-lg font-semibold text-black shadow-lg hover:bg-[#FFC700] transition-all hover:shadow-xl"
              >
                Create Brand Workspace
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="/brands/solutions"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all"
              >
                Explore Campaign Types
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="border-b border-white/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need for NIL Campaigns</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              From campaign creation to final deliverable—manage every step with built-in compliance and reporting.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={FileText}
              title="Post Campaign Briefs"
              description="Create detailed campaign briefs and get matched with athletes who fit your budget, audience, and brand values."
              link="/brands/briefs/new"
              linkText="Create brief"
            />

            <FeatureCard
              icon={CheckCircle}
              title="Approval Workflows"
              description="Review deliverables, request revisions, and approve with one click. Payments release automatically once approved."
              link="/solutions#payments"
              linkText="Learn more"
            />

            <FeatureCard
              icon={Shield}
              title="FTC Compliance"
              description="Automatic disclosure requirements in all contracts. Every post gets proper #ad or #sponsored tags enforced."
              link="/solutions#compliance"
              linkText="See how"
            />

            <FeatureCard
              icon={BarChart}
              title="Audit Receipts"
              description="Proof slips for every deliverable, payment, and approval. Perfect for internal reporting and legal audits."
              link="/why-receipts"
              linkText="View receipts"
            />

            <FeatureCard
              icon={Briefcase}
              title="Campaign Types"
              description="UGC content, social posts, appearances, events, and long-term ambassador programs—all supported."
              link="/brands/solutions"
              linkText="Explore options"
            />

            <FeatureCard
              icon={CheckCircle}
              title="Verified Athletes Only"
              description="Work with athletes who've completed NIL training and have verified social accounts and compliance records."
              link="/athletes/verified"
              linkText="Learn more"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-[var(--gold)]/30 bg-gradient-to-br from-[var(--gold)]/10 to-transparent p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Launch Your First Campaign?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join leading brands using Creator NIL Platform for compliant, high-performing NIL campaigns.
            </p>
            <a
              href="/onboarding?persona=pro"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-8 py-4 text-lg font-semibold text-black shadow-lg hover:bg-[#FFC700] transition-all"
            >
              Create Brand Workspace
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
