'use client';
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import SafeProviders from '@/app/SafeProviders';
import { BOOTSTRAP_MODE } from '@/config/bootstrap';

// UI pages
import LandingPage from '@/pages/marketing/LandingPage';
import PersonasPage from '@/pages/marketing/PersonasPage';
import ProsPage from '@/pages/marketing/ProsPage';
import ProsDetailPage from '@/pages/marketing/ProsDetailPage';
import ConnectionsPage from '@/pages/marketing/ConnectionsPage';
import WhyReceiptsPage from '@/pages/marketing/WhyReceiptsPage';

// Demo flows (already exist)
import DemoOfferLock from '@/pages/DemoOfferLock';
import DemoContract from '@/pages/DemoContract';
import DemoSettlement from '@/pages/DemoSettlement';

// New dashboard stub
import DashboardPage from '@/pages/app/DashboardPage';

// Optional dev CSS
try { require('./devsafe.css'); } catch {}

export default function App() {
  return (
    <SafeProviders>
      <HashRouter>
        <Routes>
          {/* Public marketing */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/personas" element={<div className="bg-[#0b1a2b] min-h-screen text-white"><PersonasPage /></div>} />
          <Route path="/pros" element={<div className="bg-[#0b1a2b] min-h-screen text-white"><ProsPage /></div>} />
          <Route path="/pros/:id" element={<div className="bg-[#0b1a2b] min-h-screen text-white"><ProsDetailPage /></div>} />
          <Route path="/connections" element={<div className="bg-[#0b1a2b] min-h-screen text-white"><ConnectionsPage /></div>} />
          <Route path="/why-receipts" element={<div className="bg-[#0b1a2b] min-h-screen text-white"><WhyReceiptsPage /></div>} />

          {/* Public demo */}
          <Route path="/demo/offerlock" element={<DemoOfferLock />} />
          <Route path="/demo/contract" element={<DemoContract />} />
          <Route path="/demo/settlement" element={<DemoSettlement />} />

          {/* App area (can be auth-gated later) */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Fallback */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
