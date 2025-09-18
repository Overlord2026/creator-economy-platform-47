import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Download, Activity, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { EnvVariablesCheck, EnvFlags } from './EnvVariablesCheck';
import { StripeApiCheck } from './StripeApiCheck';
import { DatabaseSchemaCheck } from './DatabaseSchemaCheck';
import { WebhookRouteCheck } from './WebhookRouteCheck';

interface DiagnosticsData {
  env?: EnvFlags;
  stripe?: {
    sdkLoaded: boolean;
    apiOk: boolean;
    statusCode?: number;
    error?: string;
  };
  db?: {
    profilesStripeCustomerIdOk: 'GREEN' | 'YELLOW';
    subsTable: string;
    error?: string;
  };
  timestamp?: string;
}

export function AdminDiagnosticsDashboard() {
  const [data, setData] = useState<DiagnosticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRun, setLastRun] = useState<string | null>(null);
  const { toast } = useToast();

  const runDiagnostics = async () => {
    setIsLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke('admin-diagnostics');
      
      if (error) throw error;
      
      setData(result);
      setLastRun(new Date().toLocaleString());
      
      toast({
        title: "Diagnostics Complete",
        description: "All system checks have been completed successfully.",
      });
    } catch (error) {
      console.error('Diagnostics error:', error);
      toast({
        title: "Diagnostics Failed",
        description: "Failed to run system diagnostics. Please check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportResults = () => {
    if (!data) return;
    
    const exportData = {
      ...data,
      exportedAt: new Date().toISOString(),
      summary: {
        environmentChecks: Object.values(data.env || {}).filter(Boolean).length,
        stripeApiConnected: data.stripe?.apiOk || false,
        databaseSchemaValid: data.db?.profilesStripeCustomerIdOk === 'GREEN'
      }
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin-diagnostics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getOverallStatus = () => {
    if (!data) return { status: 'unknown', count: 0, total: 0 };
    
    const checks = [
      ...Object.values(data.env || {}),
      data.stripe?.sdkLoaded,
      data.stripe?.apiOk,
      data.db?.profilesStripeCustomerIdOk === 'GREEN'
    ].filter(check => check !== undefined);
    
    const passedChecks = checks.filter(Boolean).length;
    const totalChecks = checks.length;
    
    return {
      status: passedChecks === totalChecks ? 'healthy' : passedChecks > totalChecks / 2 ? 'warning' : 'critical',
      count: passedChecks,
      total: totalChecks
    };
  };

  const overallStatus = getOverallStatus();

  return (
    <div className="space-y-6">
      {/* Header with overall status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-6 h-6" />
              System Diagnostics Dashboard
            </div>
            <div className="flex items-center gap-2">
              {overallStatus.status === 'healthy' && (
                <Badge className="bg-green-100 text-green-800">System Healthy</Badge>
              )}
              {overallStatus.status === 'warning' && (
                <Badge variant="secondary">Some Issues</Badge>
              )}
              {overallStatus.status === 'critical' && (
                <Badge variant="destructive">Critical Issues</Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={runDiagnostics} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Run Diagnostics
              </Button>
              
              {data && (
                <Button onClick={exportResults} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Results
                </Button>
              )}
            </div>
            
            {lastRun && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                Last run: {lastRun}
              </div>
            )}
          </div>
          
          {data && (
            <div className="mt-4 text-sm">
              Overall Status: {overallStatus.count}/{overallStatus.total} checks passed
            </div>
          )}
        </CardContent>
      </Card>

      {/* Individual diagnostic components */}
      <div className="grid gap-6 md:grid-cols-2">
        <EnvVariablesCheck data={data?.env} isLoading={isLoading} />
        <StripeApiCheck data={data?.stripe} isLoading={isLoading} />
        <DatabaseSchemaCheck data={data?.db} isLoading={isLoading} />
        <WebhookRouteCheck />
      </div>
    </div>
  );
}