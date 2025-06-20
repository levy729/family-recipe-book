'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Recipe } from '@/lib/recipes';
import { RecipeCard } from '@/components/recipe-card';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function performSearch() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (response.ok) {
          const searchResults = await response.json();
          setResults(searchResults);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (query) {
      performSearch();
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-center max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-zinc-900 mb-4">
          תוצאות חיפוש
        </h1>
        
        {query && (
          <p className="text-lg text-zinc-600 mb-8">
            חיפוש עבור: "{query}"
          </p>
        )}

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-zinc-600">מחפש...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="text-right">
            <p className="text-sm text-zinc-500 mb-4">
              נמצאו {results.length} מתכונים
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          </div>
        ) : query ? (
          <div className="text-center py-8">
            <p className="text-zinc-600 text-lg">
              לא נמצאו מתכונים עבור "{query}"
            </p>
            <p className="text-zinc-500 mt-2">
              נסה לחפש עם מילים אחרות
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-zinc-600 text-lg">
              הזן מילת חיפוש כדי למצוא מתכונים
            </p>
          </div>
        )}
      </div>
    </main>
  );
} 