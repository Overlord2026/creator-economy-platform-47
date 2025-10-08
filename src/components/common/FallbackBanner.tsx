import React from 'react';

interface FallbackBannerProps {
  active: boolean;
  table: string;
  className?: string;
}

export default function FallbackBanner({ active, table, className = '' }: FallbackBannerProps) {
  if (!active) return null;
  
  return (
    <aside className={`mb-3 rounded-md border border-yellow-400/40 bg-yellow-300/10 px-3 py-2 text-xs text-yellow-200 ${className}`}>
      This view is in <strong>fallback mode</strong>: optional table <code>{table}</code> is not available. Reads use demo fixtures; writes are disabled.
    </aside>
  );
}