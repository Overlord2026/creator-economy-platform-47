export type Segment = 'creators' | 'schools';
export const landing = {
  hero: {
    h1A: 'Deals that protect your people and your privacy.',
    h1B: 'Lock the deal. Sign once. Prove everything—privately.',
    sub: 'One workspace to lock offers, route approvals, e-sign the same contract, and keep private, verifiable receipts of every step.',
    bullets: ['Privacy by default','Approvals on rails','Audit-ready receipts'],
    ctaCreators: { label: 'Start free workspace', to: '/onboarding' },
    ctaSchools:  { label: 'Request demo',        to: '/nil' },
    ctaSecondary:{ label: 'Watch 60-sec overview', to: '/nil' },
    defaultSegment: 'creators' as Segment
  },
  features: [
    {title:'OfferLock', body:'No surprises. Route approvals before e-sign.'},
    {title:'E-Sign',    body:'Everyone signs the same deal, the right way.'},
    {title:'Settlement',body:'Payouts & deliverables with a private receipt.'},
    {title:'Verifier',  body:'Status-only checks; no private payloads.'},
  ],
  trust: [
    {title:'Policy gates', body:'Approvers give a reason before actions run.'},
    {title:'Content-free receipts', body:'Proofs without exposing content or $.'},
    {title:'Write-once vault & legal hold', body:'Tamper-resistant history; export for audits.'},
    {title:'Multiple anchors', body:'Verification that doesn’t rely on one system.'},
  ],
  quotes: [
    {q:'“My coach saw approvals; my parents didn’t see $.”', by:'College Athlete'},
    {q:'“Finance finally had clean receipts.”', by:'Buyer, DTC Brand'}
  ],
  metrics: [
    {k:'Workspaces', v:'—'}, {k:'Deals', v:'—'},
    {k:'Avg e-sign', v:'—'}, {k:'Receipts verified', v:'—'}
  ]
};
