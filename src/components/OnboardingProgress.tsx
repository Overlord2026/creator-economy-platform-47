import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

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
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-[#D4AF37]">
            {progressPercentage}% complete
          </span>
        </div>
        <Progress
          value={progressPercentage}
          className="h-2.5 bg-gray-200"
          aria-label={`Onboarding progress: ${progressPercentage}% complete`}
        />
      </div>

      {/* Step Indicators with Connecting Lines */}
      <div className="relative">
        {/* Connecting Line Background (Gray) */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" style={{ marginLeft: '20px', marginRight: '20px' }} />

        {/* Connecting Line Progress (Gold) */}
        <div
          className="absolute top-5 left-0 h-0.5 bg-[#D4AF37] transition-all duration-500"
          style={{
            width: `calc(${((currentStep - 1) / (totalSteps - 1)) * 100}% - ${20 / totalSteps}px)`,
            marginLeft: '20px'
          }}
        />

        {/* Step Badges */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <div
                key={step}
                className={cn(
                  "flex flex-col items-center space-y-2 text-sm",
                  "min-w-0 flex-1"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold z-10 transition-all duration-300",
                    {
                      "bg-[#D4AF37] text-white shadow-lg": isCompleted || isCurrent,
                      "bg-white border-2 border-gray-300 text-gray-400": !isCompleted && !isCurrent,
                      "animate-pulse ring-4 ring-[#D4AF37]/20": isCurrent
                    }
                  )}
                  aria-label={`Step ${stepNumber}: ${step}`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={cn(
                    "text-center truncate w-full px-1 font-medium",
                    {
                      "text-gray-900": isCompleted || isCurrent,
                      "text-gray-500": !isCompleted && !isCurrent
                    }
                  )}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};