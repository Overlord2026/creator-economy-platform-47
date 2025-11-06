import React from "react";
import { Link } from "react-router-dom";

const NAVY = "#0B2239";

/** Split hero: fast choice for top personas; self-contained (no shadcn deps). */
export default function SplitHeroRoot() {
  return (
    <main className="min-h-screen p-8 text-white" style={{ background: NAVY }}>
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-extrabold">Choose your path</h1>
        <p className="mt-2 text-white/80 max-w-2xl">
          Get to the right tools quicker. You can switch personas later.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {/* Athletes & Creators */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-extrabold">Athletes & Creators</h2>
            <ul className="mt-3 text-sm text-white/80 space-y-2">
              <li>✓ Brand kit & approvals</li>
              <li>✓ e-sign on rails</li>
              <li>✓ Proof-backed receipts</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/onboarding/athlete" className="rounded-md border border-[var(--gold)] bg-[var(--gold)] px-3 py-1.5 text-sm font-semibold text-black hover:opacity-95">
                Start workspace
              </Link>
              <Link to="/deals" className="rounded-md border border-white/20 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10">
                View deals
              </Link>
            </div>
          </div>

          {/* Coaches & Schools */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-extrabold">Coaches & Schools</h2>
            <ul className="mt-3 text-sm text-white/80 space-y-2">
              <li>✓ Policy gates</li>
              <li>✓ Right-sized visibility</li>
              <li>✓ Exportable oversight</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/onboarding/school" className="rounded-md border border-[var(--gold)] px-3 py-1.5 text-sm font-semibold text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black">
                See demo
              </Link>
              <Link to="/pros" className="rounded-md border border-white/20 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10">
                Service pros
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary paths */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold">Brand/Partner</h3>
            <p className="text-sm text-white/70 mt-2">Create structured offers and campaigns.</p>
            <div className="mt-4">
              <Link to="/onboarding/brand" className="rounded-md border border-[#D4AF37] text-[#D4AF37] px-3 py-1.5 text-sm hover:bg-[#D4AF37]/10">
                Open
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold">Agent/Rep</h3>
            <p className="text-sm text-white/70 mt-2">Manage clients and deal pipelines.</p>
            <div className="mt-4">
              <Link to="/onboarding/agent" className="rounded-md border border-[#D4AF37] text-[#D4AF37] px-3 py-1.5 text-sm hover:bg-[#D4AF37]/10">
                Open
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold">Parent/Guardian</h3>
            <p className="text-sm text-white/70 mt-2">Co-sign, monitor, and export receipts.</p>
            <div className="mt-4">
              <Link to="/families" className="rounded-md border border-[#D4AF37] text-[#D4AF37] px-3 py-1.5 text-sm hover:bg-[#D4AF37]/10">
                Open
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-sm text-white/60">
          Prefer the marketing page? <Link to="/marketing" className="underline text-white/80 hover:text-white">Go here</Link>.
        </div>
      </div>
    </main>
  );
}
