'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Recipe } from '@/lib/recipes';
import { RecipeCard } from '@/components/recipe-card';
import { SearchBar } from '@/components/search-bar';
import { initializeSearch, searchRecipes } from '@/lib/search';
import { LoadingSpinner } from '@/components/loading-spinner';

// Sample recipes data - in a real app, this would be loaded from markdown files
const sampleRecipes: Recipe[] = [
  {
    title: 'עוגת שוקולד קלה',
    slug: 'easy-chocolate-cake',
    tags: ['עוגה', 'קינוח', 'שוקולד'],
    ingredients: ['2 ביצים', '1 כוס סוכר', '1 כוס קקאו', '1 כוס קמח', '1/2 כוס שמן', '1 כוס מים'],
    instructions: '1. מחממים תנור ל-180 מעלות.\n2. מערבבים את כל החומרים בקערה.\n3. יוצקים לתבנית ואופים כ-30 דקות.',
    content: 'עוגת שוקולד קלה - מתכון פשוט וטעים'
  },
  {
    title: 'סלט יווני',
    slug: 'fresh-vegetable-salad',
    tags: ['סלט', 'ירקות', 'בריא'],
    ingredients: ['2 עגבניות', '1 מלפפון', '1 בצל אדום', '100 גרם גבינת פטה', 'זיתים', 'שמן זית', 'מיץ לימון'],
    instructions: '1. חותכים את הירקות לקוביות.\n2. מערבבים בקערה.\n3. מוסיפים גבינת פטה וזיתים.\n4. מתבלים בשמן זית ומיץ לימון.',
    content: 'סלט יווני טרי ובריא'
  }
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuery, setCurrentQuery] = useState(query);

  useEffect(() => {
    function performSearch() {
      setIsLoading(true);
      try {
        // Initialize search with sample recipes
        initializeSearch(sampleRecipes);
        
        // Perform search
        const searchResults = searchRecipes(query);
        setResults(searchResults);
        setCurrentQuery(query);
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
      setCurrentQuery('');
      setIsLoading(false);
    }
  }, [query]);

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim() && newQuery !== currentQuery) {
      router.push(`/search?q=${encodeURIComponent(newQuery.trim())}`);
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-4">
          תוצאות חיפוש
        </h1>
      </div>
      
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <SearchBar 
          className="mx-auto" 
          onSearch={handleSearch}
          placeholder="חפש מתכונים..."
          initialValue={currentQuery}
        />
      </div>
      
      {currentQuery && (
        <p className="text-lg text-zinc-600 mb-8">
          חיפוש עבור: "{currentQuery}"
        </p>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2">
            <LoadingSpinner size="sm" />
            <p className="text-zinc-600">מחפש...</p>
          </div>
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
      ) : currentQuery ? (
        <div className="text-center py-8">
          <p className="text-zinc-600 text-lg">
            לא נמצאו מתכונים עבור "{currentQuery}"
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
    </>
  );
} 