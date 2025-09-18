import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Server } from 'lucide-react';

interface EnvVariablesCheckProps {
  data?: {
    STRIPE_SECRET_KEY: boolean;
    STRIPE_PUBLISHABLE_KEY: boolean;
    STRIPE_WEBHOOK_SECRET: boolean;
    SUPABASE_URL: boolean;
    SUPABASE_ANON_KEY: boolean;
  };
  isLoading?: boolean;
}

export function EnvVariablesCheck({ data, isLoading }: EnvVariablesCheckProps) {
  const envVars = [
    { key: 'STRIPE_SECRET_KEY', label: 'Stripe Secret Key', critical: true },
    { key: 'STRIPE_PUBLISHABLE_KEY', label: 'Stripe Publishable Key', critical: true },
    { key: 'STRIPE_WEBHOOK_SECRET', label: 'Stripe Webhook Secret', critical: true },
    { key: 'SUPABASE_URL', label: 'Supabase URL', critical: true },
    { key: 'SUPABASE_ANON_KEY', label: 'Supabase Anon Key', critical: true },
  ];

  const getStatusBadge = (present: boolean | undefined, critical: boolean) => {
    if (isLoading) {
      return <Badge variant="secondary">Checking...</Badge>;
    }
    
    if (present === undefined) {
      return <Badge variant="secondary">Unknown</Badge>;
    }

    return present ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <CheckCircle className="w-3 h-3 mr-1" />
        Present
      </Badge>
    ) : (
      <Badge variant={critical ? "destructive" : "secondary"}>
        <XCircle className="w-3 h-3 mr-1" />
        Missing
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="w-5 h-5" />
          Environment Variables
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {envVars.map((envVar) => (
            <div key={envVar.key} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{envVar.label}</div>
                <div className="text-sm text-muted-foreground">
                  {envVar.key}
                </div>
              </div>
              {getStatusBadge(data?.[envVar.key as keyof typeof data], envVar.critical)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}