import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Database, AlertTriangle } from 'lucide-react';

interface DatabaseSchemaCheckProps {
  data?: {
    profilesStripeCustomerIdOk: 'GREEN' | 'YELLOW';
    subsTable: string;
    error?: string;
  };
  isLoading?: boolean;
}

export function DatabaseSchemaCheck({ data, isLoading }: DatabaseSchemaCheckProps) {
  const schemaChecks = [
    {
      key: 'profilesStripeCustomerIdOk',
      label: 'Profiles Stripe Column',
      description: 'profiles.stripe_customer_id column exists',
      critical: true,
      getValue: (data: any) => data?.profilesStripeCustomerIdOk === 'GREEN'
    },
    {
      key: 'subsTable',
      label: 'Subscriptions Table',
      description: 'advisor_subscriptions or subscriptions table',
      critical: false,
      getValue: (data: any) => data?.subsTable && data.subsTable !== 'missing'
    }
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
        Available
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
          <Database className="w-5 h-5" />
          Database Schema
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {schemaChecks.map((check) => (
            <div key={check.key} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{check.label}</div>
                <div className="text-sm text-muted-foreground">
                  {check.description}
                </div>
              </div>
              {getStatusBadge(check.getValue(data), check.critical)}
            </div>
          ))}
          
          {data?.error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <div className="text-sm text-red-600">{data.error}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}