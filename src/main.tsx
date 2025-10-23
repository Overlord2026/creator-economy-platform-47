import React from 'react';
import ReactDOM from 'react-dom/client';
import DevSafeApp from './DevSafeApp';

try {
  const mod = require('@/components/monitoring/network');
  if (mod && typeof mod.setupNetworkErrorHandling === 'function') {
    mod.setupNetworkErrorHandling();
  }
} catch (_){}

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root missing');

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <DevSafeApp />
  </React.StrictMode>
);
