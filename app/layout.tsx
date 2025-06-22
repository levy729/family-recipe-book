import type { Metadata } from 'next';
import './globals.css';
import { FontSizeControls } from '@/components/font-size-controls';
import { BackButton } from '@/components/back-button';
import { Footer } from '@/components/footer';
import { AnalyticsProvider } from '@/components/analytics-provider';

export const metadata: Metadata = {
  title: 'Family Recipe Book',
  description: 'A collection of family recipes',
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
