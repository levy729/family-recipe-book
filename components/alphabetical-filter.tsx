'use client';

import { HEBREW_TEXTS } from '@/lib/constants';

interface AlphabeticalFilterProps {
  selectedLetter: string | null;
  onLetterSelect: (letter: string | null) => void;
  recipeCounts: { [letter: string]: number };
}

// Hebrew alphabet
const HEBREW_ALPHABET = [
  'א',
  'ב',
  'ג',
  'ד',
  'ה',
  'ו',
  'ז',
  'ח',
  'ט',
  'י',
  'כ',
  'ל',
  'מ',
  'נ',
  'ס',
  'ע',
  'פ',
  'צ',
  'ק',
  'ר',
  'ש',
  'ת',
];

export function AlphabeticalFilter({
  selectedLetter,
  onLetterSelect,
  recipeCounts,
}: AlphabeticalFilterProps) {
  const handleLetterClick = (letter: string) => {
    if (selectedLetter === letter) {
      // If clicking the same letter, deselect it
      onLetterSelect(null);
    } else {
      // Select the new letter
      onLetterSelect(letter);
    }
  };

  const handleShowAllClick = () => {
    onLetterSelect(null);
  };

  return (
    <div className="space-y-4">
      {/* Show All Button */}
      <div className="text-center mb-4">
        <button
          onClick={handleShowAllClick}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            selectedLetter === null
              ? 'bg-zinc-900 text-white shadow-md'
              : 'bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-50 hover:border-zinc-400'
          }`}
        >
          {HEBREW_TEXTS.SHOW_ALL_RECIPES}
        </button>
      </div>

      {/* Alphabet Grid */}
      <div className="grid grid-cols-8 md:grid-cols-11 gap-2">
        {HEBREW_ALPHABET.map(letter => {
          const count = recipeCounts[letter] || 0;
          const isSelected = selectedLetter === letter;
          const hasRecipes = count > 0;

          return (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              disabled={!hasRecipes}
              className={`
                relative p-3 text-lg font-medium rounded-md transition-all duration-200
                ${
                  isSelected
                    ? 'bg-zinc-900 text-white shadow-md transform scale-105'
                    : hasRecipes
                      ? 'bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-50 hover:border-zinc-400 hover:shadow-sm'
                      : 'bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed'
                }
              `}
              title={hasRecipes ? `${count} מתכונים` : 'אין מתכונים'}
            >
              {letter}
              {hasRecipes && (
                <span className="absolute -top-1 -right-1 bg-zinc-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
