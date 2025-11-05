import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Check, Shield, BadgeCheck, Lock,
  Zap, FileSignature, Banknote, Search, Quote, Sparkles, Hash, ExternalLink
} from "lucide-react";

/**
 * NIL Landing (Navy + Gold)
 * Sections:
 *  - Sticky header
 *  - Hero (animated overlay)
 *  - Logo strip
 *  - Why different
 *  - How it works
 *  - Trust rails
 *  - Live demo + verifier (UI-only stub)
 *  - Why join
 *  - Personas
 *  - Features index
 *  - Social proof (quotes + logos)
 *  - Pricing (3-tier)
 *  - FAQ (10 items)
 *  - Footer
 */

const NAVY = "#0B2239";
const GOLD = "#D4AF37";

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: NAVY }}>
      <StickyHeader />
      <Hero />
      <LogoStrip />
      <WhyDifferent />
      <HowItWorks />
      <TrustRails />
      <LiveDemoVerifier />
      <WhyJoin />
      <Personas />
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
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(11,34,57,0.85)] backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <span className="text-sm font-semibold">Creator • NIL</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          <a href="#why" className="text-white/90 hover:text-[var(--gold)]">Why us</a>
          <a href="#how" className="text-white/90 hover:text-[var(--gold)]">How it works</a>
          <a href="#trust" className="text-white/90 hover:text-[var(--gold)]">Trust Rails</a>
          <a href="#personas" className="text-white/90 hover:text-[var(--gold)]">Personas</a>
          <a href="#features" className="text-white/90 hover:text-[var(--gold)]">Features</a>
          <a href="#pricing" className="text-white/90 hover:text-[var(--gold)]">Pricing</a>
          <a href="#faq" className="text-white/90 hover:text-[var(--gold)]">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <HeaderGhostCTA to="/demo/offerlock">See Demo</HeaderGhostCTA>
          <HeaderGoldCTA to="/signup">Start Workspace</HeaderGoldCTA>
        </div>
      </div>
      <style>{`:root{--gold:${GOLD}}`}</style>
    </header>
  );
}

function HeaderGoldCTA({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 rounded-md border border-[var(--gold)] bg-[var(--gold)] px-3 py-1.5 text-sm font-semibold text-black shadow hover:opacity-95"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function HeaderGhostCTA({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 rounded-md border border-[var(--gold)] px-3 py-1.5 text-sm font-semibold text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black"
    >
      {children}
    </Link>
  );
}

/* ----------------------------------- Hero ----------------------------------- */

function Hero() {
  return (
    <section className="relative border-b border-white/10 py-14 sm:py-18">
      {/* animated overlay */}
      <div className="hero-animated-overlay" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/80">
            <span>AI with guardrails</span>
            <span className="h-3 w-px bg-white/20" />
            <span>content-free receipts</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold sm:text-5xl md:text-6xl leading-tight"
          >
            “Deals and projects, minus the drama.”
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
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
        <Icon className="h-5 w-5 text-[var(--gold)]" />
      </div>
      <div className="text-base font-semibold text-white">{title}</div>
      <div className="mt-1 text-sm text-white/75">{desc}</div>
    </div>
  );
}

/* --------------------------------- Logos ------------------------------------ */

