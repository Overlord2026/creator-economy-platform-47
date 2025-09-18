import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Building, Mail, FileText, CreditCard } from 'lucide-react';
import { PayoutMethod, PayoutLedgerEntry } from '@/features/nil/payouts/types';
import { getAthletePayoutProfile, recordPayout } from '@/features/nil/payouts/api';
import { toast } from 'sonner';

interface RecordPayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  athleteId: string;
  onPayoutRecorded: (entry: PayoutLedgerEntry) => void;
}

export function RecordPayoutModal({ isOpen, onClose, athleteId, onPayoutRecorded }: RecordPayoutModalProps) {
  const [profile, setProfile] = useState(getAthletePayoutProfile(athleteId));
  const [formData, setFormData] = useState({
    methodId: '',
    amount: '',
    offerId: '',
    description: ''
  });

  useEffect(() => {
    if (isOpen) {
      const currentProfile = getAthletePayoutProfile(athleteId);
      setProfile(currentProfile);
      
      // Set default method if available
      const defaultMethod = currentProfile.payoutMethods.find(m => m.isDefault);
      if (defaultMethod && !formData.methodId) {
        setFormData(prev => ({ ...prev, methodId: defaultMethod.id }));
      }
    }
  }, [isOpen, athleteId, formData.methodId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!formData.methodId || !formData.amount || !formData.description) {
        toast.error('Please fill in all required fields');
        return;
      }

      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        toast.error('Please enter a valid amount');
        return;
      }

      const payoutData = {
        athleteId,
        amount,
        methodId: formData.methodId,
        offerId: formData.offerId || undefined,
        description: formData.description
      };

      const ledgerEntry = await recordPayout(payoutData);
      onPayoutRecorded(ledgerEntry);
      
      toast.success('Payout recorded successfully', {
        description: `$${amount.toFixed(2)} recorded to ledger`
      });
      
      onClose();
      resetForm();
    } catch (error) {
      toast.error('Failed to record payout');
    }
  };

  const resetForm = () => {
    setFormData({
      methodId: profile.payoutMethods.find(m => m.isDefault)?.id || '',
      amount: '',
      offerId: '',
      description: ''
    });
  };

  const getMethodIcon = (type: PayoutMethod['type']) => {
    switch (type) {
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

  const getMethodLabel = (method: PayoutMethod) => {
    const baseLabel = method.type.replace('_', ' ').split(' ').map(w => 
      w.charAt(0).toUpperCase() + w.slice(1)
    ).join(' ');
    
    let details = '';
    switch (method.type) {
      case 'bank_account':
        details = `${method.metadata.bankName} •••${method.last4}`;
        break;
      case 'paypal':
        details = `${method.metadata.email}`;
        break;
      case 'check':
        details = `Mail to •••${method.last4}`;
        break;
      case 'wire_transfer':
        details = `${method.metadata.bankName} •••${method.last4}`;
        break;
    }
    
    return `${baseLabel} - ${details}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Record Payout</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="method">Payout Method</Label>
            {profile.payoutMethods.length === 0 ? (
              <div className="p-3 border rounded-md text-center text-sm text-muted-foreground">
                No payout methods configured
              </div>
            ) : (
              <Select 
                value={formData.methodId} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, methodId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payout method" />
                </SelectTrigger>
                <SelectContent>
                  {profile.payoutMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      <div className="flex items-center gap-2">
                        {getMethodIcon(method.type)}
                        <span className="text-sm">{getMethodLabel(method)}</span>
                        {method.isDefault && (
                          <Badge variant="secondary" className="text-xs">Default</Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div>
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <Label htmlFor="offerId">Offer ID (Optional)</Label>
            <Input
              id="offerId"
              value={formData.offerId}
              onChange={(e) => setFormData(prev => ({ ...prev, offerId: e.target.value }))}
              placeholder="offer_brand_partnership_001"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Social media campaign payment, merchandise commission, etc."
              rows={3}
              required
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={profile.payoutMethods.length === 0}
            >
              Record Payout
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}