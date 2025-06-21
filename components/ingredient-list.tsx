'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
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

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-zinc-900 text-right">
          מרכיבים
        </h3>
        {ingredients.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={allChecked ? handleClearAll : handleSelectAll}
            className="text-xs text-zinc-600 hover:text-zinc-900"
          >
            {allChecked ? 'נקה הכל' : 'בחר הכל'}
          </Button>
        )}
      </div>
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