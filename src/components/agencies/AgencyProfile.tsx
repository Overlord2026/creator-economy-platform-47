import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AgencyProfileProps {
  agencyId: string;
  onBookCampaign?: (agencyId: string) => void;
  onBack?: () => void;
}

export default function AgencyProfile({ agencyId, onBookCampaign, onBack }: AgencyProfileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agency Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Agency profile placeholder</p>
      </CardContent>
    </Card>
  );
}
