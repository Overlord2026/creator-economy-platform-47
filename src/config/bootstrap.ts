// Bootstrap mode flag to disable backend calls during development
export const BOOTSTRAP_MODE = true;

// When BOOTSTRAP_MODE is true, all backend-dependent hooks return minimal UI-only stubs
// This prevents crashes from missing database tables and allows the UI to render