// Hebrew text constants for the Family Recipe Book
// This file centralizes all hardcoded Hebrew text to ensure consistency and easy maintenance

export const HEBREW_TEXTS = {
  // Page titles and headers
  SITE_TITLE: 'ספר מתכונים',
  RECIPE_BUILDER_TITLE: 'Recipe Builder',
  RECIPE_BUILDER_SUBTITLE: 'כלי ליצירה ועריכה של מתכונים',
  SEARCH_RESULTS_TITLE: 'תוצאות חיפוש',
  RECENT_RECIPES_TITLE: 'מתכונים אחרונים',
  INGREDIENTS_TITLE: 'מרכיבים',

  // Search related
  SEARCH_PLACEHOLDER: 'חפש מתכונים...',
  SEARCHING_TEXT: 'מחפש...',
  SEARCH_FOR: 'חיפוש עבור:',
  ENTER_SEARCH_QUERY: 'הזן מילת חיפוש כדי למצוא מתכונים',
  TRY_DIFFERENT_WORDS: 'נסה לחפש עם מילים אחרות',

  // Search results
  FOUND_RECIPES: 'נמצאו {count} מתכונים',
  FOUND_RECIPES_FOR: 'נמצאו {count} מתכונים עבור "{query}"',
  NO_RECIPES_FOUND: 'לא נמצאו מתכונים עבור "{query}"',
  NO_RECIPES_FOUND_GENERAL: 'לא נמצאו מתכונים',

  // Error pages
  PAGE_NOT_FOUND: 'עמוד לא נמצא',
  RECIPE_NOT_FOUND: 'המתכון שחיפשת לא קיים או הוסר מהאתר.',
  BACK_TO_HOME: 'חזרה לדף הבית',

  // Footer
  ALL_RIGHTS_RESERVED: '© 2025 All rights reserved',

  // Recipe builder specific
  RECIPE_BUILDER: {
    TITLE: 'Recipe Builder',
    SUBTITLE: 'כלי ליצירה ועריכה של מתכונים',
  },
} as const;

// Hebrew tag options for recipes
export const HEBREW_TAGS = [
  'בשר',
  'עיקרי',
  'תוספת',
  'קינוח',
  'ארוחת בוקר',
  'מסורתי',
  'צמחוני',
  'טבעוני',
  'ללא גלוטן',
  'קל',
  'בינוני',
  'מתקדם',
  'קציצות',
  'מרק',
  'סלט',
  'עוגה',
  'לחם',
  'פסטה',
  'אורז',
  'ירקות',
] as const;

export type HebrewTag = (typeof HEBREW_TAGS)[number];

// Helper function to format text with placeholders
export function formatHebrewText(
  template: string,
  replacements: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return replacements[key]?.toString() || match;
  });
}
