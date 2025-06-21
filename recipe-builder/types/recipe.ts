import { HEBREW_TAGS, HebrewTag } from '../lib/constants';

// Recipe data structure for the recipe builder
export interface Recipe {
  title: string;
  slug: string;
  description?: string;
  tags?: HebrewTag[];
  ingredients?: string[];
  instructions?: string;
  content?: string;
}

export interface RecipeFormData {
  title: string;
  slug: string;
  description: string;
  tags: HebrewTag[];
  ingredients: string[];
  instructions: string;
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
  data: Partial<RecipeFormData>;
}

// Export the Hebrew tags and type from constants
export { HEBREW_TAGS };
export type { HebrewTag };
