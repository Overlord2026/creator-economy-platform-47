type EventPayload = { name: string; props?: Record<string, any> };
export function useEventTracking() {
  function track(_evt: EventPayload) { /* no-op while bootstrapping */ }
  function trackFeatureUsed(_feature: string, _props?: Record<string, any>) { /* no-op */ }
  function trackEvent(_name: string, _props?: Record<string, any>) { /* no-op - alias for track */ }
  return { track, trackFeatureUsed, trackEvent };
}
export default useEventTracking;
