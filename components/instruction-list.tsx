'use client';

import { useState, useEffect, useMemo } from 'react';
import { saveInstructionState, getInstructionState } from '@/lib/storage';

interface InstructionListProps {
  instructions: string;
  recipeSlug: string;
  className?: string;
}

export function InstructionList({ instructions, recipeSlug, className = '' }: InstructionListProps) {
  const [completedStates, setCompletedStates] = useState<{ [key: number]: boolean }>({});

  // Memoize steps to prevent infinite re-renders
  const steps = useMemo(() => {
    return instructions
      .split('\n')
      .map(step => step.trim())
      .filter(step => step.length > 0);
  }, [instructions]);

  // Load initial states from session storage
  useEffect(() => {
    const states: { [key: number]: boolean } = {};
    steps.forEach((_, index) => {
      states[index] = getInstructionState(recipeSlug, index);
    });
    setCompletedStates(states);
  }, [recipeSlug, steps]);

  const handleStepClick = (stepIndex: number) => {
    const newCompleted = !completedStates[stepIndex];
    setCompletedStates(prev => ({
      ...prev,
      [stepIndex]: newCompleted
    }));
    saveInstructionState(recipeSlug, stepIndex, newCompleted);
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
