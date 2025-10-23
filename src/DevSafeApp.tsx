<<<<<<< HEAD
'use client';
import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
=======
import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import "./devsafe.css";

import SafeProviders from "@/app/SafeProviders";

// demo pages that already exist
>>>>>>> demo/offerlock-202509261311
import DemoOfferLock from './pages/DemoOfferLock';
import DemoContract from './pages/DemoContract';
import DemoSettlement from './pages/DemoSettlement';

<<<<<<< HEAD
export default function DevSafeApp() {
  return (
    <HashRouter>
      <div style={{ maxWidth: 720, margin: '2rem auto', padding: 16 }}>
        <header style={{ marginBottom: 12 }}>
          <Link to="/" style={{ textDecoration: 'none', fontWeight: 700 }}>Creator NIL Demo</Link>
          <span style={{ color: '#777' }}> • HashRouter</span>
        </header>
        <Routes>
          <Route path="/" element={
            <div>
              <p style={{ marginBottom: 12 }}>Welcome. Use the link below to open OfferLock.</p>
              <Link to="/demo/offerlock" style={{ padding: '8px 12px', border: '1px solid #333', borderRadius: 8 }}>
                Go to OfferLock →
              </Link>
            </div>
          } />
          <Route path="/demo/offerlock" element={<DemoOfferLock />} />
          <Route path="/demo/contract" element={<DemoContract />} />
          <Route path="/demo/settlement" element={<DemoSettlement />} />
          <Route path="*" element={<DemoOfferLock />} />
        </Routes>
      </div>
=======
// marketing routes
import MarketingRoutes from '@/routes/MarketingRoutes';

export default function DevSafeApp() {
  return (
    <HashRouter>
      <SafeProviders>
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

            {/* Fallback → OfferLock */}
            <Route path="*" element={<DemoOfferLock />} />
          </Routes>
        </div>
      </SafeProviders>
>>>>>>> demo/offerlock-202509261311
    </HashRouter>
  );
}
