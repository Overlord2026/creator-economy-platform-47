import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

// best-effort network bootstrap (safe if missing)
try {
  const mod = require('@/components/monitoring/network');
  if (mod && typeof mod.setupNetworkErrorHandling === 'function') {
    mod.setupNetworkErrorHandling();
  }
} catch (_) { /* no-op */ }

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element #root missing');
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
