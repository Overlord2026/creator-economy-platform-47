export interface LoanScenario {
  id: string;
  user_id: string;
  scenario_name: string;
  loan_amount: number;
  interest_rate: number;
  loan_term: number;
  monthly_payment: number;
  total_interest: number;
  created_at: string;
}

export const mockLoanScenarios: LoanScenario[] = [
  {
    id: '1',
    user_id: 'demo-user',
    scenario_name: 'Home Purchase',
    loan_amount: 400000,
    interest_rate: 6.5,
    loan_term: 30,
    monthly_payment: 2528.27,
    total_interest: 510176.20,
    created_at: new Date().toISOString()
  },
  {
    id: '2', 
    user_id: 'demo-user',
    scenario_name: 'Investment Property',
    loan_amount: 300000,
    interest_rate: 7.0,
    loan_term: 25,
    monthly_payment: 2120.34,
    total_interest: 336102.00,
    created_at: new Date().toISOString()
  }
];