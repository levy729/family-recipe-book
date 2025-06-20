import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Family Recipe Book',
  description: 'A collection of family recipes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        {children}
      </body>
    </html>
  )
} 