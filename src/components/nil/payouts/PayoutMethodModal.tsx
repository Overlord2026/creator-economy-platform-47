import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Building, Mail, FileText } from 'lucide-react';
import { PayoutMethod } from '@/features/nil/payouts/types';
import { addPayoutMethod } from '@/features/nil/payouts/api';
import { toast } from 'sonner';

interface PayoutMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  athleteId: string;
  onMethodAdded: (method: PayoutMethod) => void;
}

export function PayoutMethodModal({ isOpen, onClose, athleteId, onMethodAdded }: PayoutMethodModalProps) {
  const [method, setMethod] = useState<PayoutMethod['type']>('bank_account');
  const [formData, setFormData] = useState({
    accountName: '',
    bankName: '',
    accountLast4: '',
    routingLast4: '',
    email: '',
    checkAddress: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let last4 = '';
      let metadata: any = {};

      switch (method) {
        case 'bank_account':
          if (!formData.accountName || !formData.bankName || !formData.accountLast4) {
            toast.error('Please fill in all required fields');
            return;
          }
          last4 = formData.accountLast4;
          metadata = {
            accountName: formData.accountName,
            bankName: formData.bankName,
            routingNumber: formData.routingLast4
          };
          break;
        case 'paypal':
          if (!formData.email) {
            toast.error('Please enter your PayPal email');
            return;
          }
          last4 = formData.email.slice(-4);
          metadata = { email: formData.email };
          break;
        case 'check':
          if (!formData.accountName || !formData.checkAddress) {
            toast.error('Please fill in all required fields');
            return;
          }
          last4 = formData.checkAddress.slice(-4);
          metadata = {
            accountName: formData.accountName,
            address: formData.checkAddress
          };
          break;
        case 'wire_transfer':
          if (!formData.accountName || !formData.bankName || !formData.accountLast4) {
            toast.error('Please fill in all required fields');
            return;
          }
          last4 = formData.accountLast4;
          metadata = {
            accountName: formData.accountName,
            bankName: formData.bankName,
            routingNumber: formData.routingLast4
          };
          break;
      }

      const newMethod = addPayoutMethod(athleteId, {
        type: method,
        last4,
        metadata
      });

      onMethodAdded(newMethod);
      toast.success('Payout method added successfully');
      onClose();
      resetForm();
    } catch (error) {
      toast.error('Failed to add payout method');
    }
  };

  const resetForm = () => {
    setFormData({
      accountName: '',
      bankName: '',
      accountLast4: '',
      routingLast4: '',
      email: '',
      checkAddress: ''
    });
    setMethod('bank_account');
  };

  const getMethodIcon = (type: PayoutMethod['type']) => {
    switch (type) {
      case 'bank_account':
        return <Building className="w-5 h-5" />;
      case 'paypal':
        return <Mail className="w-5 h-5" />;
      case 'check':
        return <FileText className="w-5 h-5" />;
      case 'wire_transfer':
        return <CreditCard className="w-5 h-5" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Payout Method</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="method">Payout Method</Label>
            <Select value={method} onValueChange={(value: PayoutMethod['type']) => setMethod(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank_account">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Bank Account
                  </div>
                </SelectItem>
                <SelectItem value="paypal">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    PayPal
                  </div>
                </SelectItem>
                <SelectItem value="check">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Check
                  </div>
                </SelectItem>
                <SelectItem value="wire_transfer">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Wire Transfer
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                {getMethodIcon(method)}
                <span className="font-medium capitalize">{method.replace('_', ' ')}</span>
              </div>

              {method === 'bank_account' && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="accountName">Account Holder Name</Label>
                    <Input
                      id="accountName"
                      value={formData.accountName}
                      onChange={(e) => setFormData(prev => ({ ...prev, accountName: e.target.value }))}
                      placeholder="Jordan Mitchell"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                      placeholder="University Credit Union"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountLast4">Account Last 4 Digits</Label>
                    <Input
                      id="accountLast4"
                      value={formData.accountLast4}
                      onChange={(e) => setFormData(prev => ({ ...prev, accountLast4: e.target.value }))}
                      placeholder="1234"
                      maxLength={4}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="routingLast4">Routing Last 4 Digits</Label>
                    <Input
                      id="routingLast4"
                      value={formData.routingLast4}
                      onChange={(e) => setFormData(prev => ({ ...prev, routingLast4: e.target.value }))}
                      placeholder="5678"
                      maxLength={4}
                    />
                  </div>
                </div>
              )}

              {method === 'paypal' && (
                <div>
                  <Label htmlFor="email">PayPal Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="jordan.mitchell@university.edu"
                    required
                  />
                </div>
              )}

              {method === 'check' && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="accountName">Name on Check</Label>
                    <Input
                      id="accountName"
                      value={formData.accountName}
                      onChange={(e) => setFormData(prev => ({ ...prev, accountName: e.target.value }))}
                      placeholder="Jordan Mitchell"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkAddress">Mailing Address</Label>
                    <Input
                      id="checkAddress"
                      value={formData.checkAddress}
                      onChange={(e) => setFormData(prev => ({ ...prev, checkAddress: e.target.value }))}
                      placeholder="123 University Dr, College Town, ST 12345"
                      required
                    />
                  </div>
                </div>
              )}

              {method === 'wire_transfer' && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="accountName">Account Holder Name</Label>
                    <Input
                      id="accountName"
                      value={formData.accountName}
                      onChange={(e) => setFormData(prev => ({ ...prev, accountName: e.target.value }))}
                      placeholder="Jordan Mitchell"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                      placeholder="University Credit Union"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountLast4">Account Last 4 Digits</Label>
                    <Input
                      id="accountLast4"
                      value={formData.accountLast4}
                      onChange={(e) => setFormData(prev => ({ ...prev, accountLast4: e.target.value }))}
                      placeholder="1234"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Method
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}