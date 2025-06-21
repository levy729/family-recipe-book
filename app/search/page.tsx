import { getAllRecipes } from '@/lib/recipes';
import { SearchPageClient } from '@/components/search-page-client';

export default async function SearchPage() {
  const recipes = await getAllRecipes();

  return <SearchPageClient initialRecipes={recipes} />;
}
