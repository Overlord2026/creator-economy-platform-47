// Mock state for proof receipts

interface Proof {
  id: string;
  title: string;
  items: { label: string; value: string }[];
  timestamp: string;
  hash: string;
}

let proofs: Proof[] = [];

// Load proofs from localStorage on module init
try {
  const stored = localStorage.getItem('creator_proofs');
  if (stored) {
    proofs = JSON.parse(stored);
  }
} catch (error) {
  console.warn('Failed to load proofs from storage:', error);
}

export function addProof(proof: Omit<Proof, 'id'>) {
  const newProof: Proof = {
    ...proof,
    id: `proof_${Date.now()}_${Math.random().toString(16).slice(2)}`
  };
  
  proofs.unshift(newProof);
  
  try {
    localStorage.setItem('creator_proofs', JSON.stringify(proofs));
  } catch (error) {
    console.warn('Failed to save proofs to storage:', error);
  }
  
  return newProof;
}

export function getProofs(): Proof[] {
  return [...proofs];
}

export function clearProofs() {
  proofs = [];
  localStorage.removeItem('creator_proofs');
}

// Helper to check if escrow is complete
export function isEscrowComplete(): boolean {
  const hasFunded = proofs.some(p => p.title.includes('Escrow Funded'));
  const hasReleased = proofs.some(p => p.title.includes('Escrow Released'));
  return hasFunded && hasReleased;
}

export { proofs };