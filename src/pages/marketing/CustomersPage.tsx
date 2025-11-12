export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-[#0B2239] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Trusted by 500+ Athletes</h1>
          <p className="text-lg text-white/80">
            From high school phenoms to pro athletes, creators trust our platform for compliant NIL deals.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Success Stories</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white/5 p-8">
              <div className="mb-4 text-4xl">⭐</div>
              <p className="text-white/80 mb-4 italic">
                "This platform made my first NIL deal stress-free. Everything was transparent, and I knew exactly what I was agreeing to."
              </p>
              <p className="font-semibold">Sarah M.</p>
              <p className="text-sm text-white/60">D1 Soccer, University of Texas</p>
            </div>

            <div className="rounded-lg bg-white/5 p-8">
              <div className="mb-4 text-4xl">⭐</div>
              <p className="text-white/80 mb-4 italic">
                "OfferLock saved me from a brand that tried to change the deal terms after I posted. The locked terms protected me."
              </p>
              <p className="font-semibold">Marcus J.</p>
              <p className="text-sm text-white/60">D1 Football, Ohio State</p>
            </div>

            <div className="rounded-lg bg-white/5 p-8">
              <div className="mb-4 text-4xl">⭐</div>
              <p className="text-white/80 mb-4 italic">
                "As a parent, I love having visibility into my son's NIL activities. The compliance checks give me peace of mind."
              </p>
              <p className="font-semibold">Jennifer K.</p>
              <p className="text-sm text-white/60">Parent of D1 Basketball Player</p>
            </div>

            <div className="rounded-lg bg-white/5 p-8">
              <div className="mb-4 text-4xl">⭐</div>
              <p className="text-white/80 mb-4 italic">
                "We've run 50+ NIL campaigns through this platform. The compliance tools and receipts make reporting effortless."
              </p>
              <p className="font-semibold">David R.</p>
              <p className="text-sm text-white/60">Brand Marketing Manager</p>
            </div>

            <div className="rounded-lg bg-white/5 p-8">
              <div className="mb-4 text-4xl">⭐</div>
              <p className="text-white/80 mb-4 italic">
                "Finally, a platform that understands high school NIL rules. The state-by-state compliance is a game-changer."
              </p>
              <p className="font-semibold">Tyler B.</p>
              <p className="text-sm text-white/60">HS Football, California</p>
            </div>

            <div className="rounded-lg bg-white/5 p-8">
              <div className="mb-4 text-4xl">⭐</div>
              <p className="text-white/80 mb-4 italic">
                "Managing NIL for our entire team is now simple. The coach dashboard shows me everything I need without breaking rules."
              </p>
              <p className="font-semibold">Coach Williams</p>
              <p className="text-sm text-white/60">Head Coach, D1 Track & Field</p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">By the Numbers</h2>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--gold)] mb-2">500+</div>
              <div className="text-white/70">Active Athletes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--gold)] mb-2">2,500+</div>
              <div className="text-white/70">Deals Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--gold)] mb-2">$4.2M</div>
              <div className="text-white/70">Paid to Athletes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--gold)] mb-2">100%</div>
              <div className="text-white/70">Compliance Rate</div>
            </div>
          </div>
        </div>

        <div className="text-center rounded-lg border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-8">
          <h3 className="text-2xl font-semibold mb-3">Join Our Community</h3>
          <p className="text-white/80 mb-6">
            Start your free workspace and see why athletes trust us with their NIL deals.
          </p>
          <a
            href="/onboarding?persona=creator"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-8 py-3 text-lg font-semibold text-black hover:bg-[#FFD700]/90"
          >
            Get Started Free
          </a>
        </div>
      </div>
    </div>
  );
}
