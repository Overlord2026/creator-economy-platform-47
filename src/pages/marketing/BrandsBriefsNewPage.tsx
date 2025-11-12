export default function BrandsBriefsNewPage() {
  return (
    <div className="min-h-screen bg-[#0B2239] text-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6">Post a Campaign Brief</h1>
        <p className="text-lg text-white/80 mb-12">
          Create a campaign brief to get matched with verified athletes. Define your requirements, budget, and timeline.
        </p>

        <div className="rounded-lg bg-white/5 p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Campaign Brief Builder</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Campaign Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button className="rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-left hover:border-[var(--gold)] hover:bg-white/10">
                  Social Media Post
                </button>
                <button className="rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-left hover:border-[var(--gold)] hover:bg-white/10">
                  UGC Content
                </button>
                <button className="rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-left hover:border-[var(--gold)] hover:bg-white/10">
                  Event Appearance
                </button>
                <button className="rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-left hover:border-[var(--gold)] hover:bg-white/10">
                  Long-term Partnership
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-4">
              <p className="text-sm text-white/90">
                <strong>Note:</strong> To post briefs and manage campaigns, you'll need to create a brand workspace. This takes less than 2 minutes.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <a
            href="/onboarding?persona=pro&flow=brief"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-8 py-3 text-lg font-semibold text-black hover:bg-[#FFD700]/90"
          >
            Create Workspace to Continue
          </a>
        </div>
      </div>
    </div>
  );
}
