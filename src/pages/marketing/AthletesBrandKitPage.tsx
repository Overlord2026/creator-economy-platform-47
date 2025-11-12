export default function AthletesBrandKitPage() {
  return (
    <div className="min-h-screen bg-[#0B2239] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6">Build Your Brand Kit</h1>
        <p className="text-lg text-white/80 mb-12">
          Create a professional media kit that showcases your stats, social reach, and brand value. Stand out to potential brand partners.
        </p>

        <div className="mb-12 rounded-lg bg-white/5 p-8">
          <h2 className="text-2xl font-semibold mb-6">Your Brand Kit Includes:</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--gold)]">Profile & Stats</h3>
              <p className="text-white/70 text-sm">Athletic achievements, position, school, year</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--gold)]">Social Metrics</h3>
              <p className="text-white/70 text-sm">Followers, engagement rates, audience demographics</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--gold)]">Media Gallery</h3>
              <p className="text-white/70 text-sm">Photos, videos, action shots, lifestyle content</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--gold)]">Past Partnerships</h3>
              <p className="text-white/70 text-sm">Previous NIL deals, testimonials, case studies</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--gold)]">Rate Card</h3>
              <p className="text-white/70 text-sm">Pricing for posts, appearances, content creation</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--gold)]">Contact Info</h3>
              <p className="text-white/70 text-sm">Professional contact details, agent info (if applicable)</p>
            </div>
          </div>
        </div>

        <div className="mb-12 rounded-lg border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-6">
          <h3 className="text-xl font-semibold mb-3">Pro Tip</h3>
          <p className="text-white/80">
            Athletes with complete brand kits receive 3x more partnership inquiries and command 40% higher deal values on average.
          </p>
        </div>

        <div className="mt-12">
          <a
            href="/onboarding?persona=creator&flow=brand-kit"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-8 py-3 text-lg font-semibold text-black hover:bg-[#FFD700]/90"
          >
            Create Your Brand Kit
          </a>
        </div>
      </div>
    </div>
  );
}
