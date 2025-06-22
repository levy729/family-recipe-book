'use client';

import { useState, useMemo } from 'react';
import { RecipeCard } from '@/components/recipe-card';
import { AlphabeticalFilter } from '@/components/alphabetical-filter';
import { Recipe } from '@/lib/recipes';
import { HEBREW_TEXTS, formatHebrewText } from '@/lib/constants';

interface RecipesPageClientProps {
  initialRecipes: Recipe[];
}

export function RecipesPageClient({ initialRecipes }: RecipesPageClientProps) {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // Filter recipes based on selected letter
  const filteredRecipes = useMemo(() => {
    if (!selectedLetter) {
      return initialRecipes;
    }

    return initialRecipes.filter(recipe => {
      const firstChar = recipe.title.charAt(0);
      return firstChar === selectedLetter;
    });
  }, [initialRecipes, selectedLetter]);

  // Calculate recipe counts for each letter
  const recipeCounts = useMemo(() => {
    const counts: { [letter: string]: number } = {};

    initialRecipes.forEach(recipe => {
      const firstChar = recipe.title.charAt(0);
      counts[firstChar] = (counts[firstChar] || 0) + 1;
    });

    return counts;
  }, [initialRecipes]);

  const handleLetterSelect = (letter: string | null) => {
    setSelectedLetter(letter);
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">
          {HEBREW_TEXTS.RECIPES_PAGE_TITLE}
        </h1>
        <p className="text-lg text-zinc-600">
          {HEBREW_TEXTS.RECIPES_PAGE_SUBTITLE}
        </p>
      </div>

      {/* Alphabetical Filter */}
      <div className="mb-8">
        <AlphabeticalFilter
          selectedLetter={selectedLetter}
          onLetterSelect={handleLetterSelect}
          recipeCounts={recipeCounts}
        />
      </div>

      {/* Recipe Count */}
      <div className="text-right mb-6">
        <p className="text-sm text-zinc-500">
          {selectedLetter
            ? formatHebrewText(HEBREW_TEXTS.RECIPES_FOUND_FOR_LETTER, {
                count: filteredRecipes.length,
                letter: selectedLetter,
              })
            : formatHebrewText(HEBREW_TEXTS.RECIPES_FOUND, {
                count: filteredRecipes.length,
              })}
        </p>
      </div>

      {/* Recipe Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map((recipe, index) => (
            <div
              key={recipe.slug}
              className="animate-in fade-in-0 slide-in-from-bottom-2"
              style={{
                animationDelay: `${index * 100}ms`,
                animationDuration: '500ms',
              }}
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-zinc-600 text-lg">
            {selectedLetter
              ? formatHebrewText(HEBREW_TEXTS.NO_RECIPES_FOR_LETTER, {
                  letter: selectedLetter,
                })
              : HEBREW_TEXTS.NO_RECIPES_FOUND_GENERAL}
          </p>
        </div>
      )}
    </>
  );
}
