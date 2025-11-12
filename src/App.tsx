'use client';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SafeProviders from '@/app/SafeProviders';
import DealsList from '@/pages/deals/DealsList';
import DealDetail from '@/pages/deals/DealDetail';

// Marketing pages
import LandingPage from '@/pages/marketing/LandingPage';
import PersonasPage from '@/pages/marketing/PersonasPage';
import ProsPage from '@/pages/marketing/ProsPage';
import ProsDetailPage from '@/pages/marketing/ProsDetailPage';
import ConnectionsPage from '@/pages/marketing/ConnectionsPage';
import WhyReceiptsPage from '@/pages/marketing/WhyReceiptsPage';

// Athlete pages
import AthletesPage from '@/pages/marketing/AthletesPage';
import AthletesVerifiedPage from '@/pages/marketing/AthletesVerifiedPage';
import AthletesBrandKitPage from '@/pages/marketing/AthletesBrandKitPage';

// Brand pages
import BrandsPage from '@/pages/marketing/BrandsPage';
import BrandsBriefsNewPage from '@/pages/marketing/BrandsBriefsNewPage';
import BrandsSolutionsPage from '@/pages/marketing/BrandsSolutionsPage';

// Solution pages
import SolutionsIndexPage from '@/pages/marketing/SolutionsIndexPage';

// Resource pages
import ResourcesGuidesPage from '@/pages/marketing/ResourcesGuidesPage';
import ResourcesRulesPage from '@/pages/marketing/ResourcesRulesPage';
import BlogPage from '@/pages/marketing/BlogPage';
import HelpPage from '@/pages/marketing/HelpPage';

// Customer/social proof
import CustomersPage from '@/pages/marketing/CustomersPage';

// Demo flows
import DemoOfferLock from '@/pages/DemoOfferLock';
import DemoContract from '@/pages/DemoContract';
import DemoSettlement from '@/pages/DemoSettlement';

// Dashboard stub (if you added it)
import DashboardPage from '@/pages/app/DashboardPage';

// Persona routing and onboarding
import { PersonaRedirect } from '@/components/PersonaRedirect';
import FamiliesPage from '@/pages/FamiliesPage';
import OnboardingPage from '@/pages/OnboardingPage';

export default function App() {
  return (
    <SafeProviders>
      <BrowserRouter>
        <div className="min-h-screen bg-[#0B2239] text-white">
          <Routes>
            {/* Marketing and persona routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/nil" element={<LandingPage />} />
            <Route path="/personas" element={<PersonasPage />} />
            <Route path="/families" element={<FamiliesPage />} />
            <Route path="/families/:segment" element={<FamiliesPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/pros" element={<ProsPage />} />
            <Route path="/pros/:id" element={<ProsDetailPage />} />
            <Route path="/connections" element={<ConnectionsPage />} />
            <Route path="/why-receipts" element={<WhyReceiptsPage />} />

            {/* Athlete routes */}
            <Route path="/athletes" element={<AthletesPage />} />
            <Route path="/athletes/verified" element={<AthletesVerifiedPage />} />
            <Route path="/athletes/brand-kit" element={<AthletesBrandKitPage />} />

            {/* Brand routes */}
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/brands/briefs/new" element={<BrandsBriefsNewPage />} />
            <Route path="/brands/solutions" element={<BrandsSolutionsPage />} />

            {/* Solutions routes */}
            <Route path="/solutions" element={<SolutionsIndexPage />} />

            {/* Resource routes */}
            <Route path="/resources/guides" element={<ResourcesGuidesPage />} />
            <Route path="/resources/rules" element={<ResourcesRulesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/help" element={<HelpPage />} />

            {/* Customer/social proof */}
            <Route path="/customers" element={<CustomersPage />} />

            {/* Demo routes */}
            <Route path="/demo/offerlock" element={<DemoOfferLock />} />
            <Route path="/demo/contract" element={<DemoContract />} />
            <Route path="/demo/settlement" element={<DemoSettlement />} />

            {/* App area */}
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Deals */}
            <Route path="/deals" element={<DealsList />} />
            <Route path="/deals/:id" element={<DealDetail />} />

            {/* Fallback */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SafeProviders>
  );
}
