export interface PayoutMethod {
  id: string;
  type: 'bank_account' | 'paypal' | 'check' | 'wire_transfer';
  last4: string;
  isDefault: boolean;
  metadata: {
    accountName?: string;
    bankName?: string;
    email?: string;
    routingNumber?: string; // Only store last 4 for security
  };
}

export interface PayoutLedgerEntry {
  id: string;
  date: string;
  amount: number;
  method: PayoutMethod['type'];
  methodLast4: string;
  txRef: string;
  offerId?: string;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  createdAt: string;
}

export interface AthletePayoutProfile {
  athleteId: string;
  payoutMethods: PayoutMethod[];
  preferences: {
    defaultMethod?: string;
    minimumPayout: number;
    currency: string;
  };
}