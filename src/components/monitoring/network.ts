/**
 * Network monitoring bootstrap (demo-safe).
 * Exported symbol required by src/main.tsx.
 * Keep it lightweight: no heavy hooks at module init.
 */
export function setupNetworkErrorHandling(): void {
  // No-op default: prevents build errors and keeps demo snappy.
  // You can expand later with fetch/XHR interception or toast hooks.
  if (typeof window === 'undefined') return;

  // Example (disabled) fetch wrapper:
  // const origFetch = window.fetch;
  // window.fetch = async (...args: Parameters<typeof fetch>) => {
  //   try {
  //     const res = await origFetch(...args);
  //     if (!res.ok) console.warn('[net]', res.status, res.url);
  //     return res;
  //   } catch (err) {
  //     console.error('[net] fetch error', err);
  //     throw err;
  //   }
  // };
}
