import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Alert, AlertDescription } from 'src/components/ui/alert';
import { addProof, getProofs } from '../state/proofs.mock';
import { makeProof } from '../components/ProofSlip';
import { DollarSign, CheckCircle2, ArrowLeft, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function Payout() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const amount = Number(searchParams.get('amount')) || 0;
  const splits = searchParams.get('splits') ? JSON.parse(decodeURIComponent(searchParams.get('splits')!)) : [];
  
  const [proofs, setProofs] = useState(getProofs());
  const [escrowFunded, setEscrowFunded] = useState(false);
  const [escrowReleased, setEscrowReleased] = useState(false);

  useEffect(() => {
    const currentProofs = getProofs();
    setProofs(currentProofs);
    setEscrowFunded(currentProofs.some(p => p.title.includes('Escrow Funded')));
    setEscrowReleased(currentProofs.some(p => p.title.includes('Escrow Released')));
  }, []);

  const handleFundEscrow = () => {
    const proof = makeProof('Escrow Funded', [
      { label: 'Deal ID', value: id || 'N/A' },
      { label: 'Amount', value: `$${amount.toLocaleString()}` },
      { label: 'Status', value: 'FUNDED' },
      { label: 'Funding Source', value: 'Brand Account' }
    ]);
    
    addProof(proof);
    setEscrowFunded(true);
    setProofs(getProofs());
    
    toast.success('Escrow funded successfully!');
  };

  const handleReleaseEscrow = () => {
    const proof = makeProof('Escrow Released', [
      { label: 'Deal ID', value: id || 'N/A' },
      { label: 'Amount', value: `$${amount.toLocaleString()}` },
      { label: 'Status', value: 'RELEASED' },
      { label: 'Released To', value: 'Creator Wallet' }
    ]);
    
    addProof(proof);
    setEscrowReleased(true);
    setProofs(getProofs());
    
    toast.success('Escrow released successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(`/creator/deal/${id}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Deal
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payout #{id}</h1>
          <p className="text-muted-foreground mt-2">
            Escrow management and payout processing
          </p>
        </div>
      </div>

      {/* Escrow Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Escrow Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-medium">Total Amount:</span>
              <span className="font-bold">${amount.toLocaleString()}</span>
            </div>
            
            {splits.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Payment Splits:</h4>
                <div className="space-y-1 text-sm">
                  {splits.map((split: any, index: number) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-muted-foreground">{split.party}:</span>
                      <span>{split.percentage}% (${(amount * split.percentage / 100).toLocaleString()})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Escrow Status */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Fund Escrow
              {escrowFunded && (
                <Badge variant="default">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Funded
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {escrowFunded ? 
                'Escrow has been funded and is secure.' : 
                'Fund the escrow account to secure payment.'
              }
            </p>
            <Button 
              onClick={handleFundEscrow}
              disabled={escrowFunded}
              className="w-full"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              {escrowFunded ? 'Funded' : 'Fund Escrow'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Release Payment
              {escrowReleased && (
                <Badge variant="default">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Released
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {escrowReleased ? 
                'Payment has been released to creator.' : 
                'Release payment after work completion.'
              }
            </p>
            <Button 
              onClick={handleReleaseEscrow}
              disabled={!escrowFunded || escrowReleased}
              className="w-full"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {escrowReleased ? 'Released' : 'Release Payment'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Status Alert */}
      {escrowFunded && escrowReleased && (
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            Escrow process completed successfully. Payment has been released and deal is finalized.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}