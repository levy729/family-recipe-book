import { Button } from '@/components/ui/button';
import { SearchBar } from "@/components/search-bar";
import { RecipeCard } from "@/components/recipe-card";
import { getRecentRecipes } from "@/lib/recipes";

export default async function Home() {
  const recentRecipes = await getRecentRecipes(6);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">
          ספר מתכונים משפחתי
        </h1>
        <p className="text-xl text-zinc-600 mb-8">
          Family Recipe Book
        </p>
        
        <div className="flex justify-center mb-12">
          <SearchBar className="mx-auto" />
        </div>
        
        <div className="text-right">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-6">
            מתכונים אחרונים
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
