'use client';

import { useState, useEffect } from 'react';
import { Type } from 'lucide-react';

const FONT_SIZE_KEY = 'recipe-book-font-size';
const FONT_SCALES = [1, 1.125, 1.25]; // 1x, 1.125x, 1.25x scaling
const DEFAULT_SCALE_INDEX = 0; // 1x (normal size)

export function FontSizeControls() {
  const [currentIndex, setCurrentIndex] = useState(DEFAULT_SCALE_INDEX);

  // Load font size from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FONT_SIZE_KEY);
      if (stored) {
        const scale = parseFloat(stored);
        const index = FONT_SCALES.indexOf(scale);
        if (index !== -1) {
          setCurrentIndex(index);
          applyFontScale(scale);
        }
      }
    } catch (error) {
      console.error('Failed to load font size:', error);
    }
  }, []);

  const applyFontScale = (scale: number) => {
    document.documentElement.style.setProperty(
      '--font-size-scale',
      scale.toString()
    );
  };

  const saveFontScale = (scale: number) => {
    try {
      localStorage.setItem(FONT_SIZE_KEY, scale.toString());
    } catch (error) {
      console.error('Failed to save font size:', error);
    }
  };

  const handleCycle = () => {
    const nextIndex = (currentIndex + 1) % FONT_SCALES.length;
    const newScale = FONT_SCALES[nextIndex];

    setCurrentIndex(nextIndex);
    applyFontScale(newScale);
    saveFontScale(newScale);
  };

  return (
    <button
      onClick={handleCycle}
      className="p-2 h-8 w-8 text-zinc-600 hover:text-zinc-900 transition-colors duration-200 rounded-md focus:outline-none"
    >
      <Type className="w-4 h-4" />
    </button>
  );
}
