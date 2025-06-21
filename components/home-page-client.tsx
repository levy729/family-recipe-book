'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/search-bar';
import { RecipeCard } from '@/components/recipe-card';
import { Recipe } from '@/lib/recipes';
import { initializeSearch, searchRecipes } from '@/lib/search';
import { LoadingSpinner } from '@/components/loading-spinner';

interface HomePageClientProps {
  initialRecipes: Recipe[];
}

export function HomePageClient({ initialRecipes }: HomePageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>(
    initialRecipes.slice(0, 6)
  );

  useEffect(() => {
    // Initialize search with all recipes
    initializeSearch(initialRecipes);
  }, [initialRecipes]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim()) {
      setIsSearching(true);
      const results = searchRecipes(query);
      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  };

  const displayRecipes = searchQuery.trim() ? searchResults : recentRecipes;
  const showRecentTitle = !searchQuery.trim();

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">ספר מתכונים</h1>
      </div>

      <div className="flex justify-center mb-12">
        <SearchBar
          className="mx-auto"
          onSearch={handleSearch}
          placeholder="חפש מתכונים..."
        />
      </div>

      <div className="text-right">
        {showRecentTitle ? (
          <h2 className="text-2xl font-semibold text-zinc-800 mb-6">
            מתכונים אחרונים
          </h2>
        ) : (
          <h2 className="text-2xl font-semibold text-zinc-800 mb-6">
            תוצאות חיפוש
          </h2>
        )}

        {isSearching ? (
          <div className="text-center py-8">
            <div className="flex items-center justify-center gap-2">
              <LoadingSpinner size="sm" />
              <p className="text-zinc-600">מחפש...</p>
            </div>
          </div>
        ) : displayRecipes.length > 0 ? (
          <>
            {searchQuery.trim() && (
              <p className="text-sm text-zinc-500 mb-4">
                נמצאו {searchResults.length} מתכונים עבור "{searchQuery}"
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayRecipes.map((recipe, index) => (
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
          </>
        ) : searchQuery.trim() ? (
          <div className="text-center py-8">
            <p className="text-zinc-600 text-lg">
              לא נמצאו מתכונים עבור "{searchQuery}"
            </p>
            <p className="text-zinc-500 mt-2">נסה לחפש עם מילים אחרות</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
