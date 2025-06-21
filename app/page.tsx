'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from "@/components/search-bar";
import { RecipeCard } from "@/components/recipe-card";
import { Recipe } from "@/lib/recipes";
import { initializeSearch, searchRecipes } from '@/lib/search';

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

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>(sampleRecipes.slice(0, 6));

  useEffect(() => {
    // Initialize search with all recipes
    initializeSearch(sampleRecipes);
  }, []);

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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">
          ספר מתכונים משפחתי
        </h1>
        <p className="text-xl text-zinc-600 mb-8">
          Family Recipe Book
        </p>
        
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
              <p className="text-zinc-600">מחפש...</p>
            </div>
          ) : displayRecipes.length > 0 ? (
            <>
              {searchQuery.trim() && (
                <p className="text-sm text-zinc-500 mb-4">
                  נמצאו {searchResults.length} מתכונים עבור "{searchQuery}"
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayRecipes.map((recipe) => (
                  <RecipeCard key={recipe.slug} recipe={recipe} />
                ))}
              </div>
            </>
          ) : searchQuery.trim() ? (
            <div className="text-center py-8">
              <p className="text-zinc-600 text-lg">
                לא נמצאו מתכונים עבור "{searchQuery}"
              </p>
              <p className="text-zinc-500 mt-2">
                נסה לחפש עם מילים אחרות
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
