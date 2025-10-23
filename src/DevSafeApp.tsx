import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import "./devsafe.css";

import SafeProviders from "@/app/SafeProviders";

// demo pages that already exist
import DemoOfferLock from './pages/DemoOfferLock';
import DemoContract from './pages/DemoContract';
import DemoSettlement from './pages/DemoSettlement';

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
    </HashRouter>
  );
}
