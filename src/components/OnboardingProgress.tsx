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
    <div className={cn("w-full space-y-8", className)}>
      {/* Progress Bar with Glow Effect */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-400">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm font-bold text-amber-400">{Math.round(progressPercentage)}% complete</span>
        </div>
        <div className="relative h-2 bg-slate-800/60 rounded-full overflow-hidden ring-1 ring-slate-700/30">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 rounded-full transition-all duration-700 ease-out shadow-lg shadow-amber-500/40"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
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
                  "w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 mb-3",
                  isCompleted && "bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/50",
                  isCurrent && "bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 shadow-xl shadow-amber-500/40 ring-2 ring-amber-400/60 scale-110",
                  isPending && "bg-slate-800/60 text-slate-500 border-2 border-slate-700/50"
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
                  "text-xs text-center capitalize transition-colors duration-300 line-clamp-2 font-medium",
                  isCurrent && "text-amber-300 font-bold",
                  isCompleted && "text-amber-400/80",
                  isPending && "text-slate-600"
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
