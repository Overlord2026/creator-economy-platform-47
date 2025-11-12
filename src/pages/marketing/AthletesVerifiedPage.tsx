export default function AthletesVerifiedPage() {
  return (
    <div className="min-h-screen bg-[#0B2239] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6">Get NIL Verified</h1>
        <p className="text-lg text-white/80 mb-12">
          Complete our comprehensive NIL training program and get certified. Verified athletes unlock premium opportunities and higher trust scores with brands.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white/5 p-8">
            <h2 className="text-2xl font-semibold mb-4">What's Included</h2>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-[var(--gold)]">✓</span>
                <span>NIL Compliance Training (State & NCAA)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--gold)]">✓</span>
                <span>Contract Basics & Red Flags</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--gold)]">✓</span>
                <span>FTC Disclosure Requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--gold)]">✓</span>
                <span>Brand Partnership Best Practices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--gold)]">✓</span>
                <span>Verified Badge on Your Profile</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-white/5 p-8">
            <h2 className="text-2xl font-semibold mb-4">Certification Benefits</h2>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-[var(--gold)]">✓</span>
                <span>Access to exclusive brand partnerships</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--gold)]">✓</span>
                <span>Priority placement in brand searches</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--gold)]">✓</span>
                <span>Higher trust score with compliance teams</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--gold)]">✓</span>
                <span>Reduced school/coach oversight friction</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <a
            href="/onboarding?persona=creator&verified=true"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-8 py-3 text-lg font-semibold text-black hover:bg-[#FFD700]/90"
          >
            Start Verification
          </a>
        </div>
      </div>
    </div>
  );
}
