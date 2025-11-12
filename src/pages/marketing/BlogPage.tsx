export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0B2239] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6">NIL Insights Blog</h1>
        <p className="text-lg text-white/80 mb-12">
          News, tips, and analysis on the NIL landscape. Updated weekly.
        </p>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <article className="rounded-lg bg-white/5 p-8">
              <div className="mb-3 text-sm text-[var(--gold)]">Dec 1, 2025</div>
              <h2 className="text-2xl font-semibold mb-3">
                New State NIL Laws Taking Effect in 2026
              </h2>
              <p className="text-white/70 mb-4">
                Five states are implementing new NIL regulations starting January 1st. Here's what athletes and brands need to know about compliance requirements...
              </p>
              <a href="#" className="text-[var(--gold)] hover:underline">Read more →</a>
            </article>

            <article className="rounded-lg bg-white/5 p-8">
              <div className="mb-3 text-sm text-[var(--gold)]">Nov 28, 2025</div>
              <h2 className="text-2xl font-semibold mb-3">
                How to Price Your NIL Deals: A Data-Driven Guide
              </h2>
              <p className="text-white/70 mb-4">
                What's fair compensation for a social media post? An appearance? We analyzed 2,000+ NIL deals to give you benchmarks by sport, follower count, and engagement rate...
              </p>
              <a href="#" className="text-[var(--gold)] hover:underline">Read more →</a>
            </article>

            <article className="rounded-lg bg-white/5 p-8">
              <div className="mb-3 text-sm text-[var(--gold)]">Nov 25, 2025</div>
              <h2 className="text-2xl font-semibold mb-3">
                FTC Cracks Down on Undisclosed Sponsorships
              </h2>
              <p className="text-white/70 mb-4">
                The FTC issued warning letters to 10 athletes for failing to properly disclose sponsored content. Learn how to stay compliant with federal disclosure requirements...
              </p>
              <a href="#" className="text-[var(--gold)] hover:underline">Read more →</a>
            </article>

            <article className="rounded-lg bg-white/5 p-8">
              <div className="mb-3 text-sm text-[var(--gold)]">Nov 20, 2025</div>
              <h2 className="text-2xl font-semibold mb-3">
                High School NIL: What's Legal in Your State?
              </h2>
              <p className="text-white/70 mb-4">
                30 states now allow high school athletes to profit from NIL, but the rules vary widely. Here's a state-by-state breakdown of what's allowed and what's not...
              </p>
              <a href="#" className="text-[var(--gold)] hover:underline">Read more →</a>
            </article>
          </div>

          <aside className="space-y-8">
            <div className="rounded-lg bg-white/5 p-6">
              <h3 className="text-xl font-semibold mb-4">Popular Topics</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[var(--gold)] hover:underline">Compliance</a></li>
                <li><a href="#" className="text-[var(--gold)] hover:underline">Pricing Strategy</a></li>
                <li><a href="#" className="text-[var(--gold)] hover:underline">Brand Partnerships</a></li>
                <li><a href="#" className="text-[var(--gold)] hover:underline">Tax Tips</a></li>
                <li><a href="#" className="text-[var(--gold)] hover:underline">High School NIL</a></li>
              </ul>
            </div>

            <div className="rounded-lg bg-white/5 p-6">
              <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
              <p className="text-white/70 text-sm mb-4">
                Get weekly NIL insights delivered to your inbox.
              </p>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/50 mb-3"
              />
              <button className="w-full rounded-lg bg-[#FFD700] px-4 py-2 font-semibold text-black hover:bg-[#FFD700]/90">
                Subscribe
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
