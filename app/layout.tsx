import type { Metadata } from 'next';
import './globals.css';
import { FontSizeControls } from '@/components/font-size-controls';

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
      <body className="min-h-screen bg-zinc-50 text-zinc-900 p-8">
        <main className="flex min-h-screen flex-col items-center">
          <div className="max-w-4xl w-full">
            <div className="flex justify-start mb-4">
              <FontSizeControls />
            </div>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
