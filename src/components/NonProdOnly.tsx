import * as React from 'react';
const MODE = (import.meta.env.PUBLIC_MODE as string) || 'staging';
export default function NonProdOnly({ children }: { children: React.ReactNode }) {
  return MODE === 'prod' ? null : <>{children}</>;
}
