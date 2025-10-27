/** Demo-safe network bootstrap; ensure it's always exported so main.tsx never fails */
export function setupNetworkErrorHandling(): void {
  if (typeof window === 'undefined') return;
  // no-op; keep light. Add real monitoring later if needed.
}
