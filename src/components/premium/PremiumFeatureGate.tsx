import React from 'react';

interface PremiumFeatureGateProps {
  children: React.ReactNode;
  feature?: string;
  featureName?: string;
  featureLabel?: string;
  featureDescription?: string;
  fallback?: React.ReactNode;
}

export function PremiumFeatureGate({ children, fallback }: PremiumFeatureGateProps) {
  // Simple pass-through for now - shows all content
  return <>{children}</>;
}