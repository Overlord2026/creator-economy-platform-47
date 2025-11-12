export default function BrandsSolutionsPage() {
  return (
    <div className="min-h-screen bg-[#0B2239] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6">Brand Campaign Solutions</h1>
        <p className="text-lg text-white/80 mb-12">
          Choose the right NIL campaign type for your brand goals. From quick social posts to long-term partnerships.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white/5 p-8">
            <h3 className="text-2xl font-semibold mb-3">UGC Content</h3>
            <p className="text-white/70 mb-4">
              Get authentic user-generated content from athletes for your brand's social channels and ads.
            </p>
            <ul className="space-y-2 text-sm text-white/60 mb-6">
              <li>• Photos & videos</li>
              <li>• Product reviews</li>
              <li>• Usage rights included</li>
              <li>• Fast turnaround (48-72hrs)</li>
            </ul>
            <p className="text-[var(--gold)] font-semibold">Starting at $500</p>
          </div>

          <div className="rounded-lg bg-white/5 p-8">
            <h3 className="text-2xl font-semibold mb-3">Appearances</h3>
            <p className="text-white/70 mb-4">
              Book athletes for in-person or virtual appearances at events, store openings, and activations.
            </p>
            <ul className="space-y-2 text-sm text-white/60 mb-6">
              <li>• Store openings</li>
              <li>• Meet & greets</li>
              <li>• Virtual Q&As</li>
              <li>• Brand activations</li>
            </ul>
            <p className="text-[var(--gold)] font-semibold">Starting at $2,500</p>
          </div>

          <div className="rounded-lg bg-white/5 p-8">
            <h3 className="text-2xl font-semibold mb-3">Events</h3>
            <p className="text-white/70 mb-4">
              Host branded events featuring athletes. Great for product launches and community engagement.
            </p>
            <ul className="space-y-2 text-sm text-white/60 mb-6">
              <li>• Product launches</li>
              <li>• Fan festivals</li>
              <li>• Charity events</li>
              <li>• Campus activations</li>
            </ul>
            <p className="text-[var(--gold)] font-semibold">Starting at $5,000</p>
          </div>

          <div className="rounded-lg bg-white/5 p-8">
            <h3 className="text-2xl font-semibold mb-3">Social Media Posts</h3>
            <p className="text-white/70 mb-4">
              Single or multi-post campaigns across Instagram, TikTok, Twitter, and other platforms.
            </p>
            <ul className="space-y-2 text-sm text-white/60 mb-6">
              <li>• Instagram posts/stories</li>
              <li>• TikTok videos</li>
              <li>• Twitter threads</li>
              <li>• FTC compliant</li>
            </ul>
            <p className="text-[var(--gold)] font-semibold">Starting at $750</p>
          </div>

          <div className="rounded-lg bg-white/5 p-8">
            <h3 className="text-2xl font-semibold mb-3">Ambassador Programs</h3>
            <p className="text-white/70 mb-4">
              Long-term partnerships with athletes who become authentic brand ambassadors.
            </p>
            <ul className="space-y-2 text-sm text-white/60 mb-6">
              <li>• 6-12 month contracts</li>
              <li>• Exclusive partnerships</li>
              <li>• Multiple touchpoints</li>
              <li>• Performance incentives</li>
            </ul>
            <p className="text-[var(--gold)] font-semibold">Custom pricing</p>
          </div>

          <div className="rounded-lg bg-white/5 p-8">
            <h3 className="text-2xl font-semibold mb-3">Content Licensing</h3>
            <p className="text-white/70 mb-4">
              License athlete-created content for use in your brand's marketing across channels.
            </p>
            <ul className="space-y-2 text-sm text-white/60 mb-6">
              <li>• Paid media rights</li>
              <li>• Website usage</li>
              <li>• Email campaigns</li>
              <li>• Perpetual or time-limited</li>
            </ul>
            <p className="text-[var(--gold)] font-semibold">Starting at $1,000</p>
          </div>
        </div>

        <div className="mt-12">
          <a
            href="/onboarding?persona=pro"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-8 py-3 text-lg font-semibold text-black hover:bg-[#FFD700]/90"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
