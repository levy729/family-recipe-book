import { getAllRecipes } from '@/lib/recipes';
import { SearchPageClient } from '@/components/search-page-client';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { HEBREW_TEXTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: HEBREW_TEXTS.SEARCH_RESULTS_TITLE,
  description: HEBREW_TEXTS.SEARCH_PAGE_DESCRIPTION,
  keywords: HEBREW_TEXTS.SEARCH_PAGE_KEYWORDS,
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: `${HEBREW_TEXTS.SEARCH_RESULTS_TITLE} - ${HEBREW_TEXTS.SITE_TITLE}`,
    description: HEBREW_TEXTS.SEARCH_PAGE_DESCRIPTION,
    type: 'website',
    url: 'https://levy729.github.io/family-recipe-book/search',
  },
  twitter: {
    card: 'summary',
    title: `${HEBREW_TEXTS.SEARCH_RESULTS_TITLE} - ${HEBREW_TEXTS.SITE_TITLE}`,
    description: HEBREW_TEXTS.SEARCH_PAGE_DESCRIPTION,
    creator: '@familyrecipebook',
  },
  alternates: {
    canonical: 'https://levy729.github.io/family-recipe-book/search',
  },
};

export default async function SearchPage() {
  const recipes = await getAllRecipes();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageClient initialRecipes={recipes} />
    </Suspense>
  );
}
