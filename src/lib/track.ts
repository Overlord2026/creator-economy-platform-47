export function track(event: string, data?: Record<string, any>) {
  console.log('[Analytics]', event, data);
  // TODO: wire to PostHog or your analytics provider
}
