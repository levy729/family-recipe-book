// Hebrew text constants for the Recipe Builder
// This file centralizes all hardcoded Hebrew text to ensure consistency and easy maintenance

export const HEBREW_TEXTS = {
  // Page titles and headers
  RECIPE_BUILDER_TITLE: 'Recipe Builder',
  RECIPE_BUILDER_SUBTITLE: 'כלי ליצירה ועריכה של מתכונים',

  // Form labels and placeholders
  TITLE_LABEL: 'כותרת המתכון',
  TITLE_PLACEHOLDER: 'הכנס את כותרת המתכון',
  SLUG_LABEL: 'מזהה URL',
  SLUG_PLACEHOLDER: 'מזהה ייחודי לאתר (באנגלית)',
  DESCRIPTION_LABEL: 'תיאור המתכון',
  DESCRIPTION_PLACEHOLDER: 'תיאור קצר של המתכון (אופציונלי)',
  TAGS_LABEL: 'תגיות',
  TAG_INPUT_PLACEHOLDER: 'הכנס תגית חדשה',
  TAG_ADD_BUTTON: 'הוסף',
  TAG_SUGGESTIONS_LABEL: 'הצעות לתגיות:',
  INGREDIENTS_LABEL: 'מרכיבים',
  INGREDIENT_PLACEHOLDER: 'הכנס מרכיב',
  INSTRUCTIONS_LABEL: 'הוראות הכנה',
  INSTRUCTION_PLACEHOLDER: 'הכנס שלב הכנה',

  // Buttons
  SAVE_RECIPE: 'שמור מתכון',
  CREATE_RECIPE: 'צור מתכון חדש',
  EDIT_RECIPE: 'ערוך מתכון',
  LOAD_RECIPE: 'טען מתכון קיים',
  PREVIEW_RECIPE: 'תצוגה מקדימה',
  ADD_INGREDIENT: 'הוסף מרכיב',
  ADD_INSTRUCTION: 'הוסף שלב',
  REMOVE: 'הסר',
  CANCEL: 'ביטול',

  // Messages
  RECIPE_SAVED: 'המתכון נשמר בהצלחה!',
  RECIPE_LOADED: 'המתכון נטען בהצלחה!',
  VALIDATION_ERROR: 'יש שגיאות בטופס',
  REQUIRED_FIELD: 'שדה זה הוא חובה',
  INVALID_SLUG: 'המזהה חייב להכיל רק אותיות באנגלית, מספרים ומקפים',
  FILE_NOT_FOUND: 'הקובץ לא נמצא',
  SAVE_ERROR: 'שגיאה בשמירת המתכון',
  LOAD_ERROR: 'שגיאה בטעינת המתכון',

  // File operations
  SELECT_FILE: 'בחר קובץ מתכון',
  NO_FILES_FOUND: 'לא נמצאו קבצי מתכונים',
  OVERWRITE_CONFIRMATION: 'האם אתה בטוח שברצונך לדרוס את הקובץ הקיים?',

  // Preview
  PREVIEW_TITLE: 'תצוגה מקדימה',
  NO_PREVIEW: 'אין תוכן לתצוגה מקדימה',

  // Templates
  TEMPLATES: 'תבניות',
  NEW_TEMPLATE: 'תבנית חדשה',
  SAVE_TEMPLATE: 'שמור כתבנית',
  LOAD_TEMPLATE: 'טען תבנית',

  // Validation
  TITLE_REQUIRED: 'כותרת המתכון היא שדה חובה',
  SLUG_REQUIRED: 'מזהה URL הוא שדה חובה',
  SLUG_INVALID: 'מזהה URL חייב להכיל רק אותיות באנגלית, מספרים ומקפים',
  AT_LEAST_ONE_INGREDIENT: 'יש להוסיף לפחות מרכיב אחד',
  AT_LEAST_ONE_INSTRUCTION: 'יש להוסיף לפחות שלב הכנה אחד',
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
