import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export type NextItem = { id: string; label: string; to: string };

export default function WhatsNextChecklist({
  storageKeyPrefix,
  items,
  title = "What’s next",
}: {
  storageKeyPrefix: string;
  items: NextItem[];
  title?: string;
}) {
  const [done, setDone] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const init: Record<string, boolean> = {};
    items.forEach((i) => {
      const k = `${storageKeyPrefix}:${i.id}`;
      init[i.id] = localStorage.getItem(k) === "1";
    });
    setDone(init);
  }, [items, storageKeyPrefix]);

  const toggle = (id: string) => {
    const k = `${storageKeyPrefix}:${id}`;
    setDone((prev) => {
      const v = !prev[id];
      try { localStorage.setItem(k, v ? "1" : "0"); } catch {}
      return { ...prev, [id]: v };
    });
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-2 text-base font-semibold text-white">{title}</div>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.id} className="flex items-center justify-between gap-3">
            <button
              onClick={() => toggle(i.id)}
              className={`inline-flex h-5 w-5 items-center justify-center rounded border ${
                done[i.id] ? "bg-[var(--gold)] border-[var(--gold)]" : "border-white/30"
              }`}
              aria-pressed={done[i.id] ? "true" : "false"}
              aria-label={done[i.id] ? "Done" : "Mark done"}
              title={done[i.id] ? "Done" : "Mark done"}
            >
              {done[i.id] && <Check className="h-3 w-3 text-black" />}
            </button>
            <div className="flex-1 text-sm text-white/80">{i.label}</div>
            <Link
              to={i.to}
              className="rounded-md border border-white/20 px-2 py-1 text-xs text-white/80 hover:bg-white/10"
            >
              Open
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
