'use client';
import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import DemoOfferLock from './pages/DemoOfferLock';
import DemoContract from './pages/DemoContract';
import DemoSettlement from './pages/DemoSettlement';

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
    </HashRouter>
  );
}
