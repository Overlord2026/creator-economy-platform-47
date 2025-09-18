import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  getCompliance, 
  setTraining, 
  setDisclosure, 
  setFtcLabels, 
  allPassed 
} from '../state/compliance.mock';
import { addProof } from '../state/proofs.mock';
import { makeProof } from '../components/ProofSlip';
import { CheckCircle2, ArrowRight, Shield, FileText, Tag } from 'lucide-react';
import { toast } from 'sonner';

export function Compliance() {
  const navigate = useNavigate();
  const [compliance, setComplianceState] = useState(getCompliance());

  useEffect(() => {
    setComplianceState(getCompliance());
  }, []);

  const handleToggle = (type: 'training' | 'disclosure' | 'ftcLabels', value: boolean) => {
    let updatedCompliance;
    let proofTitle = '';
    
    switch (type) {
      case 'training':
        updatedCompliance = setTraining(value);
        proofTitle = 'Training Completed';
        break;
      case 'disclosure':
        updatedCompliance = setDisclosure(value);
        proofTitle = 'Disclosure Filed';
        break;
      case 'ftcLabels':
        updatedCompliance = setFtcLabels(value);
        proofTitle = 'FTC Labels Enabled';
        break;
    }
    
    setComplianceState(updatedCompliance);
    
    if (value) {
      const proof = makeProof(`Compliance Gate Passed: ${proofTitle}`, [
        { label: 'Gate Type', value: proofTitle },
        { label: 'Status', value: 'COMPLETED' },
        { label: 'Verified', value: 'YES' }
      ]);
      
      addProof(proof);
      toast.success(`${proofTitle} marked as complete`);
    }
  };

  const complianceItems = [
    {
      id: 'training',
      title: 'Training Completed',
      description: 'Complete required creator training and education modules',
      icon: Shield,
      completed: compliance.training,
      onToggle: (value: boolean) => handleToggle('training', value)
    },
    {
      id: 'disclosure',
      title: 'Disclosure Filed',
      description: 'File required disclosure documents and agreements',
      icon: FileText,
      completed: compliance.disclosure,
      onToggle: (value: boolean) => handleToggle('disclosure', value)
    },
    {
      id: 'ftcLabels',
      title: 'FTC Labels Enabled',
      description: 'Enable automatic FTC compliance labeling for sponsored content',
      icon: Tag,
      completed: compliance.ftcLabels,
      onToggle: (value: boolean) => handleToggle('ftcLabels', value)
    }
  ];

  const allComplete = allPassed();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Compliance Gates</h1>
        <p className="text-muted-foreground mt-2">
          Complete all compliance requirements before creating offers.
        </p>
      </div>

      {/* Overall Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Compliance Status
            <Badge variant={allComplete ? "default" : "secondary"}>
              {allComplete ? "Complete" : "Incomplete"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm">
            {allComplete ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>All compliance gates passed. You can now create offers.</span>
              </>
            ) : (
              <>
                <span className="text-muted-foreground">
                  {complianceItems.filter(item => item.completed).length} of {complianceItems.length} requirements completed
                </span>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Items */}
      <div className="space-y-4">
        {complianceItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-muted">
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="flex items-center gap-2">
                        {item.completed && (
                          <Badge variant="default" className="text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Complete
                          </Badge>
                        )}
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={item.id}
                            checked={item.completed}
                            onCheckedChange={item.onToggle}
                          />
                          <Label htmlFor={item.id} className="sr-only">
                            {item.title}
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Button */}
      {allComplete && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Ready to Proceed</h3>
                <p className="text-sm text-muted-foreground">
                  All compliance requirements met. Continue to offer lock.
                </p>
              </div>
              <Button onClick={() => navigate('/creator/offer-lock')}>
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}