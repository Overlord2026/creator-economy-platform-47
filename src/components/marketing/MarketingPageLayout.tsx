import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import PersonaChooserModal from './PersonaChooserModal';

const NAVY = "#0B2239";
const GOLD = "#D4AF37";

// Analytics tracking helper
const trackEvent = (eventType: string, data: Record<string, any>) => {
  console.log(`[Analytics] ${eventType}:`, data);
  if (typeof window !== 'undefined' && (window as any).posthog) {
    (window as any).posthog.capture(eventType, data);
  }
};

interface MarketingPageLayoutProps {
  children: React.ReactNode;
}

export default function MarketingPageLayout({ children }: MarketingPageLayoutProps) {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: NAVY }}>
      <style>{`:root{--gold:${GOLD}}`}</style>
      <StickyHeader />
      <AnnouncementBar />
      {children}
      <Footer />
    </div>
  );
}

function StickyHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [athletesDropdownOpen, setAthletesDropdownOpen] = useState(false);
  const [brandsDropdownOpen, setBrandsDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    trackEvent('nav_click', { item: 'logo', destination: '/' });
  };

  const handleGetStartedClick = () => {
    trackEvent('cta_click', { id: 'get_started', location: 'header' });
    setShowPersonaModal(true);
  };

  const handlePersonaChoose = (persona: string) => {
    trackEvent('cta_click', { id: 'get_started', persona });
    navigate(`/onboarding?persona=${persona}`);
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b border-white/5 bg-black/95 backdrop-blur-sm"
        role="banner"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 focus:ring-offset-black rounded"
            aria-label="Creator NIL Platform — Home"
          >
            <span
              className="text-xl font-bold text-[var(--gold)] tracking-wide"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Creator NIL Platform
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-[15px] lg:flex" aria-label="Main navigation">
            <DropdownNav
              label="For Athletes"
              isOpen={athletesDropdownOpen}
              onToggle={() => setAthletesDropdownOpen(!athletesDropdownOpen)}
              items={[
                { label: 'Overview', href: '/athletes', group: 'athletes' },
                { label: 'Get Verified (NIL training)', href: '/athletes/verified', group: 'athletes' },
                { label: 'OfferLock Demo', href: '/demo/offerlock?persona=creator', group: 'athletes' },
                { label: 'Build Brand Kit', href: '/athletes/brand-kit', group: 'athletes' },
                { separator: true },
                { label: 'High School', href: '/onboarding?persona=creator&level=hs', group: 'athletes' },
                { label: 'College', href: '/onboarding?persona=creator&level=college', group: 'athletes' },
                { label: 'Pro', href: '/onboarding?persona=creator&level=pro', group: 'athletes' },
              ]}
              cta={{ label: 'Start free workspace', href: '/onboarding?persona=creator', group: 'athletes' }}
            />

            <DropdownNav
              label="For Brands"
              isOpen={brandsDropdownOpen}
              onToggle={() => setBrandsDropdownOpen(!brandsDropdownOpen)}
              items={[
                { label: 'Overview', href: '/brands', group: 'brands' },
                { label: 'Post a Brief', href: '/brands/briefs/new', group: 'brands' },
                { label: 'Campaign Solutions', href: '/brands/solutions', group: 'brands' },
                { label: 'Approvals & FTC', href: '/solutions#disclosures', group: 'brands' },
                { label: 'Receipts & Reporting', href: '/why-receipts', group: 'brands' },
              ]}
              cta={{ label: 'Create brand workspace', href: '/onboarding?persona=pro', group: 'brands' }}
            />

            <a
              href="/solutions"
              onClick={() => trackEvent('nav_click', { group: 'solutions' })}
              className="text-white hover:text-[var(--gold)] transition-colors font-medium"
            >
              Solutions
            </a>

            <DropdownNav
              label="Resources"
              isOpen={resourcesDropdownOpen}
              onToggle={() => setResourcesDropdownOpen(!resourcesDropdownOpen)}
              items={[
                { label: 'Guides & Playbooks', href: '/resources/guides', group: 'resources' },
                { label: 'NIL Rules by State/School', href: '/resources/rules', group: 'resources' },
                { label: 'Blog', href: '/blog', group: 'resources' },
                { label: 'Help Center / FAQ', href: '/help', group: 'resources' },
              ]}
            />

            <a
              href="/#pricing"
              onClick={() => trackEvent('nav_click', { group: 'pricing' })}
              className="text-white hover:text-[var(--gold)] transition-colors font-medium"
            >
              Pricing
            </a>
          </nav>

          <div className="hidden lg:flex">
            <button
              onClick={handleGetStartedClick}
              className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-6 py-2.5 text-[15px] font-semibold text-black shadow-lg hover:bg-[#FFC700] transition-all hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 focus:ring-offset-black"
            >
              Get Started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[var(--gold)] transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 lg:hidden" role="dialog" aria-modal="true">
          <nav className="flex flex-col gap-1 p-6 pt-20">
            <MobileNavLink href="/athletes" onClick={() => { trackEvent('nav_click', { group: 'athletes' }); setMobileMenuOpen(false); }}>
              For Athletes
            </MobileNavLink>
            <MobileNavLink href="/brands" onClick={() => { trackEvent('nav_click', { group: 'brands' }); setMobileMenuOpen(false); }}>
              For Brands
            </MobileNavLink>
            <MobileNavLink href="/solutions" onClick={() => { trackEvent('nav_click', { group: 'solutions' }); setMobileMenuOpen(false); }}>
              Solutions
            </MobileNavLink>
            <MobileNavLink href="/resources/guides" onClick={() => { trackEvent('nav_click', { group: 'resources' }); setMobileMenuOpen(false); }}>
              Resources
            </MobileNavLink>
            <MobileNavLink href="/#pricing" onClick={() => { trackEvent('nav_click', { group: 'pricing' }); setMobileMenuOpen(false); }}>
              Pricing
            </MobileNavLink>

            <div className="mt-6 pt-6 border-t border-white/10">
              <button
                onClick={() => { setMobileMenuOpen(false); handleGetStartedClick(); }}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#FFD700] px-6 py-3 text-base font-semibold text-black shadow-lg"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      )}

      <PersonaChooserModal
        isOpen={showPersonaModal}
        onClose={() => setShowPersonaModal(false)}
        onChoose={handlePersonaChoose}
      />
    </>
  );
}

