import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface FallbackBannerProps {
  active: boolean;
  table?: string;
}

export function FallbackBanner({ active, table }: FallbackBannerProps) {
  if (!active) return null;

  return (
    <Alert className="mb-4 border-yellow-300 bg-yellow-50 text-yellow-800">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        {table ? `${table} table not found` : 'Database table not available'} - using demo data (writes disabled)
      </AlertDescription>
    </Alert>
  );
}