'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { saveIngredientState, getIngredientState } from '@/lib/storage';

interface IngredientListProps {
  recipeSlug: string;
  ingredients: string[];
  className?: string;
}

export function IngredientList({ recipeSlug, ingredients, className = '' }: IngredientListProps) {
  const [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>({});

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

  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-lg font-semibold text-zinc-900 text-right mb-4">
        מרכיבים
      </h3>
      <div className="space-y-2">
        {ingredients.map((ingredient) => (
          <div key={ingredient} className="flex items-center space-x-3 space-x-reverse">
            <Checkbox
              id={ingredient}
              checked={checkedStates[ingredient] || false}
              onCheckedChange={(checked: boolean | 'indeterminate') => 
                handleCheckboxChange(ingredient, checked === true)
              }
            />
            <label
              htmlFor={ingredient}
              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                checkedStates[ingredient] ? 'line-through text-zinc-500' : 'text-zinc-900'
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