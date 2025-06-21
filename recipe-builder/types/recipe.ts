// Recipe data structure for the recipe builder
export interface RecipeFormData {
  title: string;
  slug: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  description?: string;
}

// Recipe builder specific types
export interface RecipeBuilderState {
  mode: 'create' | 'edit';
  currentRecipe: RecipeFormData | null;
  isDirty: boolean;
  errors: Record<string, string>;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

// File operation types
export interface FileOperationResult {
  success: boolean;
  message: string;
  data?: any;
}

// Template types
export interface RecipeTemplate {
  name: string;
  description: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
}

// Hebrew tag options
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