interface DropdownNavItem {
  label: string;
  href: string;
  group: string;
  separator?: boolean;
}

interface DropdownNavProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  items: (DropdownNavItem | { separator: true })[];
  cta?: { label: string; href: string; group: string };
}

function DropdownNav({ label, isOpen, onToggle, items, cta }: DropdownNavProps) {
  return (
    <div className="relative" onMouseLeave={() => setTimeout(() => onToggle(), 100)}>
      <button
        onClick={onToggle}
        onMouseEnter={onToggle}
        className="flex items-center gap-1 text-white hover:text-[var(--gold)] transition-colors font-medium"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 rounded-lg border border-white/10 bg-black/95 backdrop-blur-sm shadow-2xl py-2">
          {items.map((item, idx) => {
            if ('separator' in item && item.separator) {
              return <div key={idx} className="my-2 border-t border-white/10" />;
            }
            const navItem = item as DropdownNavItem;
            return (
              <a
                key={idx}
                href={navItem.href}
                onClick={() => trackEvent('nav_click', { group: navItem.group, item: navItem.label })}
                className="block px-4 py-2 text-sm text-white hover:text-[var(--gold)] hover:bg-white/5 transition-colors"
              >
                {navItem.label}
              </a>
            );
          })}
          {cta && (
            <>
              <div className="my-2 border-t border-white/10" />
              <a
                href={cta.href}
                onClick={() => trackEvent('nav_click', { group: cta.group, item: cta.label, cta: true })}
                className="block mx-2 px-4 py-2 text-sm text-center font-semibold rounded-lg bg-[var(--gold)] text-black hover:bg-[var(--gold)]/90 transition-colors"
              >
                {cta.label}
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex items-center justify-between px-4 py-3 text-lg text-white hover:text-[var(--gold)] hover:bg-white/5 rounded-lg transition-all"
    >
      {children}
      <ChevronRight className="h-5 w-5" />
    </a>
  );
}

function AnnouncementBar() {
  return (
    <div className="border-b border-white/5 bg-black/90">
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 text-sm flex-wrap">
          <a
            href="/solutions#compliance"
            onClick={() => trackEvent('banner_click', { slot: 'left' })}
            className="text-[var(--gold)] font-semibold hover:underline"
          >
            🔒 NIL Compliance Made Simple
          </a>
          <span className="text-white/40 hidden sm:inline">•</span>
          <a
            href="/customers"
            onClick={() => trackEvent('banner_click', { slot: 'right' })}
            className="text-white/80 hover:text-[var(--gold)] hover:underline"
          >
            Trusted by 500+ Athletes
          </a>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--gold)] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Creator NIL Platform
            </h3>
            <p className="text-sm text-white/60">
              Deals and projects, minus the drama.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">For Athletes</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="/athletes" className="hover:text-[var(--gold)]">Overview</a></li>
              <li><a href="/athletes/verified" className="hover:text-[var(--gold)]">Get Verified</a></li>
              <li><a href="/athletes/brand-kit" className="hover:text-[var(--gold)]">Brand Kit</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">For Brands</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="/brands" className="hover:text-[var(--gold)]">Overview</a></li>
              <li><a href="/brands/briefs/new" className="hover:text-[var(--gold)]">Post a Brief</a></li>
              <li><a href="/brands/solutions" className="hover:text-[var(--gold)]">Solutions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="/resources/guides" className="hover:text-[var(--gold)]">Guides</a></li>
              <li><a href="/blog" className="hover:text-[var(--gold)]">Blog</a></li>
              <li><a href="/help" className="hover:text-[var(--gold)]">Help</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-white/40">
          © 2025 Creator NIL Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
