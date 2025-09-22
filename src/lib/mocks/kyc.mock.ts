export type KycRecord = {
  id: string;
  subject_email: string;
  status: 'pending' | 'verified' | 'rejected';
  provider?: 'trulioo' | 'persona' | 'stub';
  created_at: string;
  updated_at?: string;
};

export const mockKyc: KycRecord[] = [
  { id: 'KYC-001', subject_email: 'demo@creator.co', status: 'verified', provider: 'stub', created_at: new Date().toISOString() },
  { id: 'KYC-002', subject_email: 'pilot@creator.co', status: 'pending', provider: 'stub', created_at: new Date().toISOString() },
];
