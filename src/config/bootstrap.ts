export const isLovableHost =
  typeof window !== 'undefined' && /\.lovableproject\.com$/i.test(window.location.hostname);

// You can also force this with VITE_BOOTSTRAP_MODE=true if needed.
export const BOOTSTRAP_MODE = isLovableHost || import.meta.env.VITE_BOOTSTRAP_MODE === 'true';
