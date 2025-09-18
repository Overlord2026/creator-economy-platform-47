export type Lead = { id: string; email: string; first_name?: string; last_name?: string; stage?: string; created_at?: string };
export const mockLeads: Lead[] = [
  { id: 'L-001', email: 'sam@example.com', first_name: 'Sam', last_name: 'Taylor', stage: 'new', created_at: new Date().toISOString() },
  { id: 'L-002', email: 'alex@example.com', first_name: 'Alex', last_name: 'Chen', stage: 'engaged', created_at: new Date().toISOString() },
];