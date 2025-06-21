import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-zinc-900 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-zinc-800 mb-4">
          עמוד לא נמצא
        </h2>
        <p className="text-zinc-600 mb-8">
          המתכון שחיפשת לא קיים או הוסר מהאתר.
        </p>
        <Link href="/">
          <Button>
            חזרה לדף הבית
          </Button>
        </Link>
      </div>
    </div>
  );
} 