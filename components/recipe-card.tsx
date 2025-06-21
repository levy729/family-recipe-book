'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tags } from '@/components/tags';
import { Recipe } from '@/lib/recipes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

export function RecipeCard({ recipe, className = '' }: RecipeCardProps) {
  const router = useRouter();

  const handleTagClick = (tag: string) => {
    router.push(`/search?q=${encodeURIComponent(tag)}`);
  };

  return (
    <Link href={`/recipe/${recipe.slug}`} className="block">
      <Card className={`hover:shadow-md transition-shadow cursor-pointer ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium text-zinc-900 text-right">
            {recipe.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Tags 
            tags={recipe.tags} 
            maxTags={3} 
            onClick={handleTagClick}
            className="justify-end"
          />
        </CardContent>
      </Card>
    </Link>
  );
} 