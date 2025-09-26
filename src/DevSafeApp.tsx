'use client';
import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

// existing demo pages
import DemoOfferLock from './pages/DemoOfferLock';
import DemoContract from './pages/DemoContract';
import DemoSettlement from './pages/DemoSettlement';

// NEW: marketing route aggregator (UI-only)
import MarketingRoutes from '@/routes/MarketingRoutes';

export default function DevSafeApp() {
  return (
    <HashRouter>
      <div style={{maxWidth: 720, margin: '2rem auto', padding: 16}}>
        <header style={{marginBottom: 12}}>
          <Link to="/" style={{textDecoration:'none', fontWeight:700}}>Creator NIL Demo</Link>
          <span style={{color:'#777'}}> • HashRouter</span>
        </header>

        <Routes>
          {/* Marketing site (UI-only). This makes "/" render the Landing page. */}
          <Route path="/*" element={<MarketingRoutes />} />

          {/* Demo flows stay intact */}
          <Route path="/demo/offerlock" element={<DemoOfferLock />} />
          <Route path="/demo/contract" element={<DemoContract />} />
          <Route path="/demo/settlement" element={<DemoSettlement />} />

          {/* Fallback → OfferLock for convenience */}
          <Route path="*" element={<DemoOfferLock />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
