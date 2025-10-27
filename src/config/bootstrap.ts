export const isLovableHost =
  typeof window !== 'undefined' && /\.lovableproject\.com$/i.test(window.location.hostname);

export const BOOTSTRAP_MODE =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BOOTSTRAP_MODE === 'true')
  || !!isLobbyPreview()
  || false;

function isLobbyPreview(): boolean {
  const h = typeof window !== 'undefined' ? window.location.hostname : '';
  return /(?:-pr-|\blovableproject\.com$)/.test(h);
}
