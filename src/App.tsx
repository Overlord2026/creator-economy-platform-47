'use client';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SafeProviders from '@/app/SafeProviders';

// Marketing pages
import LandingPage from '@/pages/marketing/LandingPage';
import PersonasPage from '@/pages/marketing/PersonasPage';
import ProsPage from '@/pages/marketing/ProsPage';
import ProsDetailPage from '@/pages/marketing/ProsDetailPage';
import ConnectionsPage from '@/pages/marketing/ConnectionsPage';
import WhyReceiptsPage from '@/pages/marketing/WhyReceiptsPage';

// Demo flows
import DemoOfferLock from '@/pages/DemoOfferLock';
import DemoContract from '@/pages/DemoContract';
import DemoSettlement from '@/pages/DemoSettlement';

// Dashboard stub (if you added it)
import DashboardPage from '@/pages/app/DashboardPage';

export default function App() {
  return (
    <SafeProviders>
      <BrowserRouter>
        <div className="min-h-screen bg-[#0B2239] text-white">
          <Routes>
            {/* Marketing routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/nil" element={<LandingPage />} />
            <Route path="/personas" element={<PersonasPage />} />
            <Route path="/pros" element={<ProsPage />} />
            <Route path="/pros/:id" element={<ProsDetailPage />} />
            <Route path="/connections" element={<ConnectionsPage />} />
            <Route path="/why-receipts" element={<WhyReceiptsPage />} />

            {/* Demo routes */}
            <Route path="/demo/offerlock" element={<DemoOfferLock />} />
            <Route path="/demo/contract" element={<DemoContract />} />
            <Route path="/demo/settlement" element={<DemoSettlement />} />

            {/* App area */}
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Fallback */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SafeProviders>
  );
}
