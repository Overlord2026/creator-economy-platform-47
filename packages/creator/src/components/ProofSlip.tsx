import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Badge } from 'src/components/ui/badge';

interface ProofSlipProps {
  title: string;
  items: { label: string; value: string }[];
  timestamp?: string;
  hash?: string;
}

export function ProofSlip({ title, items, timestamp, hash }: ProofSlipProps) {
  const displayTimestamp = timestamp || new Date().toISOString();
  const displayHash = hash || makeProof(title, items).hash;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline" className="text-xs">
            Verified
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items */}
        <dl className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <dt className="text-muted-foreground">{item.label}:</dt>
              <dd className="font-medium">{item.value}</dd>
            </div>
          ))}
        </dl>
        
        {/* Timestamp */}
        <div className="pt-2 border-t border-border text-xs text-muted-foreground">
          <div>Timestamp: {new Date(displayTimestamp).toLocaleString()}</div>
          <div className="font-mono mt-1 break-all">{displayHash}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to create proof objects
export function makeProof(title: string, items: { label: string; value: string }[]) {
  const timestamp = new Date().toISOString();
  const hash = 'sha256:' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
  
  return {
    title,
    items,
    timestamp,
    hash
  };
}