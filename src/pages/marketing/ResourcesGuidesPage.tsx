export default function ResourcesGuidesPage() {
  return (
    <div className="min-h-screen bg-[#0B2239] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6">Guides & Playbooks</h1>
        <p className="text-lg text-white/80 mb-12">
          Free resources to help athletes, parents, coaches, and brands navigate the NIL landscape.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white/5 p-6">
            <div className="mb-4 inline-flex rounded-lg bg-[var(--gold)]/20 px-3 py-1 text-sm font-semibold text-[var(--gold)]">
              For Athletes
            </div>
            <h3 className="text-xl font-semibold mb-3">NIL 101: Getting Started</h3>
            <p className="text-white/70 mb-4">
              Everything you need to know before signing your first NIL deal.
            </p>
            <a href="#" className="text-[var(--gold)] hover:underline">Download PDF →</a>
          </div>

          <div className="rounded-lg bg-white/5 p-6">
            <div className="mb-4 inline-flex rounded-lg bg-[var(--gold)]/20 px-3 py-1 text-sm font-semibold text-[var(--gold)]">
              For Athletes
            </div>
            <h3 className="text-xl font-semibold mb-3">Building Your Personal Brand</h3>
            <p className="text-white/70 mb-4">
              Social media strategy, content creation, and brand positioning for athletes.
            </p>
            <a href="#" className="text-[var(--gold)] hover:underline">Download PDF →</a>
          </div>

          <div className="rounded-lg bg-white/5 p-6">
            <div className="mb-4 inline-flex rounded-lg bg-[var(--gold)]/20 px-3 py-1 text-sm font-semibold text-[var(--gold)]">
              For Parents
            </div>
            <h3 className="text-xl font-semibold mb-3">Parent's Guide to NIL</h3>
            <p className="text-white/70 mb-4">
              How to support your athlete while ensuring compliance and safety.
            </p>
            <a href="#" className="text-[var(--gold)] hover:underline">Download PDF →</a>
          </div>

          <div className="rounded-lg bg-white/5 p-6">
            <div className="mb-4 inline-flex rounded-lg bg-[var(--gold)]/20 px-3 py-1 text-sm font-semibold text-[var(--gold)]">
              For Coaches
            </div>
            <h3 className="text-xl font-semibold mb-3">Coach's Oversight Playbook</h3>
            <p className="text-white/70 mb-4">
              Managing team NIL activities without violating NCAA rules.
            </p>
            <a href="#" className="text-[var(--gold)] hover:underline">Download PDF →</a>
          </div>

          <div className="rounded-lg bg-white/5 p-6">
            <div className="mb-4 inline-flex rounded-lg bg-[var(--gold)]/20 px-3 py-1 text-sm font-semibold text-[var(--gold)]">
              For Brands
            </div>
            <h3 className="text-xl font-semibold mb-3">Brand's NIL Campaign Checklist</h3>
            <p className="text-white/70 mb-4">
              Step-by-step guide to launching compliant NIL campaigns.
            </p>
            <a href="#" className="text-[var(--gold)] hover:underline">Download PDF →</a>
          </div>

          <div className="rounded-lg bg-white/5 p-6">
            <div className="mb-4 inline-flex rounded-lg bg-[var(--gold)]/20 px-3 py-1 text-sm font-semibold text-[var(--gold)]">
              For Brands
            </div>
            <h3 className="text-xl font-semibold mb-3">FTC Compliance for NIL Deals</h3>
            <p className="text-white/70 mb-4">
              Disclosure requirements and best practices for sponsored content.
            </p>
            <a href="#" className="text-[var(--gold)] hover:underline">Download PDF →</a>
          </div>
        </div>

        <div className="mt-12 rounded-lg border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-6">
          <h3 className="text-xl font-semibold mb-3">Need Custom Guidance?</h3>
          <p className="text-white/80 mb-4">
            Our compliance team can provide tailored advice for your specific situation.
          </p>
          <a href="/help" className="text-[var(--gold)] hover:underline font-semibold">
            Contact Support →
          </a>
        </div>
      </div>
    </div>
  );
}
