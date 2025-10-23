<<<<<<< HEAD
import { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from 'react-helmet-async';
import '@/styles/brand.css';
import { TopBanner } from '@/components/layout/TopBanner';
import BrandHeader from '@/components/layout/BrandHeader';
import { ConditionalMegaMenu } from '@/components/nav/ConditionalMegaMenu';
import { RedirectHandler } from '@/components/RedirectHandler';
import { ToolsProvider } from '@/contexts/ToolsContext';
import { Toaster } from '@/components/ui/toaster';
import DevPanel from '@/components/dev/DevPanel';
import { AutoLoadDemo } from '@/components/AutoLoadDemo';
import { DemoStatus } from '@/components/DemoStatus';
import CTAStickyBar from '@/components/ui/CTAStickyBar';
import { SecondaryNav } from '@/components/layout/SecondaryNav';
import NILOnboarding from '@/pages/nil/Onboarding';
import Education from '@/pages/nil/Education';
import Search from '@/pages/nil/Search';
import Goals from '@/pages/nil/Goals';
import Disclosures from '@/pages/nil/Disclosures';
import Offers from '@/pages/nil/Offers';
import Marketplace from '@/pages/nil/Marketplace';
import Contract from '@/pages/nil/Contract';
import Payments from '@/pages/nil/Payments';
import Disputes from '@/pages/nil/Disputes';
import Receipts from '@/pages/nil/Receipts';
import NILIndex from '@/pages/nil/index';
import Admin from '@/pages/nil/Admin';
import NilReadyCheckPage from '@/pages/nil/admin/NilReadyCheckPage';
import ReceiptsListPage from '@/pages/ReceiptsListPage';
import ReceiptDetailPage from '@/pages/ReceiptDetailPage';
import SamplesPage from '@/pages/SamplesPage';
import Pricing from '@/pages/Pricing';
import DemoOfferLock from './pages/DemoOfferLock';
import DemoContract from './pages/DemoContract';
import DemoSettlement from './pages/DemoSettlement';
=======
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import SafeProviders from "@/app/SafeProviders";
>>>>>>> demo/offerlock-202509261311

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

<<<<<<< HEAD
            {/* Admin Routes - Flag Protected */}
            {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/qa-coverage" element={<QACoverage />} />}
            {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/ready-check" element={<ReadyCheck />} />}
            {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/ready-check-enhanced" element={<ReadyCheckEnhanced />} />}
            {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/rules-coverage" element={<RulesCoverage />} />}
            {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/rules-import" element={<RulesImport />} />}
            {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/rules-export" element={<RulesExport />} />}
            {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/rules-replace-county" element={<RulesReplaceCounty />} />}
            {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/rules-replace-states" element={<RulesReplaceStates />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/county-add" element={<CountyQuickAdd />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/estate/county-meta" element={<CountyMetaEditor />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/estate/demo" element={<EstateRonDemo />} />}
              {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/rulesync" element={<RuleSyncAdmin />} />}
              {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin" element={<AdminPanel />} />}
              {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/hq" element={<HQDashboard />} />}
              {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/hq/ip" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <IPLedgerPage />
                </Suspense>
              } />}
              {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/jobs" element={<JobsPanel />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/publish" element={<PublishIndex />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/release" element={<Release />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/env" element={<EnvInspector />} />}
            {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/ai/audit" element={<AiAudit />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/k401/partner" element={<K401Partner />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/k401/checklist" element={<K401ChecklistRunner />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/k401/forms" element={<K401FormsAdmin />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/k401/providers/search" element={<K401ProviderRulesSearch />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/k401/cma" element={<K401CMAUploader />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/k401/compliance-pack" element={<K401CompliancePack />} />}
             
              {/* Broker Routes */}
              <Route path="/broker/roi" element={<div>ROI Calculator Coming Soon</div>} />
             <Route path="/broker/kit" element={<BrokerKit />} />
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/anchors" element={<AnchorList />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/receipt/:id" element={<ReceiptView />} />}
             <Route
               path="/admin/receipts"
               element={
                 <PersonaGuard allowedPersonas={["admin","system_administrator","tenant_admin"]}>
                   <ReceiptsConsole />
                 </PersonaGuard>
               }
             />
              <Route
                path="/admin/rulesync"
                element={
                  <PersonaGuard allowedPersonas={["admin","system_administrator","tenant_admin"]}>
                    <RuleSyncConsole />
                  </PersonaGuard>
                }
              />
          <Route
            path="/admin/401k"
            element={
              <PersonaGuard allowedPersonas={["admin","system_administrator","tenant_admin"]}>
                <Control401k />
              </PersonaGuard>
            }
          />
          <Route
            path="/admin/evidence"
            element={
              <PersonaGuard allowedPersonas={["admin","system_administrator","tenant_admin"]}>
                <Evidence />
              </PersonaGuard>
            }
          />
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/receipts" element={
               <Suspense fallback={<div>Loading...</div>}>
                 <ReceiptsAdmin />
               </Suspense>
             } />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/trust-anchors" element={<TrustAnchors />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/sites" element={<SitesAdmin />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/revenue" element={<RevenueAdmin />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/automations" element={<AutomationsAdmin />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/transition/:id" element={<TransitionDetail />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/diligence" element={<DiligenceAdmin />} />}
             {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/migration-invite" element={<MigrationHubInvite />} />}
               {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/migration-queue" element={<MigrationQueueAdmin />} />}
               {getFlag('ADMIN_TOOLS_ENABLED') && <Route
                 path="/admin/canon"
                 element={
                   <Suspense fallback={<div />}>
                     <CanonTest />
                   </Suspense>
                 }
                />}
               {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/db/migrations" element={<DbMigrations />} />}
               {getFlag('ADMIN_TOOLS_ENABLED') && <Route path="/admin/migration" element={<MigrationHub />} />}
               
                {/* Public Health Check Route */}
                {getFlag('HEALTH_PUBLIC') && <Route path="/__health" element={<HealthCheck />} />}
            
            {/* Demo Routes */}
            {getFlag('DEMOS_ENABLED') && (
              <Route path="/demos/:persona" element={
                <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading demo...</div>}>
                  <DemoPage />
                </Suspense>
              } />
            )}
            
            {/* Contact Routes */}
            <Route path="/contact/schedule" element={
              <Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
                <ContactSchedulePage />
              </Suspense>
            } />
            <Route path="/contact/message" element={
              <Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
                <ContactMessagePage />
              </Suspense>
            } />
            
            {/* Dev Routes */}
            {process.env.NODE_ENV !== 'production' && (
              <>
                <Route path="/dev/fixtures" element={<FixturesPanel />} />
                <Route path="/dev/try" element={<DevTryPage />} />
              </>
            )}
            
            {/* Dev Tools */}
            <Route path="/dev/try" element={<DevTryPage />} />
            
            {/* Preview Routes - Marketing pages for missing tools */}
            <Route path="/preview/:key" element={
              <Suspense fallback={<div className="flex items-center justify-center h-64">Loading preview...</div>}>
                <PreviewPage />
              </Suspense>
            } />
            
            {/* Stub Routes - Prevent 404s */}
            <Route path="/contact/schedule" element={<Stub title="Schedule a Meeting" />} />
            <Route path="/contact/message" element={<Stub title="Send a Message" />} />
            <Route path="/marketplace/advisors" element={<Stub title="Find Advisors" />} />
            <Route path="/marketplace/cpa" element={<CPAIndex />} />
            <Route path="/marketplace/cpa/:id" element={<CPADetail />} />
            <Route path="/marketplace/cpas" element={<Stub title="Find CPAs" />} />
            <Route path="/marketplace/insurance" element={<Stub title="Insurance Solutions" />} />
            <Route path="/tools/retirement-roadmap" element={<Stub title="Retirement Roadmap Tool" />} />
            <Route path="/tools/tax-projection" element={<Stub title="Tax Projection Tool" />} />
            <Route path="/tools/estate-planning" element={<Stub title="Estate Planning Tool" />} />
            <Route path="/vault" element={<Stub title="Secure Document Vault" />} />
            {/* Goals route moved to main routes section */}
            <Route path="/discover" element={<Stub title="Discover Solutions" />} />
            <Route path="/diag/canonical" element={<CanonicalExports />} />
            <Route path="/react-diag" element={<ReactDiag />} />
            
            {/* NotFound Route */}
            <Route path="*" element={<NotFound />} />
          
      <Route path="/demo/offerlock" element={<DemoOfferLock/>} />
      <Route path="/demo/contract" element={<DemoContract/>} />
      <Route path="/demo/settlement" element={<DemoSettlement/>} />
      </Routes>
          
          <Toaster />
          <DevPanel />
          <AutoLoadDemo />
          
          
           {/* Show CTA bar on public pages only - Flag Protected */}
           {!isAuthenticated && getFlag('PUBLIC_CTA_BAR') && <CTAStickyBar />}
           </div>
          </div>
        </ThemeProvider>
      </HelmetProvider>
    </ToolsProvider>
=======
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
>>>>>>> demo/offerlock-202509261311
  );
}
