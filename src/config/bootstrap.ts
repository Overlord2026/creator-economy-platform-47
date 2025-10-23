<<<<<<< HEAD
export const BOOTSTRAP_MODE = true; // flip to false when reconnecting real providers
=======
export const isLovableHost =
  typeof window !== 'undefined' && /\.lovableproject\.com$/i.test(window.location.hostname);

// You can also force this with VITE_BOOTSTRAP_MODE=true if needed.
export const BOOTSTRAP_MODE = isLovableHost || import.meta.env.VITE_BOOTSTRAP_MODE === 'true';
>>>>>>> demo/offerlock-202509261311
