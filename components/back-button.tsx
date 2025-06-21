'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function BackButton() {
  const pathname = usePathname();
  
  // Don't show back button on homepage
  if (pathname === '/') {
    return null;
  }

  return (
    <Link href="/">
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 text-zinc-600 hover:text-zinc-900 transition-colors"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
    </Link>
  );
} 