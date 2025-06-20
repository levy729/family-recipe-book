'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ 
  onSearch, 
  placeholder = 'חפש מתכונים...', 
  className = '' 
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  return (
    <div className={`w-full max-w-md ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        className="text-right placeholder:text-right"
        dir="rtl"
      />
    </div>
  );
} 