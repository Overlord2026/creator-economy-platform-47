import React from 'react';
import PersonaCard from '@/components/ui/PersonaCard';
import { BFOHeader } from '@/components/site/BFOHeader';
import { BrandedFooter } from '@/components/ui/BrandedFooter';
import analytics from '@/lib/analytics';

export const SplitHeroLanding: React.FC = () => {
  const handleFamilyClick = () => {
    localStorage.setItem('persona_group', 'family');
    document.cookie = 'persona_group=family;path=/;SameSite=Lax';
    window.dispatchEvent(new CustomEvent('persona-switched', { detail: { group: 'family' } }));
    analytics.track('persona.selected', { group: 'family', source: 'split_hero' });
    analytics.track('hero.cta.clicked', { group: 'family', cta: 'see_how_it_works' });
    window.location.href = '/families';
  };

  const handleProsClick = () => {
    localStorage.setItem('persona_group', 'pro');
    document.cookie = 'persona_group=pro;path=/;SameSite=Lax';
    window.dispatchEvent(new CustomEvent('persona-switched', { detail: { group: 'pro' } }));
    analytics.track('persona.selected', { group: 'pro', source: 'split_hero' });
    analytics.track('hero.cta.clicked', { group: 'pro', cta: 'explore_tools' });
    window.location.href = '/pros';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <BFOHeader showPersonaBanner={false} />
      
      <main className="flex-1">
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6">
                Creator Economy Hub
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive platform for creators and the professionals who serve them
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Creators Card */}
              <PersonaCard
                title="For Creators"
                actions={
                  <>
                    <a 
                      href="/creators"
                      className="bfo-cta px-6 py-3 font-medium w-full text-center"
                      onClick={handleFamilyClick}
                    >
                      Explore Creator Marketplace
                    </a>
                    <a 
                      href="/creators"
                      className="bfo-cta-secondary px-6 py-3 w-full text-center"
                      onClick={handleFamilyClick}
                    >
                      Find Your Niche
                    </a>
                  </>
                }
              >
                <h3 className="text-xl font-semibold text-bfo-gold mb-4">
                  Monetize Your Talent & Protect Your Brand
                </h3>
                <p className="leading-relaxed">
                  From NIL athletes to social media influencers—manage partnerships, protect your likeness, and build wealth with professional support.
                </p>
                <div className="text-sm text-white/60 mt-4">
                  NIL Athletes · Social Media · Entertainment · Sports · Business Leaders
                </div>
              </PersonaCard>

              {/* Creator Professionals Card */}
              <PersonaCard
                title="For Creator Professionals"
                actions={
                  <>
                    <a 
                      href="/pros"
                      className="bfo-cta px-6 py-3 font-medium w-full text-center"
                      onClick={handleProsClick}
                    >
                      Explore Professional Tools
                    </a>
                    <a 
                      href="/pros"
                      className="bfo-cta-secondary px-6 py-3 w-full text-center"
                      onClick={handleProsClick}
                    >
                      Book Creator Demo
                    </a>
                  </>
                }
              >
                <h3 className="text-xl font-semibold text-blue-400 mb-4">
                  Creator Economy Professional Services
                </h3>
                <p className="leading-relaxed mb-4">
                  Specialized tools for professionals serving creators—compliance, monetization, brand protection, and growth management.
                </p>
                <div className="text-sm text-white/60">
                  Creator Financial Advisors · Entertainment Attorneys · Brand Protection · Compliance Specialists
                </div>
              </PersonaCard>
            </div>
          </div>
        </section>
      </main>

      <BrandedFooter />
    </div>
  );
};