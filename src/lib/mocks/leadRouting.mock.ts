export type RoutingRule = {
  id: string;
  rule_name: string;
  criteria: Record<string, unknown>;
  preferred_partners: string[];
  weight_score: number;
  is_active: boolean;
  created_at?: string;
};

export type RoutingDecision = {
  id: string;
  lead_id: string;
  rule_id: string;
  routed_to: string;
  reason?: string;
  created_at?: string;
};

export const mockRules: RoutingRule[] = [
  { id: 'RR-001', rule_name: 'High income → Pro A', criteria: { income_gt: 150000 }, preferred_partners: ['Pro A'], weight_score: 0.9, is_active: true, created_at: new Date().toISOString() },
];

export const mockDecisions: RoutingDecision[] = [
  { id: 'RD-001', lead_id: 'L-001', rule_id: 'RR-001', routed_to: 'Pro A', reason: 'income_gt', created_at: new Date().toISOString() },
];
