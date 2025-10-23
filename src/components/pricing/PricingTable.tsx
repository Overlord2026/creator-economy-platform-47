import * as React from 'react';
import { TIERS, BADGES, type Tier } from '@/config/tiers';
import PricingBadge from './PricingBadge';

function Card({ tier }: { tier: Tier }) {
  const badge = BADGES.find(b => b.id === tier.id);
  return (
    <div className="rounded-2xl border p-6 shadow-sm bg-white">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{tier.name}</h3>
        <PricingBadge badge={badge} />
      </div>
      <div className="mt-2 text-2xl font-bold">{tier.price}</div>
      {tier.blurb && <p className="mt-1 text-sm text-slate-600">{tier.blurb}</p>}
      <ul className="mt-4 space-y-2 text-sm">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {tier.cta && (
        <a
          href={tier.cta.href}
          className="mt-5 inline-flex items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium hover:bg-slate-50 w-full"
        >
          {tier.cta.label}
        </a>
      )}
    </div>
  );
}

export default function PricingTable() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <header className="mb-6">
        <h2 className="text-2xl font-bold">Plans</h2>
        <p className="text-sm text-slate-600">Simple pricing to get moving fast.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {TIERS.map(t => <Card key={t.id} tier={t} />)}
      </div>
    </div>
  );
}
