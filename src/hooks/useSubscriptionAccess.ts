'use client';
import * as React from 'react';
export function useSubscriptionAccess() {
  const [state,setState]=React.useState<{plan?:string;features?:string[]}>({});
  React.useEffect(()=>{ let off=false; (async()=>{ if(!off) setState({plan:'bootstrap',features:[]}); })(); return ()=>{off=true};},[]);
  const has = React.useCallback((f:string)=>!!state.features?.includes(f),[state.features]);
  return { ...state, has };
}
