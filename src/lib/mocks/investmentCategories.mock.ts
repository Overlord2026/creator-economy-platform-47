export interface InvestmentCategory {
  id: string;
  name: string;
  description: string;
  risk_level: 'low' | 'medium' | 'high';
  min_investment: number;
  expected_return: number;
  created_at: string;
}

export const mockInvestmentCategories: InvestmentCategory[] = [
  {
    id: 'cat-1',
    name: 'Conservative Portfolio',
    description: 'Low-risk investments focused on capital preservation',
    risk_level: 'low',
    min_investment: 10000,
    expected_return: 4.5,
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-2',
    name: 'Balanced Growth',
    description: 'Moderate risk with balanced approach to growth and income',
    risk_level: 'medium',
    min_investment: 25000,
    expected_return: 7.2,
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-3',
    name: 'Aggressive Growth',
    description: 'High-growth potential investments for long-term wealth building',
    risk_level: 'high',
    min_investment: 50000,
    expected_return: 10.8,
    created_at: new Date().toISOString()
  }
];