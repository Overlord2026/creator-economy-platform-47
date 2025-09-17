import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  primaryCta?: React.ReactNode;
  secondaryCta?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  primaryCta,
  secondaryCta
}) => {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-brand-text">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-brand-textMuted max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      
      {(primaryCta || secondaryCta) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {secondaryCta}
          {primaryCta}
        </div>
      )}
    </div>
  );
};