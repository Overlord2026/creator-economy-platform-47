import React, { useMemo, useState } from "react";

export type WizardStep = {
  id: string;
  title: string;
  body: React.ReactNode;
  optional?: boolean;
};

export default function SimpleWizard({
  steps,
  onComplete,
  className = "",
  storageKey,
}: {
  steps: WizardStep[];
  onComplete: () => void;
  className?: string;
  storageKey?: string;
}) {
  const total = steps.length;
  const [idx, setIdx] = useState(0);

  // Load saved index once
  React.useEffect(() => {
    if (!storageKey) return;
    const saved = Number(localStorage.getItem(storageKey));
    if (Number.isFinite(saved) && saved >= 0 && saved < total) {
      setIdx(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey, total]);

  // Persist index on change
  React.useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, String(idx));
  }, [idx, storageKey]);

  const step = steps[idx];
  const pct = useMemo(() => Math.round(((idx + 1) / total) * 100), [idx, total]);

  const next = () => {
    if (idx + 1 < total) {
      setIdx(idx + 1);
    } else {
      if (storageKey) localStorage.removeItem(storageKey);
      onComplete();
    }
  };

  const back = () => { if (idx > 0) setIdx(idx - 1); };
  const skip = () => next();

  return (
    <div className={`w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-white/80 text-sm">Step {idx + 1} of {total}</div>
        <div className="text-white/80 text-sm">{pct}%</div>
      </div>
      <div className="mb-4 h-2 w-full overflow-hidden rounded bg-white/10">
        <div className="h-full bg-[var(--gold)]" style={{ width: `${pct}%` }} />
      </div>
      <h2 className="text-xl font-bold text-white">{step.title}</h2>
      <div className="mt-3 text-white/80">{step.body}</div>
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={back}
          disabled={idx === 0}
          className="rounded-md border border-white/20 px-3 py-1.5 text-sm text-white/80 disabled:opacity-50"
        >
          Back
        </button>
        <div className="flex items-center gap-2">
          {step.optional && (
            <button
              onClick={skip}
              className="rounded-md border border-white/20 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10"
            >
              Skip
            </button>
          )}
          <button
            onClick={next}
            className="inline-flex items-center gap-1 rounded-md border border-[var(--gold)] bg-[var(--gold)] px-3 py-1.5 text-sm font-semibold text-black hover:opacity-95"
          >
            {idx + 1 < total ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}
