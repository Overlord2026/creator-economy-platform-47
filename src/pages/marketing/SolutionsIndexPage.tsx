export default function SolutionsIndexPage() {
  return (
    <div className="min-h-screen bg-[#0B2239] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6">NIL Platform Solutions</h1>
        <p className="text-lg text-white/80 mb-12">
          End-to-end tools for compliant, transparent, and professional NIL deals. From offer to payment to proof.
        </p>

        <div className="space-y-12">
          <section id="offerlock" className="scroll-mt-24">
            <div className="rounded-lg bg-white/5 p-8">
              <h2 className="text-3xl font-semibold mb-4">OfferLock</h2>
              <p className="text-white/70 mb-6 text-lg">
                Lock in deal terms before work begins. No more bait-and-switch, no surprise changes, no ghosting.
              </p>
              <ul className="space-y-2 text-white/80 mb-6">
                <li>• Terms frozen once both sides agree</li>
                <li>• Transparent pricing, scope, deadlines</li>
                <li>• Automatic breach detection</li>
                <li>• Dispute resolution built-in</li>
              </ul>
              <a href="/demo/offerlock" className="inline-flex items-center gap-2 text-[var(--gold)] hover:underline font-semibold">
                See OfferLock Demo →
              </a>
            </div>
          </section>

          <section id="esign" className="scroll-mt-24">
            <div className="rounded-lg bg-white/5 p-8">
              <h2 className="text-3xl font-semibold mb-4">Contract & E-Sign</h2>
              <p className="text-white/70 mb-6 text-lg">
                Legally binding e-signatures with audit trails. Templates vetted by NIL attorneys.
              </p>
              <ul className="space-y-2 text-white/80 mb-6">
                <li>• State-specific NIL contract templates</li>
                <li>• School policy gate checks</li>
                <li>• Parent/guardian co-signature for minors</li>
                <li>• Timestamped audit logs</li>
              </ul>
              <a href="/demo/contract" className="inline-flex items-center gap-2 text-[var(--gold)] hover:underline font-semibold">
                See Contract Demo →
              </a>
            </div>
          </section>

          <section id="payments" className="scroll-mt-24">
            <div className="rounded-lg bg-white/5 p-8">
              <h2 className="text-3xl font-semibold mb-4">Payments & Escrow</h2>
              <p className="text-white/70 mb-6 text-lg">
                Secure escrow holds funds until deliverables are approved. Instant payouts once cleared.
              </p>
              <ul className="space-y-2 text-white/80 mb-6">
                <li>• Escrow holds protect both sides</li>
                <li>• Milestone-based releases</li>
                <li>• Same-day ACH payouts</li>
                <li>• Automatic 1099 generation</li>
              </ul>
              <a href="/demo/settlement" className="inline-flex items-center gap-2 text-[var(--gold)] hover:underline font-semibold">
                See Payment Demo →
              </a>
            </div>
          </section>

          <section id="compliance" className="scroll-mt-24">
            <div className="rounded-lg bg-white/5 p-8">
              <h2 className="text-3xl font-semibold mb-4">Compliance & Policy Gates</h2>
              <p className="text-white/70 mb-6 text-lg">
                Automated checks for state NIL laws, school policies, NCAA rules, and FTC requirements.
              </p>
              <ul className="space-y-2 text-white/80 mb-6">
                <li>• State-by-state rule engine</li>
                <li>• School policy enforcement</li>
                <li>• Deal approval workflows</li>
                <li>• FTC disclosure requirements</li>
              </ul>
            </div>
          </section>

          <section id="receipts" className="scroll-mt-24">
            <div className="rounded-lg bg-white/5 p-8">
              <h2 className="text-3xl font-semibold mb-4">Audit Receipts (Proof Slips)</h2>
              <p className="text-white/70 mb-6 text-lg">
                Immutable proof of every action, payment, and deliverable. Show schools, parents, and auditors exactly what happened.
              </p>
              <ul className="space-y-2 text-white/80 mb-6">
                <li>• Timestamped activity log</li>
                <li>• Downloadable PDF receipts</li>
                <li>• Content hash verification</li>
                <li>• Share with compliance officers</li>
              </ul>
              <a href="/why-receipts" className="inline-flex items-center gap-2 text-[var(--gold)] hover:underline font-semibold">
                Learn More About Receipts →
              </a>
            </div>
          </section>

          <section id="oversight" className="scroll-mt-24">
            <div className="rounded-lg bg-white/5 p-8">
              <h2 className="text-3xl font-semibold mb-4">School/Parent Oversight</h2>
              <p className="text-white/70 mb-6 text-lg">
                Invite coaches, compliance officers, and parents to review deals without giving them full access.
              </p>
              <ul className="space-y-2 text-white/80 mb-6">
                <li>• Read-only viewer access</li>
                <li>• Approval workflows for minors</li>
                <li>• Bulk deal reporting for coaches</li>
                <li>• Monthly summary emails</li>
              </ul>
            </div>
          </section>
        </div>

        <div className="mt-12 rounded-lg border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-8 text-center">
          <h3 className="text-2xl font-semibold mb-3">Ready to get started?</h3>
          <p className="text-white/80 mb-6">
            All solutions are included in every workspace. Athletes get started free, brands start at $99/mo.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-8 py-3 text-lg font-semibold text-black hover:bg-[#FFD700]/90"
          >
            See Pricing
          </a>
        </div>
      </div>
    </div>
  );
}
