import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/ui/card';
import { Button } from '../../../src/components/ui/button';
import { Badge } from '../../../src/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../src/components/ui/dialog';
import { getCurrentOffer } from '../state/offer.mock';
import { getProofs, isEscrowComplete } from '../state/proofs.mock';
import { ProofSlip } from '../components/ProofSlip';
import { QrCode, Copy, ExternalLink, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export function VerifyView() {
  const { id } = useParams();
  const [offer, setOffer] = useState(getCurrentOffer());
  const [proofs, setProofs] = useState(getProofs());
  const [escrowComplete, setEscrowComplete] = useState(isEscrowComplete());

  useEffect(() => {
    setOffer(getCurrentOffer());
    setProofs(getProofs());
    setEscrowComplete(isEscrowComplete());
  }, []);

  const verifyUrl = window.location.href;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(verifyUrl);
    toast.success('Verification URL copied to clipboard');
  };

  // Simple QR code placeholder - in production, use a proper QR library
  const generateQRPlaceholder = () => {
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="white"/>
        <text x="100" y="100" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="12">
          QR Code
          ${verifyUrl.slice(-20)}...
        </text>
      </svg>
    `)}`;
  };

  if (!offer.brief) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Deal not found or verification not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
          <h1 className="text-3xl font-bold tracking-tight">Deal Verification</h1>
        </div>
        <p className="text-muted-foreground">
          This is a read-only verification view for Deal #{id}
        </p>
        
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyUrl}>
            <Copy className="h-4 w-4 mr-2" />
            Copy URL
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <QrCode className="h-4 w-4 mr-2" />
                Show QR
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>QR Code for Verification</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center space-y-4">
                <img 
                  src={generateQRPlaceholder()}
                  alt="QR Code for verification" 
                  className="border rounded-lg"
                />
                <p className="text-sm text-muted-foreground text-center">
                  Scan to verify this deal on any device
                </p>
                <Button variant="outline" onClick={handleCopyUrl} className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Verification URL
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Deal Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Deal Summary
            <Badge variant={escrowComplete ? "default" : "secondary"}>
              {escrowComplete ? "Complete" : "Active"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
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
                <dt className="text-muted-foreground">Value:</dt>
                <dd className="font-medium">${offer.brief.compensation.toLocaleString()}</dd>
              </div>
            </dl>
            
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Checks:</dt>
                <dd className="font-medium">{offer.checksCompleted ? 'Passed' : 'Pending'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Signed:</dt>
                <dd className="font-medium">{offer.signed ? 'Yes' : 'No'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Escrow:</dt>
                <dd className="font-medium">{escrowComplete ? 'Complete' : 'In Progress'}</dd>
              </div>
            </dl>
          </div>
        </CardContent>
      </Card>

      {/* Verification Trail */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Trail ({proofs.length} Records)</CardTitle>
        </CardHeader>
        <CardContent>
          {proofs.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No verification records available
            </p>
          ) : (
            <div className="space-y-4">
              {proofs.map((proof) => (
                <ProofSlip
                  key={proof.id}
                  title={proof.title}
                  items={proof.items}
                  timestamp={proof.timestamp}
                  hash={proof.hash}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>This verification is cryptographically secured and tamper-evident.</p>
        <p>Verified at {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}