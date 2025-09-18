import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, CreditCard, AlertTriangle } from 'lucide-react';

interface StripeApiCheckProps {
  data?: {
    apiConnection: boolean;
    statusCode?: number;
    error?: string;
  };
  isLoading?: boolean;
}

export function StripeApiCheck({ data, isLoading }: StripeApiCheckProps) {
  const getStatusBadge = () => {
    if (isLoading) {
      return <Badge variant="secondary">Testing API...</Badge>;
    }
    
    if (!data) {
      return <Badge variant="secondary">Not tested</Badge>;
    }

    if (data.apiConnection && data.statusCode === 200) {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          API Connected
        </Badge>
      );
    }

    return (
      <Badge variant="destructive">
        <XCircle className="w-3 h-3 mr-1" />
        API Failed
      </Badge>
    );
  };

  const getStatusDetails = () => {
    if (!data || isLoading) return null;

    if (data.apiConnection) {
      return (
        <div className="text-sm text-green-600">
          ✓ Successfully connected to Stripe API (Status: {data.statusCode})
        </div>
      );
    }

    return (
      <div className="text-sm text-red-600">
        <AlertTriangle className="w-4 h-4 inline mr-1" />
        {data.error || `Connection failed (Status: ${data.statusCode})`}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Stripe API Connection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <div className="font-medium">API Connectivity Test</div>
              <div className="text-sm text-muted-foreground">
                stripe.products.list({`{limit: 1}`})
              </div>
            </div>
            {getStatusBadge()}
          </div>
          
          {getStatusDetails()}
          
          <div className="text-xs text-muted-foreground mt-2">
            🔒 No sensitive data (product IDs, keys) are displayed for security
          </div>
        </div>
      </CardContent>
    </Card>
  );
}