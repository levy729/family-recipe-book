import { notFound } from 'next/navigation';
import { getRecipeBySlug, getAllRecipes } from '@/lib/recipes';
import { IngredientList } from '@/components/ingredient-list';
import { InstructionList } from '@/components/instruction-list';
import { RecipeHeader } from '@/components/recipe-header';
import { ShareButton } from '@/components/share-button';
import { HEBREW_TEXTS, formatHebrewText } from '@/lib/constants';
import type { Metadata } from 'next';

interface RecipePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  return recipes.map(recipe => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const recipe = await getRecipeBySlug(params.slug);

  if (!recipe) {
    return {
      title: HEBREW_TEXTS.RECIPE_NOT_FOUND,
    };
  }

  const recipeUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://levy729.github.io'}/recipe/${recipe.slug}`;
  const description =
    recipe.description ||
    formatHebrewText(HEBREW_TEXTS.RECIPE_DESCRIPTION_TEMPLATE, {
      title: recipe.title,
    });

  return {
    title: recipe.title,
    description,
    keywords: recipe.tags?.join(', ') || HEBREW_TEXTS.RECIPE_KEYWORDS_FALLBACK,
    openGraph: {
      title: recipe.title,
      description,
      type: 'article',
      url: recipeUrl,
      images: [
        {
          url: `/api/og/recipe/${recipe.slug}`, // Future: Open Graph image generation
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.title,
      description,
      creator: '@familyrecipebook',
    },
    alternates: {
      canonical: recipeUrl,
    },
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipeBySlug(params.slug);

  if (!recipe) {
    notFound();
  }

  const recipeUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://levy729.github.io'}/recipe/${recipe.slug}`;

  return (
    <>
      {/* Recipe Header */}
      <RecipeHeader recipe={recipe} />

      {/* Divider */}
      <hr className="border-zinc-300 mb-8" />

      {/* Share Button Row */}
      <div className="flex justify-end mb-4">
        <ShareButton title={recipe.title} url={recipeUrl} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Ingredients Section */}
        <div className="text-right">
          <IngredientList
            ingredients={recipe.ingredients}
            recipeSlug={recipe.slug}
          />
        </div>

        {/* Instructions Section */}
        <div className="text-right">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-zinc-800 mb-2">
              {HEBREW_TEXTS.INSTRUCTIONS_TITLE}
            </h2>
            <div className="w-16 h-px bg-zinc-300"></div>
          </div>
          <InstructionList instructions={recipe.instructions} />
        </div>
      </div>
    </>
  );
}
