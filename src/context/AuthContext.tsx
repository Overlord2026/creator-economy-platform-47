import * as React from 'react';

export type AuthValue = { user: any; loading: boolean; error?: any; session?: any };

// Keep module import side-effect free
const Ctx = React.createContext<AuthValue>({ user: null, loading: false });
export const useAuth = () => React.useContext(Ctx);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  // Inert on import — no window/network/storage here
  const mountedRef = React.useRef(false);
  const [, force] = React.useReducer((x) => x + 1, 0);
  React.useEffect(() => { mountedRef.current = true; force(); }, []);

  const value = React.useMemo<AuthValue>(() => ({ user: null, loading: false }), []);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
