// Demo-safe network bootstrap (no heavy work at module init)
export function setupNetworkErrorHandling(): void {
  if (typeof window === 'undefined') return;
  // no-op by default
}
