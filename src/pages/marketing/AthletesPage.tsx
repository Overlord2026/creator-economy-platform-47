export default function AthletesPage() {
  return (
    <div className="min-h-screen bg-[#0B2239] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6">For Athletes</h1>
        <p className="text-lg text-white/80 mb-8">
          Take control of your NIL deals with Creator NIL Platform. Get verified, manage offers, and build your brand with confidence.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white/5 p-6">
            <h3 className="text-xl font-semibold mb-3">Get NIL Verified</h3>
            <p className="text-white/70 mb-4">Complete NIL training and certification to unlock premium opportunities.</p>
            <a href="/athletes/verified" className="text-[var(--gold)] hover:underline">Learn more →</a>
          </div>

          <div className="rounded-lg bg-white/5 p-6">
            <h3 className="text-xl font-semibold mb-3">OfferLock Demo</h3>
            <p className="text-white/70 mb-4">See how OfferLock protects your deals from last-minute changes.</p>
            <a href="/demo/offerlock?persona=creator" className="text-[var(--gold)] hover:underline">Try demo →</a>
          </div>

          <div className="rounded-lg bg-white/5 p-6">
            <h3 className="text-xl font-semibold mb-3">Build Your Brand Kit</h3>
            <p className="text-white/70 mb-4">Create professional media kits and showcase your value to brands.</p>
            <a href="/athletes/brand-kit" className="text-[var(--gold)] hover:underline">Start building →</a>
          </div>
        </div>

        <div className="mt-12">
          <a
            href="/onboarding?persona=creator"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-8 py-3 text-lg font-semibold text-black hover:bg-[#FFD700]/90"
          >
            Start Free Workspace
          </a>
        </div>
      </div>
    </div>
  );
}
