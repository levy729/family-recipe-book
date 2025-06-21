'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  initialValue?: string;
}

const SEARCH_HISTORY_KEY = 'recipe-search-history';
const MAX_HISTORY_ITEMS = 5;

export function SearchBar({ 
  onSearch, 
  placeholder = 'חפש מתכונים...', 
  className = '',
  initialValue = ''
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load search history from localStorage
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (history) {
      try {
        setSearchHistory(JSON.parse(history));
      } catch (error) {
        console.error('Failed to parse search history:', error);
      }
    }
  }, []);

  // Update query when initialValue changes
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const addToHistory = (searchTerm: string) => {
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) return;

    const newHistory = [
      trimmedTerm,
      ...searchHistory.filter(item => item !== trimmedTerm)
    ].slice(0, MAX_HISTORY_ITEMS);

    setSearchHistory(newHistory);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
    setShowHistory(value.length === 0 && searchHistory.length > 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addToHistory(query);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
    setShowHistory(searchHistory.length > 0);
    inputRef.current?.focus();
  };

  const handleHistoryClick = (historyItem: string) => {
    setQuery(historyItem);
    onSearch?.(historyItem);
    addToHistory(historyItem);
    setShowHistory(false);
    router.push(`/search?q=${encodeURIComponent(historyItem)}`);
  };

  const handleInputFocus = () => {
    if (searchHistory.length > 0) {
      setShowHistory(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding to allow clicking on history items
    setTimeout(() => setShowHistory(false), 200);
  };

  return (
    <div className={`w-full max-w-md relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="text-right placeholder:text-right pr-10"
              dir="rtl"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <Button type="submit" disabled={!query.trim()}>
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </form>

      {/* Search History Dropdown */}
      {showHistory && searchHistory.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-md shadow-lg z-10">
          <div className="py-1">
            <div className="px-3 py-2 text-xs text-zinc-500 border-b border-zinc-100">
              חיפושים אחרונים
            </div>
            {searchHistory.map((historyItem, index) => (
              <button
                key={index}
                onClick={() => handleHistoryClick(historyItem)}
                className="w-full text-right px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                {historyItem}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 