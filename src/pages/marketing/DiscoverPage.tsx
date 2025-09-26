import { Link } from "react-router-dom";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { colors } from "@/components/marketing/_shims/theme";

export default function DiscoverPage() {
  return (
    <div className={`${colors.navyBg} text-white min-h-screen flex flex-col`}>
      <MarketingHeader />
      <main className="marketing-container flex-1 marketing-section max-w-4xl">
        <h1 className="text-3xl font-semibold">Discover • 60-second demo</h1>
        <p className="mt-2 text-white/80">
          See OfferLock → E-Sign → Settlement in under a minute. This is a UI-only teaser; the full walk-through starts the demo.
        </p>

        {/* Placeholder player block — replace with real mp4 or embed later */}
        <div className="mt-6 aspect-video w-full rounded-xl border border-white/10 bg-white/5 grid place-items-center text-white/70">
          <div className="text-center px-6">
            <div className="text-sm opacity-80">Video placeholder</div>
            <div className="mt-1 text-xs opacity-60">Swap with your hosted mp4 or embed when ready.</div>
          </div>
        </div>

        <ol className="mt-8 list-decimal pl-6 space-y-2 text-white/90">
          <li>OfferLock — write down what was discussed. No surprises.</li>
          <li>E-Sign — everyone signs the same deal, the right way.</li>
          <li>Settlement — payouts with a private receipt you can show.</li>
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/demo/offerlock" className={`${colors.goldBg} inline-flex h-11 items-center justify-center rounded-md px-5 font-medium`}>
            Start Walkthrough
          </Link>
          <Link to="/personas" className="inline-flex h-11 items-center justify-center rounded-md px-5 font-medium bg-white/10 hover:bg-white/15">
            Explore personas
          </Link>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
