'use client';

interface InstructionListProps {
  instructions: string;
  className?: string;
}

export function InstructionList({ instructions, className = '' }: InstructionListProps) {
  // Split instructions by newlines and filter out empty lines
  const steps = instructions
    .split('\n')
    .map(step => step.trim())
    .filter(step => step.length > 0);

  return (
    <div className={`space-y-6 ${className}`}>
      {steps.map((step, index) => (
        <div key={index} className="text-right">
          {/* Step Number */}
          <div>
            <span className="text-2xl font-bold text-zinc-700">
              {index + 1}
            </span>
          </div>

          {/* Step Content */}
          <div>
            <p className="text-zinc-700 leading-relaxed text-base">
              {step}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
} 
