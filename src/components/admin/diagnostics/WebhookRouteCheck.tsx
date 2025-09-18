import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Webhook, RefreshCw } from 'lucide-react';
import StatusPill from './StatusPill';

export function WebhookRouteCheck() {
  const [status, setStatus] = React.useState<'GREEN'|'RED'|'YELLOW'>('YELLOW');
  const [code, setCode] = React.useState<number>(0);
  const [isChecking, setIsChecking] = React.useState(false);

  async function run() {
    setIsChecking(true);
    try {
      const res = await fetch('/api/stripe/webhook', { method: 'HEAD' });
      setCode(res.status);
      setStatus(res.status === 200 || res.status === 405 ? 'GREEN' : 'RED');
    } catch {
      setCode(0);
      setStatus('RED');
    }
    setIsChecking(false);
  }

  React.useEffect(() => { 
    run(); 
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Webhook className="w-5 h-5" />
          Stripe Webhook Route
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <div className="font-medium">Webhook Endpoint</div>
              <div className="text-sm text-muted-foreground">
                HEAD /api/stripe/webhook
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill status={status} />
              <span className="text-xs text-muted-foreground">
                Status: {code || '—'}
              </span>
            </div>
          </div>
          
          <Button 
            onClick={run} 
            disabled={isChecking}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
            Test Webhook Route
          </Button>
          
          <div className="text-xs text-muted-foreground">
            ✓ Status 200 or 405 (Method Not Allowed) indicates route exists
          </div>
        </div>
      </CardContent>
    </Card>
  );
}