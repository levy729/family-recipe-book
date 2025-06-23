import { getAllRecipes } from '@/lib/recipes';
import { RecipesPageClient } from '@/components/recipes-page-client';
import type { Metadata } from 'next';
import { HEBREW_TEXTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: HEBREW_TEXTS.RECIPES_PAGE_TITLE,
  description: HEBREW_TEXTS.RECIPES_PAGE_SUBTITLE,
  keywords: HEBREW_TEXTS.RECIPES_PAGE_KEYWORDS,
  openGraph: {
    title: `${HEBREW_TEXTS.RECIPES_PAGE_TITLE} - ${HEBREW_TEXTS.SITE_TITLE}`,
    description: HEBREW_TEXTS.RECIPES_PAGE_SUBTITLE,
    type: 'website',
    url: 'https://levy729.github.io/family-recipe-book/recipes',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${HEBREW_TEXTS.RECIPES_PAGE_TITLE} - ${HEBREW_TEXTS.SITE_TITLE}`,
    description: HEBREW_TEXTS.RECIPES_PAGE_SUBTITLE,
    creator: '@familyrecipebook',
  },
  alternates: {
    canonical: 'https://levy729.github.io/family-recipe-book/recipes',
  },
};

export default async function RecipesPage() {
  const recipes = await getAllRecipes();

  return <RecipesPageClient initialRecipes={recipes} />;
}
