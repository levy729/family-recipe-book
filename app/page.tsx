import { Button } from '@/components/ui/button';
import { SearchBar } from "@/components/search-bar";
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
              <div
                key={recipe.slug}
                className="p-4 border border-zinc-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-zinc-900 mb-2">{recipe.title}</h3>
                <div className="flex flex-wrap gap-1">
                  {recipe.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-zinc-100 text-zinc-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
