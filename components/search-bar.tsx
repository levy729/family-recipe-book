'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SEARCH_HISTORY_KEY = 'recipe-search-history';
const MAX_HISTORY_ITEMS = 5;

export function SearchBar({ 
  onSearch, 
  placeholder = 'חפש מתכונים...', 
  className = '' 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
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
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="text-right placeholder:text-right flex-1"
            dir="rtl"
          />
          <Button type="submit" disabled={!query.trim()}>
            חפש
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