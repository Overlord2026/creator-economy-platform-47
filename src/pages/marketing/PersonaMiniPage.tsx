import { Link, useParams } from "react-router-dom";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { colors } from "@/components/marketing/_shims/theme";

type Copy = {
  title: string;
  sub: string;
  bullets: string[];
  notes?: string[];
};

const COPIES: Record<string, Copy> = {
  athlete: {
    title: "Athletes (HS • College • Pro)",
    sub: "Lock offers, route approvals, and keep private proof — without oversharing.",
    bullets: [
      "OfferLock: align on deliverables before anyone signs",
      "School oversight: approvals + disclosure packs",
      "Parent/guardian co-sign (when needed)",
      "Settlement proofs for finance/CPA",
    ],
  },
  entertainer: {
    title: "Entertainers (music • film • live)",
    sub: "Keep briefs, usage windows, and settlements in one place.",
    bullets: [
      "OfferLock for gigs, usage, and timelines",
      "E-Sign the final — no “ghost edits”",
      "Merch/storefront links with compliant banners",
      "Proof packs for your team and venues",
    ],
  },
  creator: {
    title: "Creators/Influencers (YouTube • TikTok • IG)",
    sub: "Turn DMs into deliverables — and keep receipts you can show.",
    bullets: [
      "Shoutouts/sessions with pricing hints (you choose)",
      "Disclosure templates by channel/state",
      "Delta receipts for revision history",
      "CPA export when you’re ready",
    ],
  },
  parent: {
    title: "Parents / Guardians",
    sub: "See what matters. Keep private amounts private.",
    bullets: [
      "Scoped views: training, approvals, disclosures",
      "Co-sign rails for minors",
      "Emergency Access Card (health)",
      "Revoke sharing anytime",
    ],
  },
  school: {
    title: "Coaches / Schools",
    sub: "Faster approvals with less back-and-forth.",
    bullets: [
      "Student OfferLock summaries (content-light)",
      "Policy-check status at a glance",
      "Export clean packs for compliance",
      "Audit-friendly receipts without raw deal text",
    ],
  },
  agent: {
    title: "Agents / Reps",
    sub: "Pipeline from brief → OfferLock → e-sign → settlement.",
    bullets: [
      "Roster + invites",
      "Training/disclosure gates before action",
      "Delta receipts end “who changed what”",
      "Escrow + milestone releases",
    ],
  },
  brand: {
    title: "Brands / Partners",
    sub: "Brief, verify disclosures, and settle with proof.",
    bullets: [
      "Briefs with deliverables and usage windows",
      "OfferLock to prevent overlap",
      "FTC banners auto-logged as receipts",
      "Settlement proofs for finance",
    ],
  },
  pros: {
    title: "Service Professionals (Accountants • Attorneys • Advisors)",
    sub: "Meet clients where the work happens — with compliant exports.",
    bullets: [
      "Policy-aware document vault",
      "WORM retention for evidence",
      "CSV + doc export packs",
      "Scoped client views; no raw socials needed",
    ],
  },
};

export default function PersonaMiniPage() {
  const { slug = "" } = useParams();
  const copy = COPIES[slug] ?? {
    title: "Creator & NIL",
    sub: "Choose a persona to see the focused view.",
    bullets: [
      "OfferLock → E-Sign → Settlement",
      "Parents/Schools see what matters",
      "Receipts you can prove",
    ],
  };

  return (
    <div className={`${colors.navyBg} text-white min-h-screen flex flex-col`}>
      <MarketingHeader />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-12 sm:py-16">
        <div className="text-sm opacity-70">
          <Link to="/personas" className="underline">← Back to Personas</Link>
        </div>
        <h1 className="mt-2 text-3xl font-semibold">{copy.title}</h1>
        <p className="mt-2 text-white/80">{copy.sub}</p>

        <ul className="mt-6 space-y-2">
          {copy.bullets.map((b) => (
            <li key={b} className="rounded-lg border border-white/10 bg-white/5 p-3">• {b}</li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/demo/offerlock" className={`${colors.goldBg} inline-flex h-11 items-center justify-center rounded-md px-5 font-medium`}>
            Start OfferLock
          </Link>
          <Link to="/why-receipts" className="inline-flex h-11 items-center justify-center rounded-md px-5 font-medium bg-white/10 hover:bg-white/15">
            Why receipts?
          </Link>
        </div>

        <div className="mt-8 text-sm text-white/70">
          Tip: every step leaves a private, audit-friendly receipt. Partners see what they need — not what they don’t.
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
