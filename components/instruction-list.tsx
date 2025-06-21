'use client';

import { useState, useMemo } from 'react';

interface InstructionListProps {
  instructions: string;
  className?: string;
}

export function InstructionList({ instructions, className = '' }: InstructionListProps) {
  const [completedStates, setCompletedStates] = useState<{ [key: number]: boolean }>({});

  // Memoize steps to prevent infinite re-renders
  const steps = useMemo(() => {
    return instructions
      .split('\n')
      .map(step => step.trim())
      .filter(step => step.length > 0);
  }, [instructions]);

  const handleStepClick = (stepIndex: number) => {
    const newCompleted = !completedStates[stepIndex];
    setCompletedStates(prev => ({
      ...prev,
      [stepIndex]: newCompleted
    }));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = completedStates[index] || false;
        
        return (
          <div key={index} className="text-right">
            {/* Step Number and Status */}
            <div className="flex items-center justify-start space-x-2 space-x-reverse">
              <span className={`text-2xl font-bold ${isCompleted ? 'text-zinc-400' : 'text-zinc-700'}`}>
                {index + 1}
              </span>
              {isCompleted && (
                <span className="text-lg text-zinc-400">✓</span>
              )}
            </div>
            
            {/* Step Content */}
            <div 
              className={`cursor-pointer transition-colors ${
                isCompleted ? 'text-zinc-400' : 'text-zinc-700'
              }`}
              onClick={() => handleStepClick(index)}
            >
              <p className="leading-relaxed text-base">
                {step}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
} 
