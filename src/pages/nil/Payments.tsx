import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Lock, Unlock, Receipt, CheckCircle, CreditCard, Plus } from 'lucide-react';
import { hold, release, getEscrowAccounts, EscrowAccount } from '@/features/nil/payments/api';
import { getOffers } from '@/features/nil/offers/store';
import { acceptNofM } from '@/features/anchor/providers';
import { toast } from 'sonner';
import { PayoutSummaryCards } from '@/components/nil/payouts/PayoutSummaryCards';
import { PayoutLedgerTable } from '@/components/nil/payouts/PayoutLedgerTable';
import { RecordPayoutModal } from '@/components/nil/payouts/RecordPayoutModal';
import { PayoutMethodModal } from '@/components/nil/payouts/PayoutMethodModal';
import { getPayoutLedger, initializeDemoPayoutData } from '@/features/nil/payouts/api';

export default function PaymentsPage() {
  const [escrowAccounts, setEscrowAccounts] = React.useState<EscrowAccount[]>([]);
  const [holdForm, setHoldForm] = React.useState({
    offerId: '',
    amount: 0
  });
  const [isReleasing, setIsReleasing] = React.useState<string | null>(null);
  const [payoutLedger, setPayoutLedger] = React.useState(getPayoutLedger());
  const [recordPayoutOpen, setRecordPayoutOpen] = React.useState(false);
  const [payoutMethodOpen, setPayoutMethodOpen] = React.useState(false);
  
  const athleteId = 'athlete_demo_001'; // In real app, get from auth/context

  const offers = React.useMemo(() => getOffers(), []);

  React.useEffect(() => {
    setEscrowAccounts(getEscrowAccounts());
    initializeDemoPayoutData();
    setPayoutLedger(getPayoutLedger());
  }, []);

  const handleHoldFunds = () => {
    try {
      const { escrowId } = hold(holdForm);
      setEscrowAccounts(getEscrowAccounts());
      
      toast.success('Funds held in escrow', {
        description: `Escrow ID: ${escrowId}`
      });
      
      setHoldForm({ offerId: '', amount: 0 });
    } catch (error) {
      toast.error('Failed to hold funds');
    }
  };

  const handleReleaseFunds = async (escrowId: string) => {
    setIsReleasing(escrowId);
    
    try {
      const { txnId, receipt } = await release(escrowId);
      setEscrowAccounts(getEscrowAccounts());
      
      toast.success('Funds released!', {
        description: `Transaction: ${txnId}`,
        action: {
          label: 'View Receipt',
          onClick: () => console.log('Settlement Receipt:', receipt)
        }
      });
    } catch (error) {
      toast.error('Failed to release funds');
    } finally {
      setIsReleasing(null);
    }
  };

  const getOfferName = (offerId: string) => {
    const offer = offers.find(o => o.id === offerId);
    return offer ? `${offer.brand} - ${offer.category}` : offerId;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Payments & Wallet</h1>
        <p className="text-muted-foreground">
          Manage payments, escrow, and payout methods for NIL deals
        </p>
      </div>

      <Tabs defaultValue="payouts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="payouts">Payouts & Ledger</TabsTrigger>
          <TabsTrigger value="escrow">Escrow</TabsTrigger>
        </TabsList>

        <TabsContent value="payouts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Payout Management</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setPayoutMethodOpen(true)}
                className="flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Add Method
              </Button>
              <Button 
                onClick={() => setRecordPayoutOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Record Payout
              </Button>
            </div>
          </div>

          <PayoutSummaryCards entries={payoutLedger} />
          <PayoutLedgerTable entries={payoutLedger} athleteId={athleteId} />
        </TabsContent>

        <TabsContent value="escrow" className="space-y-6">

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Hold Funds in Escrow
              </CardTitle>
              <CardDescription>
                Securely hold payment until contract completion
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="offer">Select Offer</Label>
                <select
                  id="offer"
                  value={holdForm.offerId}
                  onChange={(e) => setHoldForm(prev => ({ ...prev, offerId: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select an offer</option>
                  {offers.map((offer) => (
                    <option key={offer.id} value={offer.id}>
                      {offer.brand} - {offer.category} (${offer.amount})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={holdForm.amount}
                  onChange={(e) => setHoldForm(prev => ({ ...prev, amount: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>

              <Button 
                onClick={handleHoldFunds}
                className="w-full"
                disabled={!holdForm.offerId || holdForm.amount <= 0}
              >
                Hold in Escrow
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                How Escrow Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</div>
                <p>Funds are held securely in escrow when contract is signed</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</div>
                <p>Athletes complete their obligations (posts, appearances, etc.)</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</div>
                <p>Release funds to distribute according to agreed split percentages</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">4</div>
                <p>Settlement receipt is created and anchored on blockchain</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Escrow Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {escrowAccounts.map((account) => (
                  <div key={account.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{getOfferName(account.offerId)}</p>
                        <p className="text-sm text-muted-foreground">
                          Escrow ID: {account.id.slice(0, 8)}...
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${account.amount}</p>
                        <Badge variant={account.status === 'held' ? 'secondary' : account.status === 'released' ? 'default' : 'destructive'}>
                          {account.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground mb-3">
                      <p>Created: {new Date(account.createdAt).toLocaleString()}</p>
                      {account.releasedAt && (
                        <p>Released: {new Date(account.releasedAt).toLocaleString()}</p>
                      )}
                      {account.txnId && (
                        <p>Transaction: {account.txnId}</p>
                      )}
                    </div>

                    {account.status === 'held' && (
                      <Button
                        onClick={() => handleReleaseFunds(account.id)}
                        disabled={isReleasing === account.id}
                        size="sm"
                        className="w-full"
                      >
                        <Unlock className="h-4 w-4 mr-2" />
                        {isReleasing === account.id ? 'Releasing...' : 'Release Funds'}
                      </Button>
                    )}

                    {account.status === 'released' && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <CheckCircle className="h-4 w-4" />
                          Funds distributed and Settlement-RDS created
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Included ✓
                          </Badge>
                          <span className="text-xs text-muted-foreground">Anchor verified</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {escrowAccounts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Lock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No escrow accounts created yet</p>
                    <p className="text-sm">Hold funds for an offer to get started</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
        </TabsContent>
      </Tabs>

      <RecordPayoutModal
        isOpen={recordPayoutOpen}
        onClose={() => setRecordPayoutOpen(false)}
        athleteId={athleteId}
        onPayoutRecorded={() => setPayoutLedger(getPayoutLedger())}
      />

      <PayoutMethodModal
        isOpen={payoutMethodOpen}
        onClose={() => setPayoutMethodOpen(false)}
        athleteId={athleteId}
        onMethodAdded={() => {}}
      />
    </div>
  );
}