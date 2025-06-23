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
    canonical: 'https://levy729.github.io/family-recipe-book',
  },
};

export default async function Home() {
  const recipes = await getAllRecipes();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Temporary analytics debug
            if (typeof window !== 'undefined') {
              setTimeout(() => {
                console.log('🔍 Analytics Debug Info:');
                console.log('Environment:', '${process.env.NODE_ENV}');
                console.log('GA4 ID from env:', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}' || 'MISSING');
                console.log('GA4 ID length:', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}'.length);
                console.log('GA4 ID format valid:', /^G-[A-Z0-9]{10}$/.test('${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}'));
                console.log('gtag function:', typeof window.gtag);
                console.log('dataLayer:', window.dataLayer ? 'exists' : 'missing');
                console.log('Analytics should be enabled:', '${process.env.NODE_ENV}' === 'production' && '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              }, 1000);
            }
          `,
        }}
      />
      <HomePageClient initialRecipes={recipes} />
    </>
  );
}
