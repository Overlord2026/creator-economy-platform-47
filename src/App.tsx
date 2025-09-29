'use client';
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

// Safe bootstrap wrapper (skips heavy providers while BOOTSTRAP_MODE === true)
import SafeProviders from "@/app/SafeProviders";

// Marketing routes (landing, personas, pros, discover, etc.)
import MarketingRoutes from "@/routes/MarketingRoutes";

// Demo flows still available
import DemoOfferLock from "@/pages/DemoOfferLock";
import DemoContract from "@/pages/DemoContract";
import DemoSettlement from "@/pages/DemoSettlement";

export default function App() {
  return (
    <HashRouter>
      <SafeProviders>
        <Routes>
          {/* Marketing site as the root */}
          <Route path="/*" element={<MarketingRoutes />} />

          {/* Demo rail (deep links keep working in both Lovable & Codespaces) */}
          <Route path="/demo/offerlock" element={<DemoOfferLock />} />
          <Route path="/demo/contract" element={<DemoContract />} />
          <Route path="/demo/settlement" element={<DemoSettlement />} />

          {/* Fallback */}
          <Route path="*" element={<MarketingRoutes />} />
        </Routes>
      </SafeProviders>
    </HashRouter>
  );
}
