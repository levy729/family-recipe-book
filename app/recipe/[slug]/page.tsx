import { notFound } from 'next/navigation';
import { getRecipeBySlug, getAllRecipes } from '@/lib/recipes';
import { IngredientList } from '@/components/ingredient-list';
import { InstructionList } from '@/components/instruction-list';
import { RecipeHeader } from '@/components/recipe-header';
import { ShareButton } from '@/components/share-button';

interface RecipePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  return recipes.map(recipe => ({ slug: recipe.slug }));
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipeBySlug(params.slug);

  if (!recipe) {
    notFound();
  }

  return (
    <>
      {/* Recipe Header */}
      <RecipeHeader recipe={recipe} />

      {/* Divider */}
      <hr className="border-zinc-300 mb-8" />

      {/* Share Button Row */}
      <div className="flex justify-end mb-4">
        <ShareButton
          title={recipe.title}
          url={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'}/recipe/${recipe.slug}`}
        />
      </div>

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
          <InstructionList instructions={recipe.instructions} />
        </div>
      </div>
    </>
  );
}
