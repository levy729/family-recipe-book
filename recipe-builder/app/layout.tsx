import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Recipe Builder - Family Recipe Book',
  description: 'Web-based tool for creating and editing recipes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-screen bg-white text-zinc-900 antialiased">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-center text-zinc-900">
              Recipe Builder
            </h1>
            <p className="text-center text-zinc-600 mt-2">
              כלי ליצירה ועריכה של מתכונים
            </p>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
