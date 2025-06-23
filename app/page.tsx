import { getAllRecipes } from '@/lib/recipes';
import { HomePageClient } from '@/components/home-page-client';
import type { Metadata } from 'next';
import { HEBREW_TEXTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: HEBREW_TEXTS.HOME_PAGE_TITLE,
  description: HEBREW_TEXTS.HOME_PAGE_DESCRIPTION,
  keywords: HEBREW_TEXTS.HOME_PAGE_KEYWORDS,
  openGraph: {
    title: `${HEBREW_TEXTS.SITE_TITLE} - ${HEBREW_TEXTS.HOME_PAGE_SUBTITLE}`,
    description: HEBREW_TEXTS.HOME_PAGE_DESCRIPTION,
    type: 'website',
    url: 'https://levy729.github.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${HEBREW_TEXTS.SITE_TITLE} - ${HEBREW_TEXTS.HOME_PAGE_SUBTITLE}`,
    description: HEBREW_TEXTS.HOME_PAGE_DESCRIPTION,
    creator: '@familyrecipebook',
  },
  alternates: {
    canonical: 'https://levy729.github.io',
  },
};

export default async function Home() {
  const recipes = await getAllRecipes();

  return <HomePageClient initialRecipes={recipes} />;
}
