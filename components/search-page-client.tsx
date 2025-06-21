'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Recipe } from '@/lib/recipes';
import { RecipeCard } from '@/components/recipe-card';
import { SearchBar } from '@/components/search-bar';
import { initializeSearch, searchRecipes } from '@/lib/search';
import { LoadingSpinner } from '@/components/loading-spinner';
import { HEBREW_TEXTS, formatHebrewText } from '@/lib/constants';

interface SearchPageClientProps {
  initialRecipes: Recipe[];
}

export function SearchPageClient({ initialRecipes }: SearchPageClientProps) {
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
        // Initialize search with real recipes
        initializeSearch(initialRecipes);

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
  }, [query, initialRecipes]);

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim() && newQuery !== currentQuery) {
      router.push(`/search?q=${encodeURIComponent(newQuery.trim())}`);
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-4">
          {HEBREW_TEXTS.SEARCH_RESULTS_TITLE}
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <SearchBar
          className="mx-auto"
          onSearch={handleSearch}
          placeholder={HEBREW_TEXTS.SEARCH_PLACEHOLDER}
          initialValue={currentQuery}
        />
      </div>

      {currentQuery && (
        <p className="text-lg text-zinc-600 mb-8">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          {formatHebrewText(HEBREW_TEXTS.SEARCH_FOR + ' "{query}"', {
            query: currentQuery,
          })}
        </p>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2">
            <LoadingSpinner size="sm" />
            <p className="text-zinc-600">{HEBREW_TEXTS.SEARCHING_TEXT}</p>
          </div>
        </div>
      ) : results.length > 0 ? (
        <div className="text-right">
          <p className="text-sm text-zinc-500 mb-4">
            {formatHebrewText(HEBREW_TEXTS.FOUND_RECIPES, {
              count: results.length,
            })}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((recipe, index) => (
              <div
                key={recipe.slug}
                className="animate-in fade-in-0 slide-in-from-bottom-2"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: '500ms',
                }}
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        </div>
      ) : currentQuery ? (
        <div className="text-center py-8">
          <p className="text-zinc-600 text-lg">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            {formatHebrewText(HEBREW_TEXTS.NO_RECIPES_FOUND, {
              query: currentQuery,
            })}
          </p>
          <p className="text-zinc-500 mt-2">
            {HEBREW_TEXTS.TRY_DIFFERENT_WORDS}
          </p>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-zinc-600 text-lg">
            {HEBREW_TEXTS.ENTER_SEARCH_QUERY}
          </p>
        </div>
      )}
    </>
  );
}
