export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#0B2239] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Help Center & FAQ</h1>
          <p className="text-lg text-white/80">
            Find answers to common questions or contact our support team.
          </p>
        </div>

        <div className="mb-12">
          <input
            type="search"
            placeholder="Search for help..."
            className="w-full max-w-2xl mx-auto block rounded-lg bg-white/10 border border-white/20 px-6 py-4 text-white placeholder-white/50"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mb-16">
          <div className="rounded-lg bg-white/5 p-8">
            <h2 className="text-2xl font-semibold mb-6">For Athletes</h2>
            <div className="space-y-4">
              <details className="group">
                <summary className="cursor-pointer text-lg font-medium text-white/90 hover:text-[var(--gold)] flex justify-between items-center">
                  How do I create my first NIL deal?
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-white/70 text-sm">
                  Start by creating a free athlete workspace, completing your profile, and browsing available opportunities. When you find a deal you like, click "Apply" and follow the steps to lock in terms.
                </p>
              </details>

              <details className="group">
                <summary className="cursor-pointer text-lg font-medium text-white/90 hover:text-[var(--gold)] flex justify-between items-center">
                  Do I need my parents' permission?
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-white/70 text-sm">
                  If you're under 18, yes. Our platform requires parent/guardian co-signature on all contracts for minors. We'll guide you through inviting your parent to review and approve deals.
                </p>
              </details>

              <details className="group">
                <summary className="cursor-pointer text-lg font-medium text-white/90 hover:text-[var(--gold)] flex justify-between items-center">
                  How do I get paid?
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-white/70 text-sm">
                  Once you complete deliverables and the brand approves, funds are released from escrow to your connected bank account via same-day ACH. You'll receive a notification when payment is sent.
                </p>
              </details>

              <details className="group">
                <summary className="cursor-pointer text-lg font-medium text-white/90 hover:text-[var(--gold)] flex justify-between items-center">
                  What if my school doesn't allow a deal?
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-white/70 text-sm">
                  Our compliance engine checks deals against your school's policies before you sign. If a deal violates school rules, we'll flag it and explain why. You can decline or request changes from the brand.
                </p>
              </details>
            </div>
          </div>

          <div className="rounded-lg bg-white/5 p-8">
            <h2 className="text-2xl font-semibold mb-6">For Brands</h2>
            <div className="space-y-4">
              <details className="group">
                <summary className="cursor-pointer text-lg font-medium text-white/90 hover:text-[var(--gold)] flex justify-between items-center">
                  How do I post a campaign brief?
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-white/70 text-sm">
                  Create a brand workspace, then navigate to Campaigns → New Brief. Fill out campaign details (type, budget, requirements) and we'll match you with qualified athletes.
                </p>
              </details>

              <details className="group">
                <summary className="cursor-pointer text-lg font-medium text-white/90 hover:text-[var(--gold)] flex justify-between items-center">
                  What's the approval process?
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-white/70 text-sm">
                  Athletes submit deliverables through the platform. You review and either approve or request revisions. Once approved, payment is automatically released from escrow.
                </p>
              </details>

              <details className="group">
                <summary className="cursor-pointer text-lg font-medium text-white/90 hover:text-[var(--gold)] flex justify-between items-center">
                  How do I ensure FTC compliance?
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-white/70 text-sm">
                  Our platform automatically includes FTC disclosure requirements in all contracts and reminds athletes to use proper tags (#ad, #sponsored). We also provide audit receipts proving compliance.
                </p>
              </details>

              <details className="group">
                <summary className="cursor-pointer text-lg font-medium text-white/90 hover:text-[var(--gold)] flex justify-between items-center">
                  What are usage rights?
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-white/70 text-sm">
                  Usage rights define where and how long you can use athlete-created content. Specify rights in your campaign brief (e.g., "social media only, 6 months" or "all channels, perpetual").
                </p>
              </details>
            </div>
          </div>
        </div>

        <div className="text-center rounded-lg border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-8">
          <h3 className="text-2xl font-semibold mb-3">Can't find what you're looking for?</h3>
          <p className="text-white/80 mb-6">
            Our support team is here to help. We typically respond within 2 hours.
          </p>
          <a
            href="mailto:support@creatornilplatform.com"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-8 py-3 text-lg font-semibold text-black hover:bg-[#FFD700]/90"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
