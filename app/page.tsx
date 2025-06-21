import { getAllRecipes } from '@/lib/recipes';
import { HomePageClient } from '@/components/home-page-client';

export default async function Home() {
  const recipes = await getAllRecipes();

  return <HomePageClient initialRecipes={recipes} />;
}
