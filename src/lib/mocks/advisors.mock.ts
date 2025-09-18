export type Advisor = { id: string; name: string; email: string; firm?: string; created_at?: string };
export const mockAdvisors: Advisor[] = [
  { id: 'A-001', name: 'Jordan Lee', email: 'jordan@firm.co', firm: 'Creator Advisory', created_at: new Date().toISOString() },
  { id: 'A-002', name: 'Riley Perez', email: 'riley@firm.co', firm: 'NIL Partners', created_at: new Date().toISOString() },
];