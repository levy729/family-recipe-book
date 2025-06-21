'use client';

import { Tags } from '@/components/tags';
import { Recipe } from '@/lib/recipes';
import { handleTagClick } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface RecipeHeaderProps {
  recipe: Recipe;
}

export function RecipeHeader({ recipe }: RecipeHeaderProps) {
  const router = useRouter();

  const onTagClick = (tag: string, event?: React.MouseEvent) => {
    handleTagClick(tag, router, event);
  };

  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-zinc-900 mb-6">{recipe.title}</h1>

      {recipe.description && (
        <p className="text-lg text-zinc-600 mb-6 max-w-2xl mx-auto">
          {recipe.description}
        </p>
      )}

      {recipe.tags && recipe.tags.length > 0 && (
        <Tags tags={recipe.tags} onClick={onTagClick} />
      )}
    </div>
  );
}
