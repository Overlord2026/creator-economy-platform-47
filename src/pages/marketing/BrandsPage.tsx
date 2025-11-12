export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-[#0B2239] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6">For Brands</h1>
        <p className="text-lg text-white/80 mb-8">
          Launch compliant NIL campaigns with confidence. Post briefs, manage creators, and track deliverables all in one place.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white/5 p-6">
            <h3 className="text-xl font-semibold mb-3">Post a Campaign Brief</h3>
            <p className="text-white/70 mb-4">Create campaign briefs and get matched with verified athletes.</p>
            <a href="/brands/briefs/new" className="text-[var(--gold)] hover:underline">Create brief →</a>
          </div>

          <div className="rounded-lg bg-white/5 p-6">
            <h3 className="text-xl font-semibold mb-3">Campaign Types</h3>
            <p className="text-white/70 mb-4">UGC content, appearances, events, long-term partnerships.</p>
            <a href="/brands/solutions" className="text-[var(--gold)] hover:underline">Explore options →</a>
          </div>

          <div className="rounded-lg bg-white/5 p-6">
            <h3 className="text-xl font-semibold mb-3">Compliance & FTC</h3>
            <p className="text-white/70 mb-4">Built-in approval flows and FTC disclosure enforcement.</p>
            <a href="/solutions#disclosures" className="text-[var(--gold)] hover:underline">Learn more →</a>
          </div>

          <div className="rounded-lg bg-white/5 p-6">
            <h3 className="text-xl font-semibold mb-3">Audit Receipts</h3>
            <p className="text-white/70 mb-4">Proof slips for every deliverable, asset, and payment.</p>
            <a href="/why-receipts" className="text-[var(--gold)] hover:underline">See how it works →</a>
          </div>
        </div>

        <div className="mt-12">
          <a
            href="/onboarding?persona=pro"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-8 py-3 text-lg font-semibold text-black hover:bg-[#FFD700]/90"
          >
            Create Brand Workspace
          </a>
        </div>
      </div>
    </div>
  );
}
