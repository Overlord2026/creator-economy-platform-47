import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
  className?: string;
}

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
  currentStep,
  totalSteps,
  steps,
  className
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Progress Bar with Glow Effect */}
      <div className="relative">
        <Progress 
          value={progressPercentage} 
          className="h-3 bg-slate-700/50 backdrop-blur-sm border border-slate-600/30"
        />
        <div 
          className="absolute top-0 left-0 h-3 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400 rounded-full transition-all duration-500 shadow-lg shadow-amber-500/50"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between items-start gap-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isPending = stepNumber > currentStep;

          return (
            <div key={index} className="flex flex-col items-center flex-1 min-w-0">
              {/* Circle */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 mb-2",
                  isCompleted && "bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-900 shadow-lg shadow-amber-500/30",
                  isCurrent && "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/40 ring-4 ring-blue-400/30 scale-110",
                  isPending && "bg-slate-700/50 text-slate-400 border-2 border-slate-600/50"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  stepNumber
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-xs text-center capitalize transition-colors duration-300 line-clamp-2",
                  isCurrent && "text-blue-300 font-semibold",
                  isCompleted && "text-amber-300",
                  isPending && "text-slate-500"
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
