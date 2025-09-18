import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/ui/card';
import { Button } from '../../../src/components/ui/button';
import { Alert, AlertDescription } from '../../../src/components/ui/alert';
import { Badge } from '../../../src/components/ui/badge';
import { getCurrentOffer, setOfferChecks, signOffer } from '../state/offer.mock';
import { getCompliance, allPassed } from '../state/compliance.mock';
import { addProof } from '../state/proofs.mock';
import { makeProof } from '../components/ProofSlip';
import { AlertTriangle, CheckCircle2, Lock, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export function OfferLock() {
  const navigate = useNavigate();
  const [offer, setOffer] = useState(getCurrentOffer());
  const [compliance, setCompliance] = useState(getCompliance());
  const [isRunningChecks, setIsRunningChecks] = useState(false);

  useEffect(() => {
    setOffer(getCurrentOffer());
    setCompliance(getCompliance());
  }, []);

  const canRunChecks = allPassed() && offer.brief && !offer.checksCompleted;
  const canSign = offer.checksCompleted && !offer.signed;

  const handleRunChecks = async () => {
    if (!canRunChecks) return;
    
    setIsRunningChecks(true);
    
    // Simulate smart checks
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setOfferChecks(true, 'All smart checks passed: compliance verified, content approved, payment terms validated');
    
    const proof = makeProof('Smart Checks Passed', [
      { label: 'Brief Title', value: offer.brief?.title || 'N/A' },
      { label: 'Brand', value: offer.brief?.brand || 'N/A' },
      { label: 'Checks Status', value: 'PASSED' },
      { label: 'Compliance', value: 'VERIFIED' }
    ]);
    
    addProof(proof);
    setOffer(getCurrentOffer());
    setIsRunningChecks(false);
    
    toast.success('Smart checks completed successfully!');
  };

  const handleSign = () => {
    signOffer();
    
    const proof = makeProof('Offer Signed', [
      { label: 'Brief Title', value: offer.brief?.title || 'N/A' },
      { label: 'Brand', value: offer.brief?.brand || 'N/A' },
      { label: 'Signature Status', value: 'SIGNED' },
      { label: 'Legal Status', value: 'BINDING' }
    ]);
    
    addProof(proof);
    
    toast.success('Offer signed successfully!');
    navigate('/creator/deal/123');
  };

  if (!offer.brief) {
    return (
      <div className="max-w-2xl mx-auto">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            No brief found. Please <a href="/creator" className="underline">create a brief</a> first.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Offer Lock</h1>
        <p className="text-muted-foreground mt-2">
          Run smart checks and sign your verified offer.
        </p>
      </div>

      {/* Brief Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Brief Summary
            <Badge variant={offer.checksCompleted ? "default" : "secondary"}>
              {offer.checksCompleted ? "Verified" : "Pending"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Title:</dt>
              <dd className="font-medium">{offer.brief.title}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Brand:</dt>
              <dd className="font-medium">{offer.brief.brand}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Compensation:</dt>
              <dd className="font-medium">${offer.brief.compensation.toLocaleString()}</dd>
            </div>
            {offer.brief.startDate && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Duration:</dt>
                <dd className="font-medium">{offer.brief.startDate} to {offer.brief.endDate}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      {/* Compliance Check */}
      {!allPassed() && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Compliance gates must be completed before running smart checks.</span>
            <Button variant="outline" size="sm" asChild>
              <a href="/creator/compliance">
                <ExternalLink className="h-3 w-3 mr-1" />
                Complete Compliance
              </a>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Smart Checks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Smart Checks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {offer.checksCompleted ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm font-medium">All checks passed</span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Run automated verification of compliance, content, and payment terms.
            </p>
          )}
          
          {offer.checkNotes && (
            <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
              {offer.checkNotes}
            </p>
          )}

          <Button 
            onClick={handleRunChecks}
            disabled={!canRunChecks || isRunningChecks}
            className="w-full"
          >
            {isRunningChecks ? 'Running Checks...' : 'Run Smart Checks'}
          </Button>
        </CardContent>
      </Card>

      {/* Sign Button */}
      {canSign && (
        <Card>
          <CardHeader>
            <CardTitle>Ready to Sign</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              All checks have passed. You can now sign this offer to make it legally binding.
            </p>
            <Button onClick={handleSign} className="w-full" size="lg">
              Sign Offer
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}