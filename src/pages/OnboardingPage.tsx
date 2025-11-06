import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/** Minimal local Stepper so we don't depend on missing "@/components/ui/stepper" */
function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-3 text-sm">
      {steps.map((label, i) => (
        <li
          key={label}
          className={`rounded-full px-2.5 py-0.5 border ${
            i <= current ? "border-[var(--gold)] text-[var(--gold)]" : "border-white/20 text-white/60"
          }`}
        >
          {i + 1}. {label}
        </li>
      ))}
    </ol>
  );
}

const NAVY = "#0B2239";

/** Simple, self-contained onboarding page */
export default function OnboardingPage() {
  const nav = useNavigate();
  const storageKey = "onb-athlete"; // tweak per persona if you fork this file
  const steps = useMemo(() => ["Profile", "Compliance", "Payout"], []);
  const [idx, setIdx] = useState(0);
  const total = steps.length;

  useEffect(() => {
    const saved = Number(localStorage.getItem(storageKey));
    if (Number.isFinite(saved) && saved >= 0 && saved < total) setIdx(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey, total]);

  useEffect(() => {
    localStorage.setItem(storageKey, String(idx));
  }, [idx, storageKey]);

  const next = () => {
    if (idx + 1 < total) setIdx(idx + 1);
    else {
      localStorage.removeItem(storageKey);
      nav("/athlete/dashboard"); // success route; change if you need
    }
  };
  const back = () => idx > 0 && setIdx(idx - 1);

  return (
    <main className="min-h-screen p-8 text-white" style={{ background: NAVY }}>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-extrabold">Athlete onboarding</h1>
        <div className="mt-4">
          <Stepper steps={steps} current={idx} />
        </div>

        {/* card */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">{steps[idx]}</h2>
          <div className="mt-4 space-y-3">
            {/* We use plain HTML inputs as safe fallback */}
            {idx === 0 && (
              <>
                <label className="block text-sm text-white/80">
                  Name
                  <input
                    className="mt-1 block w-full rounded border border-white/20 bg-transparent p-2 text-white/90"
                    placeholder="Your full name"
                  />
                </label>
                <label className="block text-sm text-white/80">
                  School / Program
                  <input
                    className="mt-1 block w-full rounded border border-white/20 bg-transparent p-2 text-white/90"
                    placeholder="e.g., State University"
                  />
                </label>
              </>
            )}
            {idx === 1 && (
              <>
                <p className="text-white/80 text-sm">
                  Quick compliance questions (demo). Select any answer and continue.
                </p>
                <label className="inline-flex items-center gap-2 text-sm text-white/80">
                  <input type="checkbox" className="accent-[var(--gold)]" /> I understand disclosure requirements.
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-white/80">
                  <input type="checkbox" className="accent-[var(--gold)]" /> I’ll keep receipts for every deal.
                </label>
              </>
            )}
            {idx === 2 && (
              <>
                <label className="block text-sm text-white/80">
                  Bank account (demo)
                  <input
                    className="mt-1 block w-full rounded border border-white/20 bg-transparent p-2 text-white/90"
                    placeholder="**** **** **** 1234"
                  />
                </label>
                <p className="text-xs text-white/60">Payments are simulated in demo mode.</p>
              </>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={back}
              disabled={idx === 0}
              className="rounded-md border border-white/20 px-3 py-1.5 text-sm text-white/80 disabled:opacity-50"
            >
              Back
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={next}
                className="inline-flex items-center gap-1 rounded-md border border-[var(--gold)] bg-[var(--gold)] px-3 py-1.5 text-sm font-semibold text-black hover:opacity-95"
              >
                {idx + 1 < total ? "Next" : "Finish"}
              </button>
              <Link
                to="/"
                className="rounded-md border border-white/20 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
