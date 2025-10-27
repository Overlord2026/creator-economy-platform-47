import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setupNetworkErrorHandling } from '@/components/monitoring/network';

setupNework();

function setupNework() {
  try { setupNetworkErrorHandling(); } catch (_e) {}
}

const el = document.getElementById('root');
if (!el) throw new Error('Missing #root');

ReactDOM.createRoot(el).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
