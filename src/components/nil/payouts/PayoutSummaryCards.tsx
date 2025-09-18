import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calendar, CreditCard, DollarSign } from 'lucide-react';
import { PayoutLedgerEntry } from '@/features/nil/payouts/types';

interface PayoutSummaryCardsProps {
  entries: PayoutLedgerEntry[];
}

export function PayoutSummaryCards({ entries }: PayoutSummaryCardsProps) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const calculateSummary = (timeframe: 'all' | 'ytd' | 'mtd') => {
    let filteredEntries = entries.filter(e => e.status === 'completed');
    
    if (timeframe === 'ytd') {
      filteredEntries = filteredEntries.filter(e => new Date(e.date) >= startOfYear);
    } else if (timeframe === 'mtd') {
      filteredEntries = filteredEntries.filter(e => new Date(e.date) >= startOfMonth);
    }
    
    return {
      total: filteredEntries.reduce((sum, entry) => sum + entry.amount, 0),
      count: filteredEntries.length
    };
  };

  const allTime = calculateSummary('all');
  const ytd = calculateSummary('ytd');
  const mtd = calculateSummary('mtd');

  const summaryCards = [
    {
      title: 'YTD Earnings',
      amount: ytd.total,
      count: ytd.count,
      icon: Calendar,
      timeframe: 'This Year',
      variant: 'default' as const
    },
    {
      title: 'MTD Earnings',
      amount: mtd.total,
      count: mtd.count,
      icon: TrendingUp,
      timeframe: 'This Month',
      variant: 'secondary' as const
    },
    {
      title: 'All-Time Earnings',
      amount: allTime.total,
      count: allTime.count,
      icon: DollarSign,
      timeframe: 'Total',
      variant: 'outline' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {summaryCards.map((card, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${card.amount.toFixed(2)}
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                {card.count} payment{card.count !== 1 ? 's' : ''} • {card.timeframe}
              </p>
              {card.count > 0 && (
                <Badge variant={card.variant} className="text-xs">
                  Active
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}