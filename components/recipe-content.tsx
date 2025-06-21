'use client';

import { Tags } from '@/components/tags';
import { IngredientList } from '@/components/ingredient-list';
import { InstructionList } from '@/components/instruction-list';
import { IngredientHeader } from '@/components/ingredient-header';
import { Recipe } from '@/lib/recipes';
import { HEBREW_TEXTS } from '@/lib/constants';

interface RecipeContentProps {
  recipe: Recipe;
}

export function RecipeContent({ recipe }: RecipeContentProps) {
  return (
    <>
      {/* Recipe Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-zinc-900 mb-6">
          {recipe.title}
        </h1>

        {recipe.tags && recipe.tags.length > 0 && <Tags tags={recipe.tags} />}
      </div>

      {/* Divider */}
      <hr className="border-zinc-300 mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Ingredients Section */}
        <div className="text-right">
          <IngredientHeader
            onCopy={() => {
              if (typeof window !== 'undefined' && window.copyIngredients) {
                window.copyIngredients();
              }
            }}
          />
          <IngredientList
            ingredients={recipe.ingredients}
            recipeSlug={recipe.slug}
          />
        </div>

        {/* Instructions Section */}
        <div className="text-right">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-zinc-800 mb-2">
              {HEBREW_TEXTS.INSTRUCTIONS_TITLE}
            </h2>
            <div className="w-16 h-px bg-zinc-300"></div>
          </div>
          <InstructionList instructions={recipe.instructions} />
        </div>
      </div>
    </>
  );
}
