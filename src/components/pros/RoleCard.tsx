import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface RoleCardProps {
  title: string;
  subtitle?: string;
  primaryCta: string;
  secondaryCta: string;
  hrefPrimary: string;
  hrefSecondary: string;
  showPlatform?: boolean;
  className?: string;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  hrefPrimary,
  hrefSecondary,
  showPlatform = false,
  className
}) => {
  return (
    <div 
      className={cn(
        "border rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-[#d4af37] focus-within:ring-opacity-20",
        "border-white/10 shadow-sm",
        className
      )}
      style={{ backgroundColor: '#34485c' }}
    >
      <div className="p-6">
        {/* Accent dot */}
        <div className="flex items-start justify-between mb-4">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: '#d4af37' }}
          />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold mb-1" style={{ color: '#f5f7fa' }}>
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm leading-relaxed" style={{ color: '#c6cfda' }}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Secondary link */}
          <div>
            <Link 
              to={hrefSecondary}
              className="text-sm transition-colors duration-200 hover:underline focus:underline focus:outline-none"
              style={{ color: '#d4af37' }}
              aria-label={`${secondaryCta} for ${title}`}
            >
              {secondaryCta}
            </Link>
          </div>

          {/* Platform access button (for roles that have it) */}
          {showPlatform && (
            <>
              <div className="border-t border-white/10 pt-3 mt-3">
                <Link 
                  to={hrefPrimary}
                  className="inline-block text-xs font-medium px-3 py-2 rounded transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#34485c] focus:ring-[#d4af37]"
                  style={{ 
                    backgroundColor: '#d4af37',
                    color: '#0a0d1e'
                  }}
                  aria-label={`${primaryCta} for ${title}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#c19b26';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#d4af37';
                  }}
                >
                  {primaryCta}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};