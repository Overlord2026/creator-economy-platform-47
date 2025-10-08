import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import SafeProviders from "@/app/SafeProviders";

import MarketingLayout from "@/routes/MarketingLayout";
import PricingPage from "@/pages/Pricing";
import Healthz from "@/routes/healthz";

import DemoOfferLock from "@/pages/DemoOfferLock";
import DemoContract from "@/pages/DemoContract";
import DemoSettlement from "@/pages/DemoSettlement";

export default function App() {
  return (
    <HashRouter>
      <SafeProviders>
        <Routes>
          {/* Make marketing the parent at "/" (no /* here) */}
          <Route path="/" element={<MarketingLayout />}>
            {/* Default landing under "/" (replace with your real landing) */}
            <Route index element={<div style={{padding:24}}>Landing</div>} />
            {/* If you have /about, /contact, add them here as children */}
          </Route>

          {/* Specific routes now always win */}
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/healthz" element={<Healthz />} />

          {/* Demo rail */}
          <Route path="/demo/offerlock" element={<DemoOfferLock />} />
          <Route path="/demo/contract" element={<DemoContract />} />
          <Route path="/demo/settlement" element={<DemoSettlement />} />

          {/* 404 fallback last */}
          <Route path="*" element={<MarketingLayout />} />
        </Routes>
      </SafeProviders>
    </HashRouter>
  );
}
