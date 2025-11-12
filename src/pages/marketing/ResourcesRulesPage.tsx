export default function ResourcesRulesPage() {
  return (
    <div className="min-h-screen bg-[#0B2239] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6">NIL Rules by State & School</h1>
        <p className="text-lg text-white/80 mb-12">
          Stay compliant with your state's NIL laws and your school's specific policies. Rules updated monthly.
        </p>

        <div className="mb-12 rounded-lg bg-white/5 p-8">
          <h2 className="text-2xl font-semibold mb-6">Search by State</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho'].map((state) => (
              <button
                key={state}
                className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-left text-sm hover:border-[var(--gold)] hover:bg-white/10"
              >
                {state}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-white/60">+ 38 more states...</p>
        </div>

        <div className="mb-12 rounded-lg bg-white/5 p-8">
          <h2 className="text-2xl font-semibold mb-6">Common State Requirements</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--gold)]">California (SB 206)</h3>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>• Athletes can sign with agents</li>
                <li>• Schools cannot restrict NIL activities</li>
                <li>• No deals with conflicting sponsors</li>
                <li>• Athletes must report deals to school</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--gold)]">Texas (HB 1435)</h3>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>• Athletes can hire professional representation</li>
                <li>• Schools must provide NIL education</li>
                <li>• Cannot use school marks without permission</li>
                <li>• Deals must not conflict with team obligations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--gold)]">Florida (SB 646)</h3>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>• One of the first NIL-friendly states</li>
                <li>• Athletes can profit from camps/lessons</li>
                <li>• Schools can assist with NIL opportunities</li>
                <li>• Must disclose deals over $600 to school</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-12 rounded-lg bg-white/5 p-8">
          <h2 className="text-2xl font-semibold mb-6">School-Specific Policies</h2>
          <p className="text-white/70 mb-4">
            In addition to state laws, each school has its own NIL policies. Common school requirements include:
          </p>
          <ul className="space-y-2 text-white/80">
            <li>• Pre-approval for deals using school logos/colors</li>
            <li>• Disclosure of all NIL agreements to compliance office</li>
            <li>• Prohibition on deals with gambling/tobacco/adult content</li>
            <li>• Cannot interfere with team practices/games</li>
            <li>• Social media disclosure requirements (#ad, #sponsored)</li>
          </ul>
        </div>

        <div className="rounded-lg border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-6">
          <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
          <p className="text-white/80 mb-4">
            NIL rules change frequently. Subscribe to get alerts when your state or school updates their policies.
          </p>
          <a href="/resources/updates" className="text-[var(--gold)] hover:underline font-semibold">
            Subscribe to Updates →
          </a>
        </div>
      </div>
    </div>
  );
}
