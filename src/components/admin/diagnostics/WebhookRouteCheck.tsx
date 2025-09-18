import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Webhook, RefreshCw } from 'lucide-react';

export function WebhookRouteCheck() {
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<Record<string, { status: number; available: boolean }>>({});

  const webhookRoutes = [
    { path: '/api/stripe/webhook', label: 'Stripe Webhook' },
    { path: '/api/plaid/webhook', label: 'Plaid Webhook' },
    { path: '/api/resend/webhook', label: 'Resend Webhook' }
  ];

  const checkWebhookRoute = async (path: string) => {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      return {
        status: response.status,
        available: response.status === 200 || response.status === 405 // 405 = Method Not Allowed is OK
      };
    } catch (error) {
      return {
        status: 0,
        available: false
      };
    }
  };

  const runAllChecks = async () => {
    setIsChecking(true);
    const newResults: Record<string, { status: number; available: boolean }> = {};
    
    for (const route of webhookRoutes) {
      newResults[route.path] = await checkWebhookRoute(route.path);
    }
    
    setResults(newResults);
    setIsChecking(false);
  };

  const getStatusBadge = (path: string) => {
    if (isChecking) {
      return <Badge variant="secondary">Checking...</Badge>;
    }
    
    const result = results[path];
    if (!result) {
      return <Badge variant="secondary">Not tested</Badge>;
    }

    return result.available ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <CheckCircle className="w-3 h-3 mr-1" />
        Available ({result.status})
      </Badge>
    ) : (
      <Badge variant="destructive">
        <XCircle className="w-3 h-3 mr-1" />
        Not Found ({result.status})
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Webhook className="w-5 h-5" />
          Webhook Routes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {webhookRoutes.map((route) => (
            <div key={route.path} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{route.label}</div>
                <div className="text-sm text-muted-foreground">
                  {route.path}
                </div>
              </div>
              {getStatusBadge(route.path)}
            </div>
          ))}
          
          <Button 
            onClick={runAllChecks} 
            disabled={isChecking}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
            Test All Webhook Routes
          </Button>
          
          <div className="text-xs text-muted-foreground">
            ✓ Status 200 or 405 (Method Not Allowed) indicates route exists
          </div>
        </div>
      </CardContent>
    </Card>
  );
}