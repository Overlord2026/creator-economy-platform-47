import React from 'react';
import { cn } from '@/lib/utils';

interface TrendData {
  value: string;
  positive?: boolean;
}

interface StatCardProps {
  title: string;
  description?: string;
  value: string | number;
  trend?: TrendData;
  dotColor?: string;
  onClick?: () => void;
  className?: string;
}

const StatCardSkeleton = () => (
  <div className="bg-[#34485c] border border-white/10 rounded-lg2 shadow-card p-6 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
      <div className="w-12 h-6 bg-gray-400 rounded-full"></div>
    </div>
    <div className="space-y-2">
      <div className="w-32 h-5 bg-gray-400 rounded"></div>
      <div className="w-48 h-4 bg-gray-300 rounded"></div>
      <div className="w-20 h-8 bg-gray-400 rounded"></div>
    </div>
  </div>
);

const StatCard: React.FC<StatCardProps> & {
  Skeleton: React.FC;
} = ({
  title,
  description,
  value,
  trend,
  dotColor = '#22c55e',
  onClick,
  className
}) => {
  return (
    <div
      className={cn(
        "bg-[#34485c] border border-white/10 rounded-lg2 shadow-card p-6 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
        {trend && (
          <span
            className={cn(
              "px-2 py-1 text-xs font-medium rounded-full",
              trend.positive 
                ? "bg-[#22c55e]/20 text-[#22c55e]" 
                : "bg-[#2b3a4d]/20 text-[#c6cfda]"
            )}
          >
            {trend.value}
          </span>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-[#f5f7fa] text-lg">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-[#c6cfda] leading-relaxed">
            {description}
          </p>
        )}
        <div className="text-3xl font-semibold text-[#f5f7fa] mt-3">
          {value}
        </div>
      </div>
    </div>
  );
};

StatCard.Skeleton = StatCardSkeleton;

export { StatCard };