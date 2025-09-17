import React from 'react';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { PROS, FAMILIES } from "@/config/personas";
import { RoleCard } from "@/components/pros/RoleCard";

export default function ProsHub() {
  const getRoleCardProps = (persona: typeof PROS[0]) => {
    const showPlatform = persona.key === 'advisors' || persona.key === 'agents';
    
    return {
      title: persona.label,
      subtitle: persona.blurb,
      primaryCta: "Access Platform",
      secondaryCta: "Where to start →",
      hrefPrimary: `${persona.to}/platform`,
      hrefSecondary: `${persona.to}/start`,
      showPlatform
    };
  };

  return (
    <>
      <Helmet>
        <title>Service Professionals | Pick Your Role</title>
        <meta name="description" content="Pick your role to see tailored tools, onboarding, and quick links for financial advisors, agents, accountants, attorneys, and more." />
      </Helmet>

      <div className="min-h-screen" style={{ backgroundColor: '#0a0d1e' }}>
        <div className="mx-auto max-w-7xl p-4 md:p-8">
          {/* Header */}
          <header className="mb-8 pb-6 border-b border-white/10">
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: '#f5f7fa' }}>
              Service Professionals
            </h1>
            <p className="text-lg max-w-3xl" style={{ color: '#c6cfda' }}>
              Pick your role to see tailored tools, onboarding, and quick links.
            </p>
            <div className="mt-6 w-full h-px" style={{ backgroundColor: '#d4af37' }}></div>
          </header>

          {/* Professionals Grid */}
          <section aria-labelledby="pros" className="mb-12">
            <h2 id="pros" className="sr-only">Professionals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {PROS.map(persona => (
                <RoleCard
                  key={persona.key}
                  {...getRoleCardProps(persona)}
                />
              ))}
            </div>
          </section>

          {/* Families Section */}
          <section aria-labelledby="families" className="border-t border-white/10 pt-8">
            <h2 id="families" className="text-xl font-semibold mb-4" style={{ color: '#f5f7fa' }}>
              Families
            </h2>
            <div className="flex flex-wrap gap-3">
              {FAMILIES.map(family => (
                <Link 
                  key={family.key} 
                  to={family.to} 
                  className="px-4 py-2 border border-white/20 rounded-lg transition-all duration-200 hover:border-[#d4af37] hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-opacity-20"
                  style={{ color: '#c6cfda' }}
                >
                  {family.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}