import { notFound } from 'next/navigation';
import { getRecipeBySlug, getAllRecipes } from '@/lib/recipes';
import { IngredientList } from '@/components/ingredient-list';
import { InstructionList } from '@/components/instruction-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface RecipePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipeBySlug(params.slug);

  if (!recipe) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-4xl w-full">
        {/* Back to Home */}
        <div className="mb-12">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              ← חזרה לדף הבית
            </Button>
          </Link>
        </div>

        {/* Recipe Header */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-zinc-900 mb-6">
            {recipe.title}
          </h1>

          {recipe.tags && recipe.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {recipe.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-zinc-100 text-zinc-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Ingredients Section */}
          <div className="text-right">
            <h2 className="text-2xl font-semibold text-zinc-800 mb-6">
              מרכיבים
            </h2>
            <IngredientList
              ingredients={recipe.ingredients}
              recipeSlug={recipe.slug}
            />
          </div>

          {/* Instructions Section */}
          <div className="text-right">
            <h2 className="text-2xl font-semibold text-zinc-800 mb-6">
              הוראות הכנה
            </h2>
            <InstructionList
              instructions={recipe.instructions}
            />
          </div>
        </div>
      </div>
    </main>
  );
} 
