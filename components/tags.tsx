'use client';

import { Recipe } from '@/lib/recipes';

interface TagsProps {
  tags: string[];
  className?: string;
  maxTags?: number;
  onClick?: (tag: string, event?: React.MouseEvent) => void;
}

export function Tags({ tags, className = '', maxTags, onClick }: TagsProps) {
  const displayTags = maxTags ? tags.slice(0, maxTags) : tags;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {displayTags.map((tag, index) => (
        <span
          key={index}
          className={`px-3 py-1 bg-zinc-100 text-zinc-700 rounded-md text-sm ${
            onClick ? 'cursor-pointer hover:bg-zinc-200 transition-colors' : ''
          }`}
          onClick={(event) => onClick?.(tag, event)}
        >
          {tag}
        </span>
      ))}
    </div>
  );
} 