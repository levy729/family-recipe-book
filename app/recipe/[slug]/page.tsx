import { notFound } from 'next/navigation';
import { getRecipeBySlug, getAllRecipes } from '@/lib/recipes';
import { IngredientList } from '@/components/ingredient-list';
import { InstructionList } from '@/components/instruction-list';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { RecipeHeader } from '@/components/recipe-header';

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
    <>
      {/* Back to Home */}
      <div className="mb-12 flex justify-end">
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
      </div>

      {/* Recipe Header */}
      <RecipeHeader recipe={recipe} />

      {/* Divider */}
      <hr className="border-zinc-300 mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Ingredients Section */}
        <div className="text-right">
          <IngredientList
            ingredients={recipe.ingredients}
            recipeSlug={recipe.slug}
            recipeTitle={recipe.title}
          />
        </div>

        {/* Instructions Section */}
        <div className="text-right">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-zinc-800 mb-2">
              הוראות הכנה
            </h2>
            <div className="w-16 h-px bg-zinc-300"></div>
          </div>
          <InstructionList
            instructions={recipe.instructions}
          />
        </div>
      </div>
    </>
  );
} 
