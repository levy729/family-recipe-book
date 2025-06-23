import type { Metadata } from 'next';
import './globals.css';
import { FontSizeControls } from '@/components/font-size-controls';
import { BackButton } from '@/components/back-button';
import { Footer } from '@/components/footer';
import { AnalyticsProvider } from '@/components/analytics-provider';
import { HEBREW_TEXTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: {
    default: HEBREW_TEXTS.SITE_TITLE,
    template: `%s - ${HEBREW_TEXTS.SITE_TITLE}`,
  },
  description: HEBREW_TEXTS.SITE_DESCRIPTION,
  keywords: HEBREW_TEXTS.SITE_KEYWORDS,
  authors: [{ name: HEBREW_TEXTS.SITE_TITLE }],
  creator: HEBREW_TEXTS.SITE_TITLE,
  publisher: HEBREW_TEXTS.SITE_TITLE,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://levy729.github.io/family-recipe-book'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    title: HEBREW_TEXTS.SITE_TITLE,
    description: HEBREW_TEXTS.SITE_DESCRIPTION,
    siteName: HEBREW_TEXTS.SITE_TITLE,
    locale: 'he_IL',
    url: 'https://levy729.github.io/family-recipe-book',
  },
  twitter: {
    card: 'summary_large_image',
    title: HEBREW_TEXTS.SITE_TITLE,
    description: HEBREW_TEXTS.SITE_DESCRIPTION,
    creator: '@familyrecipebook',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
        <AnalyticsProvider>
          <main className="flex-1 p-8">
            <div className="max-w-4xl w-full mx-auto">
              <div className="flex justify-between items-center mb-4">
                <FontSizeControls />
                <BackButton />
              </div>
              {children}
            </div>
          </main>
          <Footer />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
