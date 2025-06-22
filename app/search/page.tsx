import { getAllRecipes } from '@/lib/recipes';
import { SearchPageClient } from '@/components/search-page-client';
import { Suspense } from 'react';

export default async function SearchPage() {
  const recipes = await getAllRecipes();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageClient initialRecipes={recipes} />
    </Suspense>
  );
}
