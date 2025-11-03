#!/bin/bash
set -e

echo "🚀 Creating PersonaSelector + WhyJoinSection components..."

# --- 1. Create PersonaSelector ---
mkdir -p src/components/landing
cat > src/components/landing/PersonaSelector.tsx << 'EOF'
import { useState } from 'react';
import { Link } from 'react-router-dom';

type PersonaKey = 'Athlete'|'Creator'|'Coach/School'|'Brand/Partner'|'Agent/Rep'|'Parent/Guardian'|'Service Pros';
type Persona = {
  key: PersonaKey;
  sub: string;
  bullets: string[];
  ctaLabel: string;
  ctaTo: string;
};

const PERSONAS: Persona[] = [
  { key:'Athlete', sub:'Monetize NIL with confidence', bullets:[
    'Approvals before e-sign',
    'Private, exportable receipts',
    'Deal tracker with payouts'
  ], ctaLabel:'Start free', ctaTo:'/onboarding/athlete'},
  { key:'Creator', sub:'Lock brand deals—without oversharing', bullets:[
    'OfferLock → e-sign → settlement',
    'Status-only verifier',
    'Proof-backed reports'
  ], ctaLabel:'Start free', ctaTo:'/onboarding/creator'},
  { key:'Coach/School', sub:'Right-sized visibility & audit exports', bullets:[
    'Policy gates in plain English',
    'Roster oversight—no payload leak',
    'One-click exports'
  ], ctaLabel:'Request demo', ctaTo:'/nil'},
  { key:'Brand/Partner', sub:'Run compliant creator campaigns', bullets:[
    'Find athletes, publish offers',
    'Everyone signs the same deal',
    'Receipts for finance—no drama'
  ], ctaLabel:'Request demo', ctaTo:'/nil'},
  { key:'Agent/Rep', sub:'Manage clients and deal pipelines', bullets:[
    'Contract templates',
    'Commission tracking',
    'Client portal'
  ], ctaLabel:'Start free', ctaTo:'/onboarding/agent'},
  { key:'Parent/Guardian', sub:'See what matters—never amounts', bullets:[
    'Co-sign & approvals',
    'Scoped access',
    'Emergency contact card'
  ], ctaLabel:'See how privacy works', ctaTo:'/why-receipts'},
  { key:'Service Pros', sub:'Tools for advisors & attorneys', bullets:[
    'Templates & rules',
    'Audit-ready exports',
    'Client collaboration'
  ], ctaLabel:'Explore tools', ctaTo:'/pros'}
];

