'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { saveIngredientState, getIngredientState } from '@/lib/storage';

interface IngredientListProps {
  recipeSlug: string;
  ingredients: string[];
  recipeTitle?: string;
  className?: string;
}

export function IngredientList({ recipeSlug, ingredients, recipeTitle, className = '' }: IngredientListProps) {
  const [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>({});
  const [copySuccess, setCopySuccess] = useState(false);

  // Load initial states from session storage
  useEffect(() => {
    const states: { [key: string]: boolean } = {};
    ingredients.forEach(ingredient => {
      states[ingredient] = getIngredientState(recipeSlug, ingredient);
    });
    setCheckedStates(states);
  }, [recipeSlug, ingredients]);

  const handleCheckboxChange = (ingredient: string, checked: boolean) => {
    setCheckedStates(prev => ({
      ...prev,
      [ingredient]: checked
    }));
    saveIngredientState(recipeSlug, ingredient, checked);
  };

  // Calculate if all items are checked
  const allChecked = ingredients.length > 0 && ingredients.every(ingredient => checkedStates[ingredient]);
  const someChecked = ingredients.some(ingredient => checkedStates[ingredient]);

  const handleSelectAll = () => {
    const newStates: { [key: string]: boolean } = {};
    ingredients.forEach(ingredient => {
      newStates[ingredient] = true;
      saveIngredientState(recipeSlug, ingredient, true);
    });
    setCheckedStates(newStates);
  };

  const handleClearAll = () => {
    const newStates: { [key: string]: boolean } = {};
    ingredients.forEach(ingredient => {
      newStates[ingredient] = false;
      saveIngredientState(recipeSlug, ingredient, false);
    });
    setCheckedStates(newStates);
  };

  // Expose copy functionality to parent
  const handleCopyToClipboard = async () => {
    const ingredientText = ingredients.join('\n');
    
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
      (window as any).copyIngredients = copyIngredients;
    }
  }, [copyIngredients]);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-start mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyToClipboard}
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
        <h3 className="text-lg font-semibold text-zinc-900 mr-2">
          מרכיבים
        </h3>
      </div>
      {ingredients.length > 0 && (
        <div className="flex justify-start mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={allChecked ? handleClearAll : handleSelectAll}
            className="text-xs text-zinc-600 hover:text-zinc-600 hover:bg-transparent p-0 h-auto"
          >
            {allChecked ? 'נקה הכל' : 'סמן הכל'}
          </Button>
        </div>
      )}
      <div className="space-y-1">
        {ingredients.map((ingredient, index) => (
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
                checkedStates[ingredient] ? 'text-zinc-500 line-through' : 'text-zinc-700'
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