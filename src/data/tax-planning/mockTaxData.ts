
import React from 'react';
import { 
  Landmark, 
  BookOpen, 
  FileText, 
  Calendar,
  CheckCircle
} from 'lucide-react';

export interface TaxDeduction {
  id: string;
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface TaxDeadline {
  id: string;
  date: string;
  title: string;
  description: string;
  daysLeft: number;
}

export interface TaxFiling {
  id: string;
  year: string;
  status: 'Completed' | 'In Progress' | 'Not Started';
  dueDate: string;
  filedDate?: string;
  refundAmount?: number;
  taxPaid?: number;
}

export interface TaxCredit {
  id: string;
  name: string;
  description: string;
  estimatedValue: number;
  icon: string;
  eligibility: 'Eligible' | 'Potentially Eligible' | 'Not Eligible';
  statusDescription: string;
}

export interface TaxTip {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  readMoreUrl?: string;
}

export const mockDeductions: TaxDeduction[] = [
  {
    id: 'deduction-1',
    category: 'Mortgage Interest',
    amount: 12500,
    percentage: 38,
    color: 'blue'
  },
  {
    id: 'deduction-2',
    category: 'Charitable Donations',
    amount: 5800,
    percentage: 18,
    color: 'green'
  },
  {
    id: 'deduction-3',
    category: 'Property Taxes',
    amount: 7200,
    percentage: 22,
    color: 'violet'
  },
  {
    id: 'deduction-4',
    category: 'Medical Expenses',
    amount: 3400,
    percentage: 10,
    color: 'red'
  },
  {
    id: 'deduction-5',
    category: 'State Income Taxes',
    amount: 4100,
    percentage: 12,
    color: 'amber'
  }
];

export const mockTaxDeadlines: TaxDeadline[] = [
  {
    id: 'deadline-1',
    date: '2025-04-15',
    title: 'Federal Income Tax Filing Deadline',
    description: 'Last day to file your federal income tax return for the previous year or request an extension.',
    daysLeft: 10
  },
  {
    id: 'deadline-2',
    date: '2025-06-15', 
    title: 'Quarterly Estimated Taxes (Q2)',
    description: 'Second quarter estimated tax payment due for the current tax year.',
    daysLeft: 71
  },
  {
    id: 'deadline-3',
    date: '2025-09-15',
    title: 'Quarterly Estimated Taxes (Q3)',
    description: 'Third quarter estimated tax payment due for the current tax year.',
    daysLeft: 163
  },
  {
    id: 'deadline-4',
    date: '2024-12-31',
    title: 'Year-End Tax Planning Deadline',
    description: 'Last day to make financial decisions that will impact your current tax year return.',
    daysLeft: 270
  }
];

export const mockTaxFilings: TaxFiling[] = [
  {
    id: 'filing-1',
    year: '2024',
    status: 'In Progress',
    dueDate: '2025-04-15',
    taxPaid: 0
  },
  {
    id: 'filing-2',
    year: '2023',
    status: 'Completed',
    dueDate: '2024-04-15',
    filedDate: '2024-04-01',
    refundAmount: 3250,
    taxPaid: 28750
  },
  {
    id: 'filing-3',
    year: '2022',
    status: 'Completed',
    dueDate: '2023-04-15',
    filedDate: '2023-04-10',
    refundAmount: 1850,
    taxPaid: 26400
  }
];

export const mockTaxCredits: TaxCredit[] = [
  {
    id: 'credit-1',
    name: 'Child Tax Credit',
    description: 'Credit for qualifying children under 17',
    estimatedValue: 2000,
    icon: 'child',
    eligibility: 'Eligible',
    statusDescription: 'Based on reported dependents'
  },
  {
    id: 'credit-2',
    name: 'Retirement Savings Contribution Credit',
    description: 'Credit for contributions to retirement accounts',
    estimatedValue: 1000,
    icon: 'piggy-bank',
    eligibility: 'Potentially Eligible',
    statusDescription: 'Based on retirement contributions'
  },
  {
    id: 'credit-3',
    name: 'Energy Efficiency Home Credit',
    description: 'Credit for energy-efficient improvements',
    estimatedValue: 500,
    icon: 'zap',
    eligibility: 'Not Eligible',
    statusDescription: 'No qualifying improvements reported'
  }
];

// Function to get icon component by name
export const getIconComponent = (iconName: string): React.ReactNode => {
  switch (iconName) {
    case 'landmark':
      return <Landmark size={20} />;
    case 'book':
      return <BookOpen size={20} />;
    case 'file':
      return <FileText size={20} />;
    case 'calendar':
      return <Calendar size={20} />;
    case 'check':
      return <CheckCircle size={20} />;
    default:
      return <FileText size={20} />;
  }
};

export const mockTaxTips: TaxTip[] = [
  {
    id: 'tip-1',
    title: 'Maximize Retirement Contributions',
    description: 'Contributing to tax-advantaged retirement accounts like 401(k)s and IRAs can lower your taxable income.',
    icon: 'landmark',
    category: 'Retirement'
  },
  {
    id: 'tip-2',
    title: 'Harvest Tax Losses',
    description: 'Consider selling investments that have lost value to offset capital gains and reduce your tax burden.',
    icon: 'file',
    category: 'Investments'
  },
  {
    id: 'tip-3',
    title: 'Bunch Itemized Deductions',
    description: 'Consider "bunching" deductions by paying for two years of deductible expenses in one calendar year.',
    icon: 'calendar',
    category: 'Deductions'
  },
  {
    id: 'tip-4',
    title: 'Qualified Charitable Distributions',
    description: 'If you're over 70½, consider making charitable donations directly from your IRA to satisfy RMDs tax-free.',
    icon: 'check',
    category: 'Charitable Giving'
  }
];

// Tax bracket data
export const taxBracketData = {
  currentBracket: "24% Bracket",
  estimatedLiability: 42500,
  potentialSavings: 7800,
  yearOverYearChange: -2350
};

// Tax strategies
export interface TaxStrategy {
  id: string;
  title: string;
  description: string;
  impact: number;
  icon: string;
  status: 'implemented' | 'pending' | 'recommended';
}

export const taxStrategies: TaxStrategy[] = [
  {
    id: 'strategy-1',
    title: 'Max 401(k) Contributions',
    description: 'Increase your tax-deferred retirement contributions to reduce taxable income.',
    impact: 5680,
    icon: 'landmark',
    status: 'implemented'
  },
  {
    id: 'strategy-2',
    title: 'Tax Loss Harvesting',
    description: 'Offset capital gains with strategic selling of investments that have experienced losses.',
    impact: 3200,
    icon: 'file',
    status: 'pending'
  },
  {
    id: 'strategy-3',
    title: 'Charitable Giving',
    description: 'Donate appreciated assets to charity to avoid capital gains tax.',
    impact: 2100,
    icon: 'check',
    status: 'recommended'
  },
  {
    id: 'strategy-4',
    title: 'HSA Contributions',
    description: 'Maximize Health Savings Account contributions for triple tax advantages.',
    impact: 1850,
    icon: 'landmark',
    status: 'recommended'
  }
];

// Tax deadlines (duplicating mockTaxDeadlines with a different export name for consistency)
export const taxDeadlines = mockTaxDeadlines;

// Deduction categories (duplicating mockDeductions with a different export name for consistency)
export const deductionCategories = mockDeductions;
