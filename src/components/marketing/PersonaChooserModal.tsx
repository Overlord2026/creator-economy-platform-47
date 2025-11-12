import { useState } from 'react';
import { X, User, Briefcase, Trophy } from 'lucide-react';

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
      features: ['Free workspace', 'OfferLock protection', 'Instant payouts', 'Compliance checks']
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="persona-chooser-title"
    >
      <div
        className="relative mx-4 w-full max-w-4xl rounded-xl bg-[#0B2239] border border-white/10 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
          aria-label="Close persona chooser"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-8 text-center">
          <h2 id="persona-chooser-title" className="text-3xl font-bold mb-3">Choose Your Role</h2>
          <p className="text-white/70 text-lg">
            Select the option that best describes you to get started with the right tools.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {personas.map((persona) => {
            const Icon = persona.icon;
            return (
              <button
                key={persona.id}
                onClick={() => {
                  onChoose(persona.id);
                  onClose();
                }}
                className="group relative rounded-lg border border-white/10 bg-white/5 p-6 text-left transition-all hover:border-[var(--gold)] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 focus:ring-offset-[#0B2239]"
              >
                <div className="mb-4 inline-flex rounded-lg bg-[var(--gold)]/20 p-3 text-[var(--gold)] group-hover:bg-[var(--gold)]/30">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{persona.label}</h3>
                <p className="text-white/70 text-sm mb-4">{persona.description}</p>
                <ul className="space-y-1">
                  {persona.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="text-[var(--gold)] mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-sm font-semibold text-[var(--gold)] group-hover:underline">
                  Get Started →
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-white/60">
            Not sure which to choose? <a href="/personas" className="text-[var(--gold)] hover:underline">Compare all roles</a>
          </p>
        </div>
      </div>
    </div>
  );
}