export default function PersonaSelector(){
  const [active, setActive] = useState<Persona>(PERSONAS[0]);

  return (
    <section className="section--personas px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Who it's for</h2>
        <div className="grid gap-8 md:grid-cols-[280px,1fr]">
          <div className="flex md:flex-col gap-2 flex-wrap" role="tablist" aria-label="Who it's for">
            {PERSONAS.map(p => {
              const selected = p.key === active.key;
              return (
                <button
                  key={p.key}
                  role="tab"
                  aria-selected={selected}
                  onClick={()=>setActive(p)}
                  className={`px-3 py-2 rounded-full text-sm border transition-all ${selected?'bg-bfo-gold text-bfo-black border-bfo-gold':'bg-transparent text-white/90 border-white/20 hover:border-white/40'}`}
                >
                  {p.key}
                </button>
              );
            })}
          </div>

          <div className="card">
            <h3>{active.key}</h3>
            <p>{active.sub}</p>
            <ul className="mt-3 space-y-1 text-white/80">
              {active.bullets.map((b,i)=><li key={i}>• {b}</li>)}
            </ul>
            <div className="mt-6">
              <Link to={active.ctaTo} className="btn-primary px-4 py-2 rounded-md font-semibold inline-block">{active.ctaLabel}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
EOF

echo "✅ Created PersonaSelector.tsx"

# --- 2. Create WhyJoinSection ---
cat > src/components/landing/WhyJoinSection.tsx << 'EOF'
import { Link } from 'react-router-dom';

export default function WhyJoinSection(){
  return (
    <section className="section--why px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Why join?</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card card--aud" style={{'--aud-accent':'#39C6B0'} as any}>
            <h3>Athletes & Creators</h3>
            <p>Brand kit • approvals on rails • proof-backed reports</p>
            <ul className="mt-3 space-y-1 text-white/80">
              <li>• Brand kit that auto-fills offers</li>
              <li>• Approvals before e-sign (same contract for all)</li>
              <li>• Private, exportable receipts for payouts</li>
            </ul>
            <p className="text-white/60 text-sm mt-3 italic">Proof: 500+ receipts issued last month</p>
            <div className="mt-6 flex gap-3">
              <Link to="/onboarding" className="btn-primary px-4 py-2 rounded-md font-semibold">Start free</Link>
              <Link to="/nil" className="btn-secondary px-4 py-2 rounded-md font-semibold">Watch 60-sec</Link>
            </div>
          </div>

          <div className="card card--aud" style={{'--aud-accent':'#8A7DFF'} as any}>
            <h3>Coaches & Schools</h3>
            <p>Plain-language policy • right-sized visibility • exports</p>
            <ul className="mt-3 space-y-1 text-white/80">
              <li>• Policy gates in plain English</li>
              <li>• See status, not private payloads</li>
              <li>• One-click audit exports (write-once vault)</li>
            </ul>
            <p className="text-white/60 text-sm mt-3 italic">Proof: Cuts finance follow-ups by 63%</p>
            <div className="mt-6 flex gap-3">
              <Link to="/nil" className="btn-primary px-4 py-2 rounded-md font-semibold">Request demo</Link>
              <Link to="/why-receipts" className="btn-secondary px-4 py-2 rounded-md font-semibold">See policy</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
EOF

echo "✅ Created WhyJoinSection.tsx"

# --- 3. Append CSS tokens to brand.css ---
cat >> src/styles/brand.css << 'EOF'

/* ===== Landing polish tokens (personas / why-join) ===== */
:root {
  --section-bg: #0B1E2B;
  --card-bg: #0F2838;
  --card-hover: #123043;
  --card-bdr: rgba(255,255,255,.08);
  --aud-accent-creators: #39C6B0;
  --aud-accent-schools: #8A7DFF;
}

.section--personas { background: var(--section-bg); }
.section--why { background: linear-gradient(180deg,#0B1E2B 0%, #0A1924 100%); }

.card {
  background: var(--card-bg);
  border: 1px solid var(--card-bdr);
  border-radius: 16px;
  padding: 20px;
  transition: transform .15s ease, background .15s ease, border-color .15s ease;
}
.card:hover, .card:focus-within {
  background: var(--card-hover);
  transform: translateY(-2px);
}
.card h3 { color: var(--bfo-white); margin: 0 0 6px; font-weight: 600; }
.card p { color: var(--muted, #A8B8C7); margin: 0 0 12px; }

.card--aud { position: relative; }
.card--aud::before {
  content:"";
  position:absolute;
  left:0;
  right:0;
  top:0;
  height:2px;
  border-radius:2px;
  background: var(--aud-accent, var(--aud-accent-creators));
}

.btn-primary {
  background: var(--bfo-gold);
  color: var(--bfo-black);
  transition: opacity .15s ease;
}
.btn-primary:hover { opacity: 0.9; }

.btn-secondary {
  border: 1px solid var(--bfo-gold);
  color: var(--bfo-gold);
  background: transparent;
  transition: background .15s ease;
}
.btn-secondary:hover {
  background: rgba(212, 175, 55, 0.1);
}

.card:focus-within, .btn-primary:focus, .btn-secondary:focus {
  outline: 2px solid var(--bfo-gold);
  outline-offset: 3px;
}
EOF

echo "✅ Appended CSS tokens to brand.css"

echo "🎉 All components created! Now wire them into LandingPage.tsx manually or run the next step."
