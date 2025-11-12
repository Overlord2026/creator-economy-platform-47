import { useState } from 'react';
import { X, User, Briefcase, Trophy, ArrowRight, CheckCircle } from 'lucide-react';

interface PersonaChooserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChoose: (persona: string) => void;
}

export default function PersonaChooserModal({ isOpen, onClose, onChoose }: PersonaChooserModalProps) {
  if (!isOpen) return null;

  const personas = [
    {
      id: 'creator',
      label: 'Athlete / Creator',
      icon: Trophy,
      description: 'Sign NIL deals, manage offers, get paid safely',
      features: ['Free workspace', 'OfferLock protection', 'Instant payouts', 'Compliance checks'],
      highlight: true
    },
    {
      id: 'coach',
      label: 'Coach / School',
      icon: User,
      description: 'Oversee team NIL activities while staying compliant',
      features: ['Team dashboard', 'Deal oversight', 'Policy enforcement', 'Reporting tools']
    },
    {
      id: 'pro',
      label: 'Brand / Agency',
      icon: Briefcase,
      description: 'Launch campaigns, find talent, track deliverables',
      features: ['Campaign briefs', 'Talent matching', 'Approval workflows', 'Usage rights']
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="persona-chooser-title"
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl bg-gradient-to-br from-[#0B2239] to-[#0a1929] border border-white/20 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[var(--gold)]/10 to-transparent pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white transition-all"
          aria-label="Close persona chooser"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative p-8 md:p-12">
          <div className="mb-10 text-center">
            <h2 id="persona-chooser-title" className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Choose Your Role
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
              Select the option that best describes you to get started with the right tools.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            {personas.map((persona) => {
              const Icon = persona.icon;
              const isHighlight = persona.highlight;
              return (
                <button
                  key={persona.id}
                  onClick={() => {
                    onChoose(persona.id);
                    onClose();
                  }}
                  className={`group relative rounded-xl border ${
                    isHighlight
                      ? 'border-[var(--gold)]/50 bg-gradient-to-br from-[var(--gold)]/10 to-transparent'
                      : 'border-white/10 bg-white/5'
                  } p-8 text-left transition-all hover:border-[var(--gold)] hover:scale-105 hover:shadow-2xl hover:shadow-[var(--gold)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 focus:ring-offset-[#0B2239]`}
                >
                  {isHighlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--gold)] text-black text-xs font-bold">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="mb-6 inline-flex rounded-xl bg-[var(--gold)]/20 p-4 text-[var(--gold)] group-hover:bg-[var(--gold)]/30 transition-all">
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{persona.label}</h3>
                  <p className="text-white/70 mb-6 leading-relaxed">{persona.description}</p>

                  <ul className="space-y-3 mb-6">
                    {persona.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-white/80">
                        <CheckCircle className="h-5 w-5 text-[var(--gold)] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--gold)] group-hover:gap-3 transition-all">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-center pt-4 border-t border-white/10">
            <p className="text-sm text-white/60">
              Not sure which to choose? <a href="/personas" onClick={onClose} className="text-[var(--gold)] hover:underline font-semibold">Compare all roles</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
