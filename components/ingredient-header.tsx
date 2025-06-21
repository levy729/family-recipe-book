'use client';

import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface IngredientHeaderProps {
  onCopy: () => void;
}

export function IngredientHeader({ onCopy }: IngredientHeaderProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-start mb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-zinc-600 hover:text-zinc-600 hover:bg-transparent p-0 h-auto transition-all duration-200 hover:scale-110"
        >
          <div className={`transition-all duration-200 ${copySuccess ? 'scale-110 text-green-600' : 'scale-100'}`}>
            {copySuccess ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </div>
        </Button>
        <h2 className="text-2xl font-semibold text-zinc-800 mr-2">
          מרכיבים
        </h2>
      </div>
      <div className="w-16 h-px bg-zinc-300"></div>
    </div>
  );
} 