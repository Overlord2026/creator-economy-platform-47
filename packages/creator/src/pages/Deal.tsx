import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { getCurrentOffer } from '../state/offer.mock';
import { getProofs, isEscrowComplete } from '../state/proofs.mock';
import { ProofSlip } from '../components/ProofSlip';
import { ExternalLink, QrCode, Download, DollarSign } from 'lucide-react';

export function Deal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(getCurrentOffer());
  const [proofs, setProofs] = useState(getProofs());
  const [escrowComplete, setEscrowComplete] = useState(isEscrowComplete());

  useEffect(() => {
    setOffer(getCurrentOffer());
    setProofs(getProofs());
    setEscrowComplete(isEscrowComplete());
  }, []);

  const handleCreateEscrow = () => {
    const amount = offer.brief?.compensation || 0;
    const splits = encodeURIComponent(JSON.stringify([
      { party: 'Creator', percentage: 85 },
      { party: 'Platform Fee', percentage: 15 }
    ]));
    
    navigate(`/creator/payout/${id}?amount=${amount}&splits=${splits}`);
  };

  const handleDownloadAudit = () => {
    const auditData = {
      dealId: id,
      brief: offer.brief,
      proofs: proofs,
      exportedAt: new Date().toISOString(),
      verification: {
        checksCompleted: offer.checksCompleted,
        signed: offer.signed,
        escrowComplete
      }
    };

    const blob = new Blob([JSON.stringify(auditData, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deal-${id}-audit-pack.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!offer.brief) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Deal not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deal #{id}</h1>
          <p className="text-muted-foreground mt-2">
            {offer.brief.title} with {offer.brief.brand}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={`/creator/deal/${id}/verify`}>
              <QrCode className="h-4 w-4 mr-2" />
              Verify
            </a>
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadAudit}>
            <Download className="h-4 w-4 mr-2" />
            Audit Pack
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Deal Overview */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Deal Status
                <Badge variant={escrowComplete ? "default" : "secondary"}>
                  {escrowComplete ? "Complete" : "Active"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Value:</dt>
                  <dd className="font-medium">${offer.brief.compensation.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Status:</dt>
                  <dd className="font-medium">
                    {offer.signed ? 'Signed' : 'Pending'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Escrow:</dt>
                  <dd className="font-medium">
                    {escrowComplete ? 'Complete' : 'Pending'}
                  </dd>
                </div>
              </dl>
              
              {offer.signed && !escrowComplete && (
                <Button 
                  onClick={handleCreateEscrow}
                  className="w-full mt-4"
                  size="sm"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Create Escrow
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Proof Receipts */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Proof Receipts ({proofs.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {proofs.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No proof receipts available
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
        </div>
      </div>
    </div>
  );
}