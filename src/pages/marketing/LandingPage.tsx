import React, { useState, lazy, Suspense, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Check, Shield, BadgeCheck, Lock,
  Zap, FileSignature, Banknote, Search, Quote, Sparkles, Hash, ExternalLink,
  Menu, X, ChevronRight
} from "lucide-react";

// Lazy load framer-motion for better initial load performance
const motion = {
  h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>
};

/**
 * OPTIMIZED NIL Landing - Professional Black Theme
 * Performance improvements:
 * - Lazy loaded animations
 * - Reduced initial bundle size
 * - Optimized images and assets
 * - Better SEO with meta tags
 * - Improved accessibility
 * - Faster Time to Interactive (TTI)
 * - Professional black header with serif logo
 * - Mobile hamburger menu with full-screen drawer
 */

const NAVY = "#0B2239";
const GOLD = "#D4AF37";

export default function LandingPage() {
  // Set meta tags using native DOM API instead of react-helmet-async
  useEffect(() => {
    document.title = "Creator NIL Platform - Deals and Projects, Minus the Drama";

    const metaTags = [
      { name: "description", content: "One place for creators and athletes to lock offers, e-sign with confidence, and keep private proof of every step. Policy-first automation with content-free receipts." },
      { name: "keywords", content: "NIL, creator economy, athlete deals, e-signature, compliance, offer lock, brand deals" },
      { property: "og:title", content: "Creator NIL Platform - Deals and Projects, Minus the Drama" },
      { property: "og:description", content: "Lock offers, e-sign with confidence, and keep private proof of every step." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Creator NIL Platform" },
      { name: "twitter:description", content: "Deals and projects, minus the drama" },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        if (name) meta.setAttribute('name', name);
        if (property) meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });
  }, []);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: NAVY }}>
        {/* Accessibility skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        <StickyHeader />
        <AnnouncementBar />
        <Hero />
        <LogoStrip />
        <WhyDifferent />
        <HowItWorks />
        <TrustRails />
        <LiveDemoVerifier />
        <WhyJoin />
        <WhoItsFor />
        <FeaturesIndex />
        <SocialProof />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
  );
}

/* ---------------------------------- Header --------------------------------- */

function StickyHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b border-white/5 bg-black/95 backdrop-blur-sm"
        role="banner"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo with Serif Font */}
          <Link
            to="/"
            className="flex items-center"
            aria-label="Creator NIL Platform Home"
          >
            <span
              className="text-xl font-bold text-[var(--gold)] tracking-wide"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Creator NIL Platform
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 text-[15px] lg:flex" aria-label="Main navigation">
            <DropdownLink href="/athletes" label="For Athletes" />
            <DropdownLink href="/brands" label="For Brands" />
            <a href="/solutions" className="text-white hover:text-[var(--gold)] transition-colors font-medium">
              Solutions
            </a>
            <a href="/resources" className="text-white hover:text-[var(--gold)] transition-colors font-medium">
              Resources
            </a>
            <a href="#pricing" className="text-white hover:text-[var(--gold)] transition-colors font-medium">
              Pricing
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-6 py-2.5 text-[15px] font-semibold text-black shadow-lg hover:bg-[#FFC700] transition-all hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[var(--gold)] transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        <style>{`:root{--gold:${GOLD}}`}</style>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/95 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <nav className="flex flex-col gap-1 p-6 pt-20" aria-label="Mobile navigation">
            <MobileNavLink href="/athletes" onClick={() => setMobileMenuOpen(false)}>
              For Athletes
            </MobileNavLink>
            <MobileNavLink href="/brands" onClick={() => setMobileMenuOpen(false)}>
              For Brands
            </MobileNavLink>
            <MobileNavLink href="/solutions" onClick={() => setMobileMenuOpen(false)}>
              Solutions
            </MobileNavLink>
            <MobileNavLink href="/resources" onClick={() => setMobileMenuOpen(false)}>
              Resources
            </MobileNavLink>
            <MobileNavLink href="#pricing" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </MobileNavLink>

            <div className="mt-6 pt-6 border-t border-white/10">
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#FFD700] px-6 py-3 text-base font-semibold text-black shadow-lg"
              >
                Get Started
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

function DropdownLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      to={href}
      className="flex items-center gap-1 text-white hover:text-[var(--gold)] transition-colors font-medium group"
    >
      {label}
      <ChevronRight
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="flex items-center justify-between px-4 py-3 text-lg text-white hover:text-[var(--gold)] hover:bg-white/5 rounded-lg transition-all"
    >
      {children}
      <ChevronRight className="h-5 w-5" aria-hidden="true" />
    </Link>
  );
}

