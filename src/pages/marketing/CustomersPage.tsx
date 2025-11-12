import { Star, Users, ArrowRight } from 'lucide-react';
import MarketingPageLayout from '@/components/marketing/MarketingPageLayout';

export default function CustomersPage() {
  return (
    <MarketingPageLayout>
      {/* Hero */}
      <section className="relative border-b border-white/10 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--gold)]/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-2 text-sm font-semibold text-[var(--gold)]">
            <Users className="h-4 w-4" />
            Social Proof
          </div>
          <h1 className="text-5xl font-extrabold mb-6">Trusted by 500+ Athletes</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            From high school phenoms to pro athletes, creators trust our platform for compliant, transparent NIL deals.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-white/10 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <StatCard number="500+" label="Active Athletes" />
            <StatCard number="2,500+" label="Deals Completed" />
            <StatCard number="$4.2M" label="Paid to Athletes" />
            <StatCard number="100%" label="Compliance Rate" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-white/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Athletes Are Saying</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Real stories from athletes using Creator NIL Platform for their deals.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="This platform made my first NIL deal stress-free. Everything was transparent, and I knew exactly what I was agreeing to."
              name="Sarah M."
              title="D1 Soccer, University of Texas"
            />
            <TestimonialCard
              quote="OfferLock saved me from a brand that tried to change the deal terms after I posted. The locked terms protected me."
              name="Marcus J."
              title="D1 Football, Ohio State"
            />
            <TestimonialCard
              quote="As a parent, I love having visibility into my son's NIL activities. The compliance checks give me peace of mind."
              name="Jennifer K."
              title="Parent of D1 Basketball Player"
            />
            <TestimonialCard
              quote="We've run 50+ NIL campaigns through this platform. The compliance tools and receipts make reporting effortless."
              name="David R."
              title="Brand Marketing Manager"
            />
            <TestimonialCard
              quote="Finally, a platform that understands high school NIL rules. The state-by-state compliance is a game-changer."
              name="Tyler B."
              title="HS Football, California"
            />
            <TestimonialCard
              quote="Managing NIL for our entire team is now simple. The coach dashboard shows me everything I need without breaking rules."
              name="Coach Williams"
              title="Head Coach, D1 Track & Field"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-[var(--gold)]/30 bg-gradient-to-br from-[var(--gold)]/10 to-transparent p-12">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Start your free workspace and see why athletes trust us with their NIL deals.
            </p>
            <a
              href="/onboarding?persona=creator"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-8 py-4 text-lg font-semibold text-black shadow-lg hover:bg-[#FFC700] transition-all"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center rounded-xl border border-white/10 bg-white/5 p-8">
      <div className="text-5xl font-bold text-[var(--gold)] mb-2">{number}</div>
      <div className="text-white/70">{label}</div>
    </div>
  );
}

function TestimonialCard({ quote, name, title }: { quote: string; name: string; title: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-8 transition-all hover:border-[var(--gold)]/50 hover:bg-white/10">
      <div className="mb-4 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-[var(--gold)] text-[var(--gold)]" />
        ))}
      </div>
      <p className="text-white/80 mb-6 italic leading-relaxed">"{quote}"</p>
      <div className="border-t border-white/10 pt-4">
        <p className="font-semibold text-white">{name}</p>
        <p className="text-sm text-white/60 mt-1">{title}</p>
      </div>
    </div>
  );
}
