export type Tier = {
  id: string;
  name: string;
  price: string;
  blurb?: string;
  features: string[];
  cta?: { label: string; href: string };
};

export const TIERS: Tier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$0',
    blurb: 'Good for trying it out.',
    features: ['Basic dashboard', 'Email support', '1 project'],
    cta: { label: 'Get Started', href: '/signup?plan=starter' },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29/mo',
    blurb: 'Best for creators growing revenue.',
    features: ['Everything in Starter', 'Advanced analytics', 'Priority support'],
    cta: { label: 'Upgrade to Pro', href: '/signup?plan=pro' },
  },
  {
    id: 'org',
    name: 'Organization',
    price: 'Contact',
    blurb: 'Teams, multi-brand, SSO.',
    features: ['SSO & roles', 'Custom SLAs', 'Dedicated success'],
    cta: { label: 'Talk to Sales', href: '/contact?plan=org' },
  },
];

export type Badge = { id: string; label: string; tone?: 'success'|'info'|'warning'|'neutral' };
export const BADGES: Badge[] = [
  { id: 'starter', label: 'Free' , tone: 'neutral' },
  { id: 'pro',     label: 'Most Popular', tone: 'success' },
  { id: 'org',     label: 'Custom', tone: 'info' },
];
