'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Recipe } from '@/lib/recipes';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

export function RecipeCard({ recipe, className = '' }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.slug}`} className="block">
      <Card className={`hover:shadow-md transition-shadow cursor-pointer ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium text-zinc-900 text-right">
            {recipe.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1 justify-end">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-zinc-100 text-zinc-600 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 