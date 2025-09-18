import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusPillProps {
  status: 'GREEN' | 'RED' | 'YELLOW';
  label?: string;
}

export function StatusPill({ status, label }: StatusPillProps) {
  const getVariant = () => {
    switch (status) {
      case 'GREEN':
        return 'default';
      case 'RED':
        return 'destructive';
      case 'YELLOW':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getColor = () => {
    switch (status) {
      case 'GREEN':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'RED':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'YELLOW':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      default:
        return '';
    }
  };

  return (
    <Badge variant={getVariant()} className={getColor()}>
      {label || status}
    </Badge>
  );
}

export default StatusPill;