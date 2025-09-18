import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building, Mail, FileText, CreditCard, Download, ExternalLink } from 'lucide-react';
import { PayoutLedgerEntry } from '@/features/nil/payouts/types';
import { exportPayoutLedgerCSV } from '@/features/nil/payouts/api';
import { toast } from 'sonner';

interface PayoutLedgerTableProps {
  entries: PayoutLedgerEntry[];
  athleteId?: string;
  showExport?: boolean;
}

export function PayoutLedgerTable({ entries, athleteId, showExport = true }: PayoutLedgerTableProps) {
  const handleExportCSV = () => {
    try {
      const csvData = exportPayoutLedgerCSV(athleteId);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `payout_ledger_${athleteId || 'all'}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Payout ledger exported successfully');
    } catch (error) {
      toast.error('Failed to export ledger');
    }
  };

  const getMethodIcon = (method: PayoutLedgerEntry['method']) => {
    switch (method) {
      case 'bank_account':
        return <Building className="w-4 h-4" />;
      case 'paypal':
        return <Mail className="w-4 h-4" />;
      case 'check':
        return <FileText className="w-4 h-4" />;
      case 'wire_transfer':
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: PayoutLedgerEntry['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
    }
  };

  const calculateSummary = () => {
    const total = entries.reduce((sum, entry) => sum + entry.amount, 0);
    const completedEntries = entries.filter(e => e.status === 'completed');
    const completedAmount = completedEntries.reduce((sum, entry) => sum + entry.amount, 0);
    
    return {
      total: entries.length,
      completed: completedEntries.length,
      totalAmount: total,
      completedAmount
    };
  };

  const summary = calculateSummary();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Payout Ledger</CardTitle>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span>{summary.total} total payouts</span>
              <span>{summary.completed} completed</span>
              <span className="font-medium">${summary.completedAmount.toFixed(2)} total paid</span>
            </div>
          </div>
          {showExport && entries.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No payouts recorded yet</p>
            <p className="text-sm">Recorded payouts will appear here</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(entry.date).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(entry.date).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        ${entry.amount.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getMethodIcon(entry.method)}
                        <div>
                          <div className="text-sm capitalize">
                            {entry.method.replace('_', ' ')}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            •••{entry.methodLast4}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(entry.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm max-w-[200px] truncate" title={entry.description}>
                        {entry.description}
                      </div>
                      {entry.offerId && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          {entry.offerId}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-mono text-muted-foreground">
                        {entry.txRef}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}