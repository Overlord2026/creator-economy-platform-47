import * as React from 'react';
import type { Badge } from '@/config/tiers';

export default function PricingBadge({ badge }: { badge?: Badge }) {
  if (!badge) return null;
  const tone = badge.tone ?? 'neutral';
  const base = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border';
  const tones: Record<string,string> = {
    success: 'bg-green-50 text-green-700 border-green-200',
    info:    'bg-blue-50 text-blue-700 border-blue-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    neutral: 'bg-slate-50 text-slate-700 border-slate-200',
  };
  return <span className={`${base} ${tones[tone]}`}>{badge.label}</span>;
}