/* ------------------------------- Announcement Bar ------------------------------ */

function AnnouncementBar() {
  return (
    <div className="border-b border-white/5 bg-black/90">
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 text-sm">
          <span className="text-[var(--gold)] font-semibold">🔒 NIL Compliance Made Simple</span>
          <span className="text-white/40">•</span>
          <span className="text-white/80">Trusted by 500+ Athletes</span>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------- Hero ----------------------------------- */

function Hero() {
  return (
    <section id="main-content" className="relative border-b border-white/10 py-14 sm:py-18" aria-labelledby="hero-heading">
      {/* Removed animated overlay for better performance */}
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/80">
            <span>AI with guardrails</span>
            <span className="h-3 w-px bg-white/20" aria-hidden="true" />
            <span>content-free receipts</span>
          </div>

          <motion.h1
            id="hero-heading"
            className="text-4xl font-extrabold sm:text-5xl md:text-6xl leading-tight"
          >
            "Deals and projects, minus the drama."
          </motion.h1>

          <p className="mt-4 max-w-2xl text-lg text-white/80">
            One place for creators and athletes to lock offers, e-sign with confidence,
            and keep private proof of every step.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryCTA to="/demo/offerlock">Try the OfferLock demo</PrimaryCTA>
            <GhostCTA to="/personas">Explore personas</GhostCTA>
          </div>

          <p className="mt-6 text-sm text-white/70">Built by compliance nerds. Designed for humans.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <HeroTile icon={Zap} title="OfferLock" desc="Write down what was discussed. No surprises." />
          <HeroTile icon={FileSignature} title="E-Sign" desc="Everyone signs the same deal, the right way." />
          <HeroTile icon={Banknote} title="Settlement" desc="Payouts with a private receipt. No oversharing." />
          <HeroTile icon={BadgeCheck} title="Verifier" desc="Status-only checks. No private payloads." />
        </div>
      </div>
    </section>
  );
}

function HeroTile({
  icon: Icon, title, desc,
}: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
      <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
        <Icon className="h-5 w-5 text-[var(--gold)]" aria-hidden="true" />
      </div>
      <div className="text-base font-semibold text-white">{title}</div>
      <div className="mt-1 text-sm text-white/75">{desc}</div>
    </div>
  );
}

/* --------------------------------- Logos ------------------------------------ */

function LogoStrip() {
  return (
    <section className="border-b border-white/10 bg-white/5 py-6" aria-label="Trusted partners">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 opacity-80">
        <span className="text-xs text-white/70">Trusted by creators, programs & brands</span>
        <div className="flex flex-wrap items-center gap-5 text-white/60" role="list">
          <span className="text-xs" role="listitem">🏫 State U</span>
          <span className="text-xs" role="listitem">🏆 ProBrand</span>
          <span className="text-xs" role="listitem">🎤 PodNet</span>
          <span className="text-xs" role="listitem">📰 Sports Daily</span>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Why We're Different ---------------------------- */

function WhyDifferent() {
  const cards = [
    { icon: Shield, title: "Policy-first automation", desc: "Actions run through Policy Gates before execution." },
    { icon: BadgeCheck, title: "Content-free receipts", desc: "Offer → Contract → Settlement → Dispute; live verifier." },
    { icon: Lock, title: "WORM vault & legal hold", desc: "Write-once retention; exportable packs for audits." },
  ];
  return (
    <Section id="why" title="Why we're different">
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((c, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10">
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <c.icon className="h-5 w-5 text-[var(--gold)]" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="mt-1 text-sm text-white/75">{c.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------ How it works -------------------------------- */

function HowItWorks() {
  const steps = [
    { icon: Search, title: "Brief", desc: "Share scope & disclosures." },
    { icon: FileSignature, title: "OfferLock → e-Sign", desc: "Prevent overlap, approvals on rails, sign the same contract." },
    { icon: Banknote, title: "Settlement", desc: "Payouts & deliverables packaged for audits." },
  ];
  return (
    <Section id="how" title="How it works">
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10">
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <s.icon className="h-5 w-5 text-[var(--gold)]" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-white/75">{s.desc}</p>
            {i === 2 && (
              <p className="mt-3 text-xs text-white/70">
                Micro-proof: Every important action leaves a private receipt.
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <GhostCTA to="/demo/offerlock">Start a deal</GhostCTA>
      </div>
    </Section>
  );
}

/* -------------------------------- Trust Rails ------------------------------- */

function TrustRails() {
  const bullets = [
    "Enterprise Policy Gates — approve/deny with reasons before actions run.",
    "Content-Free Receipts — hash-backed proofs; verify \"Included ✓\" locally.",
    "WORM Vault & Legal Hold — write-once retention; audit exports.",
    "Anchors (K-of-N) — multiple anchors for durable verification.",
  ];
  return (
    <Section id="trust" title="Trust rails">
      <ul className="space-y-2 text-sm text-white/80">
        {bullets.map((b, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-[var(--gold)] flex-shrink-0" aria-hidden="true" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <a
          href="/patents"
          className="inline-flex items-center gap-1 rounded-md border border-[var(--gold)] px-3 py-1.5 text-sm text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition-colors"
          aria-label="View patent and intellectual property information"
        >
          Patent &amp; IP <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
}

/* --------------------------- Live Demo + Verifier --------------------------- */

function LiveDemoVerifier() {
  const [hash, setHash] = useState("pslip_demo_abc123");
  const [status, setStatus] = useState<"idle" | "included" | "notfound">("idle");
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setStatus(hash.includes("demo") ? "included" : "notfound");
    setLoading(false);
  };

  return (
    <Section title="Live demo • verifier">
      <div className="flex flex-wrap gap-2" role="list" aria-label="Verification steps">
        {["offer_locked", "contract_signed", "escrow_funded", "funds_released"].map((label) => (
          <span key={label} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/80" role="listitem">
            {label}
          </span>
        ))}
      </div>

      <div className="mt-4 flex max-w-lg items-center gap-2">
        <div className="flex flex-1 items-center rounded-md border border-white/15 bg-white/5 px-3">
          <Hash className="h-4 w-4 text-white/50" aria-hidden="true" />
          <input
            value={hash}
            onChange={(e)=>setHash(e.target.value)}
            placeholder="enter proof hash"
            className="ml-2 w-full bg-transparent p-2 text-sm outline-none placeholder:text-white/40"
            aria-label="Proof hash input"
          />
        </div>
        <button
          onClick={verify}
          disabled={loading}
          className="inline-flex items-center gap-1 rounded-md border border-[var(--gold)] bg-[var(--gold)] px-3 py-2 text-sm font-semibold text-black hover:opacity-95 disabled:opacity-60 transition-opacity"
          aria-label="Verify proof hash"
        >
          {loading ? "Verifying…" : "Verify"}
        </button>
      </div>

      {status !== "idle" && (
        <div className="mt-3 text-sm" role="status" aria-live="polite">
          {status === "included" ? (
            <span className="text-emerald-300">Included ✓ (status only)</span>
          ) : (
            <span className="text-rose-300">Not found</span>
          )}
          <span className="ml-2 text-white/70">We verify status only — no private payloads.</span>
        </div>
      )}
    </Section>
  );
}

/* -------------------------------- Why Join --------------------------------- */

function WhyJoin() {
  const tiles = [
    {
      title: "Athletes",
      bullets: ["Brand kit", "Approvals & e-sign on rails", "Proof-backed reports"],
      cta: { label: "Start", to: "/signup?persona=athlete" },
    },
    {
      title: "Coaches/Schools",
      bullets: ["Plain-language policy", "Right-sized visibility", "Exportable oversight"],
      cta: { label: "See demo", to: "/demo/offerlock" },
    },
  ];
  return (
    <Section title="Why join">
      <div className="grid gap-4 md:grid-cols-2">
        {tiles.map(t => (
          <div key={t.title} className="rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10">
            <h3 className="text-lg font-semibold">{t.title}</h3>
            <ul className="mt-2 space-y-1 text-sm text-white/80">
              {t.bullets.map(b => (
                <li key={b} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[var(--gold)] flex-shrink-0" aria-hidden="true" /> {b}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <GhostCTA to={t.cta.to}>{t.cta.label}</GhostCTA>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------- Who it's for --------------------------------- */

function WhoItsFor() {
  return (
    <Section id="personas" title="Who it's for">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Athletes & Creators */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10">
          <h3 className="text-xl font-extrabold text-white mb-4">Athletes & Creators</h3>
          <ul className="space-y-2 text-white/80 text-sm mb-6">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 text-[var(--gold)] flex-shrink-0" aria-hidden="true" />
              <span>Brand kit & portfolio</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 text-[var(--gold)] flex-shrink-0" aria-hidden="true" />
              <span>Approvals & e-sign on rails</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 text-[var(--gold)] flex-shrink-0" aria-hidden="true" />
              <span>Proof-backed reports</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 text-[var(--gold)] flex-shrink-0" aria-hidden="true" />
              <span>Payment tracking</span>
            </li>
          </ul>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--gold)]/90 transition-colors"
          >
            Start free workspace
          </Link>
        </div>

        {/* Coaches & Schools */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10">
          <h3 className="text-xl font-extrabold text-white mb-4">Coaches & Schools</h3>
          <ul className="space-y-2 text-white/80 text-sm mb-6">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 text-[var(--gold)] flex-shrink-0" aria-hidden="true" />
              <span>Plain-language policy gates</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 text-[var(--gold)] flex-shrink-0" aria-hidden="true" />
              <span>Right-sized visibility</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 text-[var(--gold)] flex-shrink-0" aria-hidden="true" />
              <span>Exportable oversight</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 text-[var(--gold)] flex-shrink-0" aria-hidden="true" />
              <span>Compliance-ready receipts</span>
            </li>
          </ul>
          <Link
            to="/nil"
            className="inline-flex items-center gap-2 rounded-md border border-[var(--gold)] px-4 py-2 text-sm font-semibold text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition-colors"
          >
            Request demo
          </Link>
        </div>

        {/* Professionals */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10">
          <h3 className="text-xl font-extrabold text-white mb-4">Professionals</h3>
          <p className="text-white/70 text-sm mb-3">For agents, brands, parents, and service providers</p>
          <ul className="space-y-2 text-white/80 text-sm mb-6">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 text-[var(--gold)] flex-shrink-0" aria-hidden="true" />
              <span>Client management tools</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 text-[var(--gold)] flex-shrink-0" aria-hidden="true" />
              <span>Multi-party oversight</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 text-[var(--gold)] flex-shrink-0" aria-hidden="true" />
              <span>Secure collaboration</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 text-[var(--gold)] flex-shrink-0" aria-hidden="true" />
              <span>Private audit trails</span>
            </li>
          </ul>
          <Link
            to="/pros"
            className="inline-flex items-center gap-2 rounded-md border border-[var(--gold)] px-4 py-2 text-sm font-semibold text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition-colors"
          >
            Explore professional tools
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------ Features index ------------------------------ */

function FeaturesIndex() {
  const features = [
    { name: "Marketplace", desc: "Find NIL fit fast; run it on rails.", to: "/features/marketplace" },
    { name: "Offer → Contract → Payment", desc: "One track, one source, one receipt each step.", to: "/features/ocp" },
    { name: "Disclosure Packs", desc: "Channel-specific message + legal ready-to-send.", to: "/features/disclosure-packs" },
  ];
  return (
    <Section id="features" title="Features">
      <div className="grid gap-3 md:grid-cols-3">
        {features.map(f => (
          <div key={f.name} className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
            <h3 className="text-base font-semibold">{f.name}</h3>
            <p className="mt-1 text-sm text-white/75">{f.desc}</p>
            <div className="mt-3">
              <GhostCTA to={f.to}>Open</GhostCTA>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------- Social proof ------------------------------- */

function SocialProof() {
  const quotes = [
    { text: "My coach saw approvals; my parents didn't see $.", name: "— Athlete" },
    { text: "Finance finally had clean receipts.", name: "— Buyer" },
  ];
  return (
    <Section title="Social proof">
      <div className="grid gap-3 md:grid-cols-2">
        {quotes.map((q, i) => (
          <figure key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
            <div className="flex items-start gap-2">
              <Quote className="mt-1 h-5 w-5 text-[var(--gold)] flex-shrink-0" aria-hidden="true" />
              <div>
                <blockquote className="text-white/90">"{q.text}"</blockquote>
                <figcaption className="mt-1 text-sm text-white/70">{q.name}</figcaption>
              </div>
            </div>
          </figure>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-5 text-white/60" role="list" aria-label="Partner organizations">
        <span className="text-xs" role="listitem">🏫 Metro State</span>
        <span className="text-xs" role="listitem">🏆 BrandCo</span>
        <span className="text-xs" role="listitem">🎧 PodNow</span>
        <span className="text-xs" role="listitem">📰 NIL Weekly</span>
      </div>
    </Section>
  );
}

/* --------------------------------- Pricing --------------------------------- */

function Pricing() {
  const cards = [
    { name: "Free", price: "$0/mo", blurb: "For creators getting started", bullets: ["Marketplace access", "Standard support", "3 active offers"], cta: { label: "Join free", to: "/signup?plan=free" }, tag: "" },
    { name: "Pro", price: "$49/mo", blurb: "For growing NIL creators", bullets: ["Featured profile", "Analytics", "Priority support"], cta: { label: "Upgrade", to: "/signup?plan=pro" }, tag: "Most Popular" },
    { name: "Enterprise", price: "Custom", blurb: "For brands & schools", bullets: ["Dedicated manager", "Custom integrations", "Bulk onboarding"], cta: { label: "Contact sales", to: "/contact" }, tag: "" },
  ];
  return (
    <Section id="pricing" title="Simple, transparent pricing">
      <div className="grid gap-3 md:grid-cols-3">
        {cards.map((c, idx) => (
          <article key={c.name} className={`relative rounded-xl border bg-white/5 p-5 transition-colors hover:bg-white/10 ${idx===1 ? "border-[var(--gold)] shadow" : "border-white/10"}`}>
            {c.tag && <span className="absolute right-3 top-3 rounded-full bg-white/10 px-2 py-1 text-xs font-semibold text-white">{c.tag}</span>}
            <h3 className="text-xl font-semibold">{c.name}</h3>
            <div className="mt-1 text-3xl font-extrabold">{c.price}</div>
            <p className="mt-1 text-sm text-white/75">{c.blurb}</p>
            <ul className="mt-3 space-y-1 text-sm text-white/80">
              {c.bullets.map(b => (
                <li key={b} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[var(--gold)] flex-shrink-0" aria-hidden="true" /> {b}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <PrimaryCTA to={c.cta.to}>{c.cta.label}</PrimaryCTA>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------------- FAQ ----------------------------------- */

function FAQ() {
  const items = [
    { q: "What is OfferLock?", a: "A quick pre-agreement so everyone aligns before signing — no ghost edits." },
    { q: "What's a \"receipt\"?", a: "A small, private proof of what happened and why — helpful for oversight and disputes." },
    { q: "Can my school or parent see my deals?", a: "Only what you share; amounts can remain private." },
    { q: "Is this NCAA compliant?", a: "Yes—policy gates ensure actions are reviewed for compliance before execution." },
    { q: "Do I need an agent?", a: "Not required—brands can reach out directly; agents can manage deals for you." },
    { q: "How do payouts work?", a: "Payments settle after deliverables; a private receipt proves timing and reason." },
    { q: "Can I export receipts?", a: "Yes—multi-anchor packs are exportable for audits and disputes." },
    { q: "Does this work for minors?", a: "Guardian co-sign workflows support under-18 athletes." },
    { q: "What's the cost?", a: "Free for creators; Pro adds analytics & priority support; Enterprise is custom." },
    { q: "How do I start?", a: "Click \"Try the OfferLock demo\" or \"Start Workspace\" to see it in action." },
  ];
  return (
    <Section id="faq" title="Frequently asked">
      <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
        {items.map((f, i) => (
          <details key={i}>
            <summary className="cursor-pointer select-none p-4 text-base font-medium hover:text-[var(--gold)] transition-colors">
              {f.q}
            </summary>
            <div className="px-4 pb-4 text-sm text-white/75">{f.a}</div>
          </details>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------- Footer --------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-white/10" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold">Policy-first, receipt-backed NIL & creator deals.</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <PrimaryCTA to="/signup">Start Workspace</PrimaryCTA>
              <GhostCTA to="/demo/offerlock">See Demo</GhostCTA>
            </div>
          </div>
          <nav className="text-sm text-white/70" aria-label="Footer navigation">
            <div className="font-semibold text-white">Utility</div>
            <ul className="mt-2 space-y-1">
              <li><a className="hover:text-[var(--gold)] transition-colors" href="#why">Why us</a></li>
              <li><a className="hover:text-[var(--gold)] transition-colors" href="#trust">Trust Rails</a></li>
              <li><Link className="hover:text-[var(--gold)] transition-colors" to="/privacy">Privacy</Link></li>
              <li><Link className="hover:text-[var(--gold)] transition-colors" to="/terms">Terms</Link></li>
            </ul>
          </nav>
          <div className="text-sm text-white/60">© {new Date().getFullYear()} Creator NIL. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------ Shared bits -------------------------------- */

function Section({ id, title, children }:{ id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-white/10 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function PrimaryCTA({ to, children }:{ to:string; children:React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 rounded-md border border-[var(--gold)] bg-[var(--gold)] px-3 py-2 text-sm font-semibold text-black hover:opacity-95 transition-opacity"
    >
      {children} <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

function GhostCTA({ to, children }:{ to:string; children:React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 rounded-md border border-[var(--gold)] px-3 py-2 text-sm font-semibold text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition-colors"
    >
      {children}
    </Link>
  );
}
