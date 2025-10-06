'use client';
import * as React from 'react';

export function useSubscriptionAccess() {
  const [state, setState] = React.useState<{ plan?: string; features?: string[] }>({});

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      // TODO: replace with real entitlement fetch
      if (!cancelled) setState({ plan: 'bootstrap', features: [] });
    })();
    return () => { cancelled = true; };
  }, []);

  const has = React.useCallback((feature: string) => !!state.features?.includes(feature), [state.features]);
  return { ...state, has };
}
