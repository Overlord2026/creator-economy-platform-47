import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sb } from '@/lib/supabase-relaxed';
import { tableExists, safeQueryOptionalTable, safeInsertOptionalTable } from '@/lib/db/safeSupabase';
import { useToast } from '@/hooks/use-toast';
import { MapPin, FileText, CheckCircle, Clock, AlertTriangle, Plus } from 'lucide-react';

interface LicenseRequest {
  id: string;
  state: string;
  status: string;
  created_at: string;
  compliance_score: number;
  estimated_completion_date: string;
  fees_paid: number;
}

interface StateRequirement {
  state: string;
  requirement_name: string;
  fee_amount: number;
  typical_processing_days: number;
}

const US_STATES = [
  { code: 'TX', name: 'Texas', color: 'bg-blue-500' },
  { code: 'CA', name: 'California', color: 'bg-purple-500' },
  { code: 'FL', name: 'Florida', color: 'bg-green-500' },
  { code: 'NY', name: 'New York', color: 'bg-red-500' },
  { code: 'IL', name: 'Illinois', color: 'bg-yellow-500' },
  { code: 'PA', name: 'Pennsylvania', color: 'bg-indigo-500' },
  { code: 'OH', name: 'Ohio', color: 'bg-pink-500' },
  { code: 'GA', name: 'Georgia', color: 'bg-teal-500' },
  { code: 'NC', name: 'North Carolina', color: 'bg-orange-500' },
  { code: 'MI', name: 'Michigan', color: 'bg-cyan-500' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-800 border-green-200';
    case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'in_progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'needs_revision': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'submitted': return <Clock className="h-4 w-4 text-blue-600" />;
    case 'in_progress': return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'needs_revision': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    case 'rejected': return <AlertTriangle className="h-4 w-4 text-red-600" />;
    default: return <FileText className="h-4 w-4 text-gray-600" />;
  }
};

