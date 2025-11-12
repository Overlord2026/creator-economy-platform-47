import { useMemo, useState } from 'react';
import { landing } from '../data/landing';
import RoleToggle from '../components/landing/RoleToggle';
import SafeByDesign from '../components/landing/SafeByDesign';
import ProofStrip from '../components/landing/ProofStrip';
import SocialProof from '../components/landing/SocialProof';
import { track } from '../lib/track';
import { Link } from 'react-router-dom';

export default function IndexPage(){
  const [seg,setSeg]=useState<'creators'|'schools'>(landing.hero.defaultSegment);
  const h1 = useMemo(()=>landing.hero.h1A,[]);
  const primaryCta = seg==='creators' ? landing.hero.ctaCreators : landing.hero.ctaSchools;

  function click(label:string, to:string){ track('cta_click',{label}); return to; }

  return (
    <main className="px-6 py-10 max-w-6xl mx-auto" style={{color:'#EAEFF6'}}>
      {/* HERO */}
      <section>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-4xl md:text-5xl font-bold max-w-3xl">{h1}</h1>
          <RoleToggle onChange={setSeg}/>
        </div>
        <p className="text-white/80 mt-4 max-w-3xl">{landing.hero.sub}</p>
        <ul className="flex gap-4 text-white/80 mt-3 flex-wrap">
          {landing.hero.bullets.map((b,i)=><li key={i}>• {b}</li>)}
        </ul>
        <div className="mt-6 flex gap-3 flex-wrap">
          <Link className="px-5 py-3 rounded-md" style={{background:'#D4AF37',color:'#0B1C2C'}}
                to={click(primaryCta.label, primaryCta.to)}>{primaryCta.label}</Link>
          <Link className="px-5 py-3 rounded-md border border-[#D4AF37] text-white"
                to={click(landing.hero.ctaSecondary.label, landing.hero.ctaSecondary.to)}>{landing.hero.ctaSecondary.label}</Link>
        </div>
        {/* proof strip immediately under hero */}
        <ProofStrip/>
      </section>

      {/* HOW IT WORKS (placeholder—keep your existing section if you already have one) */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-white mb-4">How it works</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          <li className="rounded-lg border border-white/10 p-4">
            <div className="text-white font-medium">Brief</div>
            <div className="text-white/70 text-sm mt-1">Share scope & disclosures (2–3 min).</div>
          </li>
          <li className="rounded-lg border border-white/10 p-4">
            <div className="text-white font-medium">OfferLock → Approvals → e-Sign</div>
            <div className="text-white/70 text-sm mt-1">Prevent version drift; sign the same contract.</div>
          </li>
          <li className="rounded-lg border border-white/10 p-4">
            <div className="text-white font-medium">Settlement</div>
            <div className="text-white/70 text-sm mt-1">Payouts & deliverables with a private receipt.</div>
          </li>
        </ol>
      </section>

      {/* SAFE BY DESIGN (Trust Rails) */}
      <SafeByDesign/>

      {/* SOCIAL PROOF */}
      <SocialProof/>

      {/* PRICING (simplified labels) */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-white mb-4">Pricing</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-white/10 p-4">
            <div className="text-white font-medium">Creators — Free, forever</div>
            <ul className="text-white/70 text-sm mt-1 list-disc ml-5">
              <li>OfferLock & unlimited e-signs</li><li>Up to N projects</li><li>Private receipts</li>
            </ul>
            <div className="mt-3">
              <Link to="/onboarding" className="px-4 py-2 rounded-md" style={{background:'#D4AF37',color:'#0B1C2C'}}>Start free workspace</Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 p-4">
            <div className="text-white font-medium">Schools/Brands — Enterprise</div>
            <ul className="text-white/70 text-sm mt-1 list-disc ml-5">
              <li>Policy gates & oversight</li><li>Exportable receipts</li><li>SSO & support</li>
            </ul>
            <div className="mt-3">
              <Link to="/nil" className="px-4 py-2 rounded-md border border-[#D4AF37] text-white">Request demo</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
