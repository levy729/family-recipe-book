'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tags } from '@/components/tags';
import { Recipe } from '@/lib/recipes';
import { handleTagClick } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

export function RecipeCard({ recipe, className = '' }: RecipeCardProps) {
  const router = useRouter();

  const onTagClick = (tag: string, event?: React.MouseEvent) => {
    handleTagClick(tag, router, event);
  };

  return (
    <Link href={`/recipe/${recipe.slug}`} className="block group">
      <Card
        className={`hover:shadow-md transition-all duration-300 ease-out cursor-pointer ${className}`}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium text-zinc-900 text-right">
            {recipe.title}
          </CardTitle>
          <div className="min-h-[2.5rem] mt-1">
            {recipe.description && (
              <p className="text-sm text-zinc-600 text-right line-clamp-2">
                {recipe.description}
              </p>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Tags
            tags={recipe.tags}
            maxTags={3}
            onClick={onTagClick}
            className="justify-end"
          />
        </CardContent>
      </Card>
    </Link>
  );
}