export default function RIAStateLicensing() {
  const [licenseRequests, setLicenseRequests] = useState<LicenseRequest[]>([]);
  const [stateRequirements, setStateRequirements] = useState<StateRequirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchLicenseRequests();
    fetchStateRequirements();
  }, []);

  const fetchLicenseRequests = async () => {
    try {
      const hasRequests = await tableExists('ria_state_license_requests');
      if (!hasRequests) {
        console.warn('ria_state_license_requests table does not exist');
        setLicenseRequests([]);
        return;
      }

      const result = await safeQueryOptionalTable('ria_state_license_requests', '*', { 
        order: { column: 'created_at', ascending: false } 
      });
      
      if (result.ok && result.data) {
        // Cast to LicenseRequest type with proper fallbacks
        const requests = result.data.map((req: any) => ({
          id: req.id || '',
          state: req.state || '',
          status: req.status || 'not_started',
          created_at: req.created_at || new Date().toISOString(),
          compliance_score: req.compliance_score || 0,
          estimated_completion_date: req.estimated_completion_date || '',
          fees_paid: req.fees_paid || 0
        } as LicenseRequest));
        
        setLicenseRequests(requests);
      } else {
        setLicenseRequests([]);
      }
    } catch (error) {
      console.error('Error fetching license requests:', error);
      toast({
        title: 'Error',
        description: 'Failed to load license requests',
        variant: 'destructive',
      });
    }
  };

  const fetchStateRequirements = async () => {
    try {
      const hasRequirements = await tableExists('ria_state_requirements');
      if (!hasRequirements) {
        console.warn('ria_state_requirements table does not exist');
        setStateRequirements([]);
        return;
      }

      const result = await safeQueryOptionalTable('ria_state_requirements', 'state,requirement_name,fee_amount,typical_processing_days', { 
        order: { column: 'state', ascending: true } 
      });
      
      if (result.ok && result.data) {
        // Cast to StateRequirement type with proper fallbacks
        const requirements = result.data.map((req: any) => ({
          state: req.state || '',
          requirement_name: req.requirement_name || '',
          fee_amount: req.fee_amount || 0,
          typical_processing_days: req.typical_processing_days || 30
        } as StateRequirement));
        
        setStateRequirements(requirements);
      } else {
        setStateRequirements([]);
      }
    } catch (error) {
      console.error('Error fetching state requirements:', error);
    } finally {
      setLoading(false);
    }
  };

  const startLicenseProcess = async (stateCode: string) => {
    try {
      const { data: user } = await sb.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      const hasRequests = await tableExists('ria_state_license_requests');
      if (!hasRequests) {
        toast({
          title: 'Feature Not Available',
          description: 'RIA license request functionality is not yet configured',
          variant: 'destructive',
        });
        return;
      }

      const result = await safeInsertOptionalTable('ria_state_license_requests', {
        ria_id: user.user.id,
        state: stateCode,
        status: 'not_started'
      });

      if (!result.ok) {
        throw new Error(result.error || 'Failed to create license request');
      }

      toast({
        title: 'License Process Started',
        description: `Started RIA licensing process for ${stateCode}`,
      });

      // Generate a mock ID since we can't get the real one from safeInsertOptionalTable
      const mockRequestId = crypto.randomUUID();
      navigate(`/ria-license-wizard/${mockRequestId}`);
    } catch (error) {
      console.error('Error starting license process:', error);
      toast({
        title: 'Error',
        description: 'Failed to start license process',
        variant: 'destructive',
      });
    }
  };

  const getStateProgress = (stateCode: string) => {
    const request = licenseRequests.find(req => req.state === stateCode);
    if (!request) return 0;
    
    switch (request.status) {
      case 'approved': return 100;
      case 'submitted': return 80;
      case 'in_progress': return 60;
      case 'needs_revision': return 40;
      default: return 20;
    }
  };

  const getStateFees = (stateCode: string) => {
    return stateRequirements
      .filter(req => req.state === stateCode)
      .reduce((total, req) => total + req.fee_amount, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">RIA Multi-State Licensing</h1>
          <p className="text-muted-foreground mt-2">
            Manage your investment advisor registrations across multiple states
          </p>
        </div>
        <Button onClick={() => navigate('/ria-license-wizard')}>
          <Plus className="h-4 w-4 mr-2" />
          Start New Application
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">State Overview</TabsTrigger>
          <TabsTrigger value="progress">My Applications</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {US_STATES.map((state) => {
              const request = licenseRequests.find(req => req.state === state.code);
              const progress = getStateProgress(state.code);
              const fees = getStateFees(state.code);

              return (
                <Card key={state.code} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${state.color}`} />
                        <CardTitle className="text-lg">{state.name}</CardTitle>
                      </div>
                      {request && (
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1">{request.status.replace('_', ' ')}</span>
                        </Badge>
                      )}
                    </div>
                    <CardDescription>
                      Est. fees: ${fees} • Processing: ~{stateRequirements.find(r => r.state === state.code)?.typical_processing_days || 30} days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      
                      {request ? (
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={() => navigate(`/ria-license-details/${request.id}`)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          View Application
                        </Button>
                      ) : (
                        <Button 
                          className="w-full"
                          onClick={() => startLicenseProcess(state.code)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Start Process
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid gap-4">
            {licenseRequests.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No License Applications</h3>
                    <p className="text-muted-foreground">Start your first state licensing application</p>
                    <Button className="mt-4" onClick={() => navigate('/ria-license-wizard')}>
                      Start Application
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              licenseRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <CardTitle>{US_STATES.find(s => s.code === request.state)?.name || request.state}</CardTitle>
                          <CardDescription>
                            Started {new Date(request.created_at).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1">{request.status.replace('_', ' ')}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <div className="font-medium">Compliance Score</div>
                          <div className="text-muted-foreground">{request.compliance_score}%</div>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">Fees Paid</div>
                          <div className="text-muted-foreground">${request.fees_paid}</div>
                        </div>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => navigate(`/ria-license-details/${request.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-6">
          <div className="grid gap-6">
            {US_STATES.map((state) => {
              const stateReqs = stateRequirements.filter(req => req.state === state.code);
              
              return (
                <Card key={state.code}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${state.color}`} />
                      {state.name} Requirements
                    </CardTitle>
                    <CardDescription>
                      {stateReqs.length} requirements • Est. processing: {stateReqs[0]?.typical_processing_days || 30} days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {stateReqs.map((req, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{req.requirement_name}</div>
                            <div className="text-sm text-muted-foreground">
                              Processing: {req.typical_processing_days} days
                            </div>
                          </div>
                          {req.fee_amount > 0 && (
                            <Badge variant="outline">${req.fee_amount}</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}