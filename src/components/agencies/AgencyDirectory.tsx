import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AgencyDirectoryProps {
  onBookCampaign?: (agencyId: string) => void;
  onViewDetails?: (agencyId: string) => void;
}

export default function AgencyDirectory({ onBookCampaign, onViewDetails }: AgencyDirectoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agency Directory</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Agency directory placeholder</p>
      </CardContent>
    </Card>
  );
}
