import { useEffect, useState } from 'react';
export function useAsyncMemo<T>(fn: () => Promise<T>, deps: any[], initial: T) {
  const [val, setVal] = useState<T>(initial);
  useEffect(() => { let m=true; fn().then(v=>{ if(m) setVal(v); }); return ()=>{m=false}; }, deps);
  return val;
}
