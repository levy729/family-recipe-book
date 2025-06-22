import { getAllRecipes } from '@/lib/recipes';
import { RecipesPageClient } from '@/components/recipes-page-client';

export default async function RecipesPage() {
  const recipes = await getAllRecipes();

  return <RecipesPageClient initialRecipes={recipes} />;
}
