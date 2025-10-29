'use client';
import React from 'react';
import SafeProviders from '@/app/SafeProviders';
import { HashRouter, Routes, Route } from 'react-router-dom';
import BrandHeader from '@/components/layout/BrandHeader';
import MastheadPersonaToggle from '@/components/site/MastheadPersonaToggle';
import CTAStickyBar from '@/components/ui/CTAStickyBar';
import Discover from '@/pages/Discover';
import CatalogPage from '@/pages/landing/CatalogPage';
import FamilyHome from '@/pages/family/Home';
import MasterLanding from '@/pages/MasterLanding';
import DemoOfferLock from '@/pages/DemoOfferLock';
import DemoContract from '@/pages/DemoContract';
import DemoSettlement from '@/pages/DemoSettlement';
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <HelmetProvider>
      <SafeProviders>
        <HashRouter>
          <div className="min-h-screen bg-[#0B2239] text-white">
            <BrandHeader />
            <MastheadPersonaToggle />
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/family" element={<FamilyHome />} />
              <Route path="/family/home" element={<FamilyHome />} />
              <Route path="/start" element={<MasterLanding />} />
              <Route path="/demo/offerlock" element={<DemoOfferLock />} />
              <Route path="/demo/contract" element={<DemoContract />} />
              <Route path="/demo/settlement" element={<DemoSettlement />} />
              <Route path="*" element={<Discover />} />
            </Routes>
            <CTAStickyBar />
          </div>
        </HashRouter>
      </SafeProviders>
    </HelmetProvider>
  );
}