function LogoStrip() {
  return (
    <section className="border-b border-white/10 bg-white/5 py-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 opacity-80">
        <span className="text-xs text-white/70">Trusted by creators, programs & brands</span>
        <div className="flex flex-wrap items-center gap-5 text-white/60">
          {/* replace with real logos when ready */}
          <span className="text-xs">🏫 State U</span>
          <span className="text-xs">🏆 ProBrand</span>
          <span className="text-xs">🎤 PodNet</span>
          <span className="text-xs">📰 Sports Daily</span>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Why We’re Different ---------------------------- */

function WhyDifferent() {
  const cards = [
    { icon: Shield, title: "Policy-first automation", desc: "Actions run through Policy Gates before execution." },
    { icon: BadgeCheck, title: "Content-free receipts", desc: "Offer → Contract → Settlement → Dispute; live verifier." },
    { icon: Lock, title: "WORM vault & legal hold", desc: "Write-once retention; exportable packs for audits." },
  ];
  return (
    <Section id="why" title="Why we’re different">
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((c, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <c.icon className="h-5 w-5 text-[var(--gold)]" />
            </div>
            <div className="text-lg font-semibold">{c.title}</div>
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
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <s.icon className="h-5 w-5 text-[var(--gold)]" />
            </div>
            <div className="text-lg font-semibold">{s.title}</div>
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
    "Content-Free Receipts — hash-backed proofs; verify “Included ✓” locally.",
    "WORM Vault & Legal Hold — write-once retention; audit exports.",
    "Anchors (K-of-N) — multiple anchors for durable verification.",
  ];
  return (
    <Section id="trust" title="Trust rails">
      <ul className="space-y-2 text-sm text白/80">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-[var(--gold)]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <a href="/patents" className="inline-flex items-center gap-1 rounded-md border border-[var(--gold)] px-3 py-1.5 text-sm text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black">
          Patent &amp; IP <ExternalLink className="h-4 w-4" />
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
      <div className="flex flex-wrap gap-2">
        {["offer_locked", "contract_signed", "escrow_funded", "funds_released"].map((label) => (
          <span key={label} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/80">
            {label}
          </span>
        ))}
      </div>

      <div className="mt-4 flex max-w-lg items-center gap-2">
        <div className="flex flex-1 items-center rounded-md border border-white/15 bg-white/5 px-3">
          <Hash className="h-4 w-4 text-white/50" />
          <input
            value={hash}
            onChange={(e)=>setHash(e.target.value)}
            placeholder="enter proof hash"
            className="ml-2 w-full bg-transparent p-2 text-sm outline-none placeholder:text-white/40"
          />
        </div>
        <button
          onClick={verify}
          disabled={loading}
          className="inline-flex items-center gap-1 rounded-md border border-[var(--gold)] bg-[var(--gold)] px-3 py-2 text-sm font-semibold text-black hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "Verifying…" : "Verify"}
        </button>
      </div>

      {status !== "idle" && (
        <div className="mt-3 text-sm">
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
          <div key={t.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="text-lg font-semibold">{t.title}</div>
            <ul className="mt-2 space-y-1 text-sm text-white/80">
              {t.bullets.map(b => (
                <li key={b} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[var(--gold)]" /> {b}
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

/* -------------------------------- Personas --------------------------------- */

function Personas() {
  const items = [
    "Athlete","Creator","Coach/School","Parent/Guardian","Agent/Rep","Brand/Partner","Service Pros"
  ];
  return (
    <Section id="personas" title="Who it’s for">
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {items.map((label) => (
          <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-base font-semibold">{label}</div>
            <div className="mt-2">
              <GhostCTA to={`/personas?who=${encodeURIComponent(label)}`}>Open</GhostCTA>
            </div>
          </div>
        ))}
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
          <div key={f.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-base font-semibold">{f.name}</div>
            <div className="mt-1 text-sm text-white/75">{f.desc}</div>
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
    { text: "My coach saw approvals; my parents didn’t see $.", name: "— Athlete" },
    { text: "Finance finally had clean receipts.", name: "— Buyer" },
  ];
  return (
    <Section title="Social proof">
      <div className="grid gap-3 md:grid-cols-2">
        {quotes.map((q, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-start gap-2">
              <Quote className="mt-1 h-5 w-5 text-[var(--gold)]" />
              <div>
                <div className="text-white/90">“{q.text}”</div>
                <div className="mt-1 text-sm text-white/70">{q.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* secondary logo strip */}
      <div className="mt-6 flex flex-wrap items-center gap-5 text-white/60">
        <span className="text-xs">🏫 Metro State</span>
        <span className="text-xs">🏆 BrandCo</span>
        <span className="text-xs">🎧 PodNow</span>
        <span className="text-xs">📰 NIL Weekly</span>
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
          <div key={c.name} className={`relative rounded-xl border bg-white/5 p-5 ${idx===1 ? "border-[var(--gold)] shadow" : "border-white/10"}`}>
            {c.tag && <span className="absolute right-3 top-3 rounded-full bg-white/10 px-2 py-1 text-xs font-semibold text-white">{c.tag}</span>}
            <div className="text-xl font-semibold">{c.name}</div>
            <div className="mt-1 text-3xl font-extrabold">{c.price}</div>
            <div className="mt-1 text-sm text-white/75">{c.blurb}</div>
            <ul className="mt-3 space-y-1 text-sm text-white/80">
              {c.bullets.map(b => (
                <li key={b} className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--gold)]" /> {b}</li>
              ))}
            </ul>
            <div className="mt-4">
              <PrimaryCTA to={c.cta.to}>{c.cta.label}</PrimaryCTA>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------------- FAQ ----------------------------------- */

function FAQ() {
  const items = [
    { q: "What is OfferLock?", a: "A quick pre-agreement so everyone aligns before signing — no ghost edits." },
    { q: "What’s a “receipt”?", a: "A small, private proof of what happened and why — helpful for oversight and disputes." },
    { q: "Can my school or parent see my deals?", a: "Only what you share; amounts can remain private." },
    { q: "Is this NCAA compliant?", a: "Yes—policy gates ensure actions are reviewed for compliance before execution." },
    { q: "Do I need an agent?", a: "Not required—brands can reach out directly; agents can manage deals for you." },
    { q: "How do payouts work?", a: "Payments settle after deliverables; a private receipt proves timing and reason." },
    { q: "Can I export receipts?", a: "Yes—multi-anchor packs are exportable for audits and disputes." },
    { q: "Does this work for minors?", a: "Guardian co-sign workflows support under-18 athletes." },
    { q: "What’s the cost?", a: "Free for creators; Pro adds analytics & priority support; Enterprise is custom." },
    { q: "How do I start?", a: "Click “Try the OfferLock demo” or “Start Workspace” to see it in action." },
  ];
  return (
    <Section id="faq" title="Frequently asked">
      <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
        {items.map((f, i) => (
          <details key={i}>
            <summary className="cursor-pointer select-none p-4 text-base font-medium hover:text-[var(--gold)]">
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
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold">Policy-first, receipt-backed NIL & creator deals.</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <PrimaryCTA to="/signup">Start Workspace</PrimaryCTA>
              <GhostCTA to="/demo/offerlock">See Demo</GhostCTA>
            </div>
          </div>
          <div className="text-sm text-white/70">
            <div className="font-semibold text-white">Utility</div>
            <ul className="mt-2 space-y-1">
              <li><a className="hover:text-[var(--gold)]" href="#why">Why us</a></li>
              <li><a className="hover:text-[var(--gold)]" href="#trust">Trust Rails</a></li>
              <li><Link className="hover:text-[var(--gold)]" to="/privacy">Privacy</Link></li>
              <li><Link className="hover:text-[var(--gold)]" to="/terms">Terms</Link></li>
            </ul>
          </div>
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
    <Link to={to} className="inline-flex items-center gap-1 rounded-md border border-[var(--gold)] bg-[var(--gold)] px-3 py-2 text-sm font-semibold text-black hover:opacity-95">
      {children} <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function GhostCTA({ to, children }:{ to:string; children:React.ReactNode }) {
  return (
    <Link to={to} className="inline-flex items-center gap-1 rounded-md border border-[var(--gold)] px-3 py-2 text-sm font-semibold text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black">
      {children}
    </Link>
  );
}
