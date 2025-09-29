'use client';
type EventPayload = { name: string; props?: Record<string, any> };
export function useEventTracking() {
  function track(_evt: EventPayload) { /* no-op while bootstrapping */ }
  return { track };
}
export default useEventTracking;
