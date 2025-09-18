import { PayoutMethod, PayoutLedgerEntry, AthletePayoutProfile } from './types';
import { recordReceipt } from '@/features/receipts/record';

// Mock storage - in production would use Supabase
const payoutProfiles: Map<string, AthletePayoutProfile> = new Map();
const payoutLedger: PayoutLedgerEntry[] = [];

export function getAthletePayoutProfile(athleteId: string): AthletePayoutProfile {
  if (!payoutProfiles.has(athleteId)) {
    const defaultProfile: AthletePayoutProfile = {
      athleteId,
      payoutMethods: [],
      preferences: {
        minimumPayout: 50,
        currency: 'USD'
      }
    };
    payoutProfiles.set(athleteId, defaultProfile);
  }
  return payoutProfiles.get(athleteId)!;
}

export function addPayoutMethod(
  athleteId: string, 
  method: Omit<PayoutMethod, 'id' | 'isDefault'>
): PayoutMethod {
  const profile = getAthletePayoutProfile(athleteId);
  
  const newMethod: PayoutMethod = {
    ...method,
    id: `method_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    isDefault: profile.payoutMethods.length === 0 // First method becomes default
  };
  
  profile.payoutMethods.push(newMethod);
  payoutProfiles.set(athleteId, profile);
  
  return newMethod;
}

export function setDefaultPayoutMethod(athleteId: string, methodId: string): void {
  const profile = getAthletePayoutProfile(athleteId);
  
  profile.payoutMethods.forEach(method => {
    method.isDefault = method.id === methodId;
  });
  
  payoutProfiles.set(athleteId, profile);
}

export async function recordPayout(payout: {
  athleteId: string;
  amount: number;
  methodId: string;
  offerId?: string;
  description: string;
}): Promise<PayoutLedgerEntry> {
  const profile = getAthletePayoutProfile(payout.athleteId);
  const method = profile.payoutMethods.find(m => m.id === payout.methodId);
  
  if (!method) {
    throw new Error('Payout method not found');
  }
  
  const txRef = `payout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const ledgerEntry: PayoutLedgerEntry = {
    id: `ledger_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    date: new Date().toISOString(),
    amount: payout.amount,
    method: method.type,
    methodLast4: method.last4,
    txRef,
    offerId: payout.offerId,
    status: 'completed', // Simulate successful payout
    description: payout.description,
    createdAt: new Date().toISOString()
  };
  
  payoutLedger.push(ledgerEntry);
  
  // Record receipt for audit trail
  await recordReceipt({
    type: 'Payout-RDS',
    action: 'payout.recorded',
    athleteId: payout.athleteId,
    amount: payout.amount,
    method: method.type,
    txRef,
    reasons: [payout.description],
    created_at: new Date().toISOString()
  } as any);
  
  return ledgerEntry;
}

export function getPayoutLedger(athleteId?: string): PayoutLedgerEntry[] {
  if (athleteId) {
    // Filter by athlete if provided
    return payoutLedger.filter(entry => {
      const profile = Array.from(payoutProfiles.values()).find(p => 
        p.payoutMethods.some(m => m.last4 === entry.methodLast4)
      );
      return profile?.athleteId === athleteId;
    });
  }
  return [...payoutLedger];
}

export function exportPayoutLedgerCSV(athleteId?: string): string {
  const entries = getPayoutLedger(athleteId);
  
  const headers = [
    'Date',
    'Amount',
    'Method',
    'Method Last4',
    'Transaction Reference',
    'Offer ID',
    'Status',
    'Description'
  ].join(',');
  
  const rows = entries.map(entry => [
    new Date(entry.date).toLocaleDateString(),
    entry.amount.toFixed(2),
    entry.method,
    entry.methodLast4,
    entry.txRef,
    entry.offerId || '',
    entry.status,
    `"${entry.description}"`
  ].join(','));
  
  return headers + '\n' + rows.join('\n');
}

// Initialize demo data
export function initializeDemoPayoutData(): void {
  const demoAthleteId = 'athlete_demo_001';
  
  // Add demo payout methods
  addPayoutMethod(demoAthleteId, {
    type: 'bank_account',
    last4: '1234',
    metadata: {
      accountName: 'Jordan Mitchell',
      bankName: 'University Credit Union',
      routingNumber: '5678'
    }
  });
  
  addPayoutMethod(demoAthleteId, {
    type: 'paypal',
    last4: '5678',
    metadata: {
      email: 'jordan.mitchell@university.edu'
    }
  });
  
  // Add demo ledger entries
  recordPayout({
    athleteId: demoAthleteId,
    amount: 500.00,
    methodId: getAthletePayoutProfile(demoAthleteId).payoutMethods[0].id,
    offerId: 'offer_brand_partnership_001',
    description: 'Social media campaign - Nike partnership'
  });
  
  recordPayout({
    athleteId: demoAthleteId,
    amount: 250.00,
    methodId: getAthletePayoutProfile(demoAthleteId).payoutMethods[1].id,
    offerId: 'offer_merchandise_001',
    description: 'Merchandise sales commission - Q1'
  });
  
  recordPayout({
    athleteId: demoAthleteId,
    amount: 750.00,
    methodId: getAthletePayoutProfile(demoAthleteId).payoutMethods[0].id,
    description: 'Autograph session appearance fee'
  });
}