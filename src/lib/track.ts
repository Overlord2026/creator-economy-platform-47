export function track(event: string, props?: Record<string, unknown>) {
  // wire to your analytics later
  if (typeof window !== 'undefined' && (window as any).DEBUG_TRACK) {
    console.log('[track]', event, props||{});
  }
}
