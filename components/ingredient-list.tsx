'use client';

import { useState, useEffect, useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ClipboardCopy, Check } from 'lucide-react';
import { saveIngredientState, getIngredientState } from '@/lib/storage';
import { HEBREW_TEXTS } from '@/lib/constants';

interface IngredientListProps {
  recipeSlug: string;
  ingredients: string[];
  className?: string;
}

// Extend Window interface to include copyIngredients
declare global {
  interface Window {
    copyIngredients?: () => void;
  }
}

export function IngredientList({
  recipeSlug,
  ingredients,
  className = '',
}: IngredientListProps) {
  // Ensure ingredients is always an array
  const safeIngredients = useMemo(
    () => (Array.isArray(ingredients) ? ingredients : []),
    [ingredients]
  );

  const [checkedStates, setCheckedStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [copySuccess, setCopySuccess] = useState(false);

  // Load initial states from session storage
  useEffect(() => {
    const states: { [key: string]: boolean } = {};
    safeIngredients.forEach(ingredient => {
      states[ingredient] = getIngredientState(recipeSlug, ingredient);
    });
    setCheckedStates(states);
  }, [recipeSlug, safeIngredients]);

  const handleCheckboxChange = (ingredient: string, checked: boolean) => {
    setCheckedStates(prev => ({
      ...prev,
      [ingredient]: checked,
    }));
    saveIngredientState(recipeSlug, ingredient, checked);
  };

  // Calculate if all items are checked
  const allChecked =
    safeIngredients.length > 0 &&
    safeIngredients.every(ingredient => checkedStates[ingredient]);

  const handleSelectAll = () => {
    const newStates: { [key: string]: boolean } = {};
    safeIngredients.forEach(ingredient => {
      newStates[ingredient] = true;
      saveIngredientState(recipeSlug, ingredient, true);
    });
    setCheckedStates(newStates);
  };

  const handleClearAll = () => {
    const newStates: { [key: string]: boolean } = {};
    safeIngredients.forEach(ingredient => {
      newStates[ingredient] = false;
      saveIngredientState(recipeSlug, ingredient, false);
    });
    setCheckedStates(newStates);
  };

  // Expose copy functionality to parent
  const handleCopyToClipboard = async () => {
    const ingredientText = safeIngredients.join('\n');

    try {
      await navigator.clipboard.writeText(ingredientText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = ingredientText;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
      }
      document.body.removeChild(textArea);
    }
  };

  // Expose copy function to parent via ref
  const copyIngredients = handleCopyToClipboard;

  // Make copy function available to parent
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.copyIngredients = copyIngredients;
    }
  }, [copyIngredients]);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="mb-6">
        <div className="flex items-center justify-start mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyToClipboard}
            className="text-zinc-600 hover:text-zinc-600 hover:bg-transparent p-0 h-auto transition-all duration-200"
          >
            <div
              className={`transition-all duration-200 ${copySuccess ? 'scale-110' : 'scale-100'}`}
            >
              {copySuccess ? (
                <Check className="w-4 h-4" />
              ) : (
                <ClipboardCopy className="w-4 h-4" />
              )}
            </div>
          </Button>
          <h2 className="text-2xl font-semibold text-zinc-800 mr-2">
            {HEBREW_TEXTS.INGREDIENTS_TITLE}
          </h2>
        </div>
        <div className="w-16 h-px bg-zinc-300"></div>
      </div>
      {safeIngredients.length > 0 && (
        <div className="flex justify-start mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={allChecked ? handleClearAll : handleSelectAll}
            className="text-xs text-zinc-600 hover:text-zinc-600 hover:bg-transparent p-0 h-auto"
          >
            {allChecked ? HEBREW_TEXTS.CLEAR_ALL : HEBREW_TEXTS.SELECT_ALL}
          </Button>
        </div>
      )}
      <div className="space-y-1">
        {safeIngredients.map((ingredient, index) => (
          <div
            key={ingredient}
            className={`flex items-start gap-2 p-1 rounded-md transition-all duration-200 hover:bg-zinc-50 ${
              checkedStates[ingredient] ? 'opacity-75' : ''
            }`}
          >
            <Checkbox
              id={`ingredient-${index}`}
              checked={checkedStates[ingredient] || false}
              onCheckedChange={(checked: boolean | 'indeterminate') =>
                handleCheckboxChange(ingredient, checked === true)
              }
              className="mt-0.5 transition-all duration-200 hover:scale-110"
            />
            <label
              htmlFor={`ingredient-${index}`}
              className={`text-sm leading-relaxed cursor-pointer transition-all duration-200 ${
                checkedStates[ingredient]
                  ? 'text-zinc-500 line-through'
                  : 'text-zinc-700'
              }`}
            >
              {ingredient}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
