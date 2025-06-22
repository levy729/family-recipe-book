import { RecipeFormData } from '@/types/recipe';

/**
 * Saves a recipe via API
 */
export async function saveRecipe(
  data: RecipeFormData
): Promise<{ success: boolean; message: string; filename?: string }> {
  try {
    const response = await fetch('/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return {
        success: true,
        message: result.message,
        filename: result.filename,
      };
    } else {
      return {
        success: false,
        message: result.message || 'שגיאה בשמירת המתכון',
      };
    }
  } catch (error) {
    console.error('Error saving recipe:', error);
    return {
      success: false,
      message: 'שגיאה בשמירת המתכון',
    };
  }
}

/**
 * Loads a recipe from the API by slug
 */
export async function loadRecipeBySlug(
  slug: string
): Promise<{ success: boolean; data?: RecipeFormData; message: string }> {
  try {
    const response = await fetch(`/api/recipes/${slug}`);
    const result = await response.json();

    if (response.ok && result.success) {
      return {
        success: true,
        data: result.data,
        message: result.message,
      };
    } else {
      return {
        success: false,
        message: result.message || 'שגיאה בטעינת המתכון',
      };
    }
  } catch (error) {
    console.error('Error loading recipe:', error);
    return {
      success: false,
      message: 'שגיאה בטעינת המתכון',
    };
  }
}

/**
 * Gets a list of available recipe files from the API
 */
export async function getAvailableRecipes(): Promise<
  { filename: string; title: string; slug: string }[]
> {
  try {
    const response = await fetch('/api/recipes');
    const result = await response.json();

    if (response.ok && result.success) {
      return result.recipes || [];
    } else {
      console.error('Error getting recipes:', result.message);
      return [];
    }
  } catch (error) {
    console.error('Error getting available recipes:', error);
    return [];
  }
}

/**
 * Deletes a recipe via API
 */
export async function deleteRecipe(
  slug: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`/api/recipes/${slug}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return {
        success: true,
        message: result.message,
      };
    } else {
      return {
        success: false,
        message: result.message || 'שגיאה במחיקת המתכון',
      };
    }
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return {
      success: false,
      message: 'שגיאה במחיקת המתכון',
    };
  }
}

/**
 * Validates if a filename is safe for saving
 */
export function validateFilename(filename: string): boolean {
  // Check for invalid characters
  const invalidChars = /[<>:"/\\|?*]/;
  if (invalidChars.test(filename)) {
    return false;
  }

  // Check for reserved names
  const reservedNames = [
    'CON',
    'PRN',
    'AUX',
    'NUL',
    'COM1',
    'COM2',
    'COM3',
    'COM4',
    'COM5',
    'COM6',
    'COM7',
    'COM8',
    'COM9',
    'LPT1',
    'LPT2',
    'LPT3',
    'LPT4',
    'LPT5',
    'LPT6',
    'LPT7',
    'LPT8',
    'LPT9',
  ];
  if (reservedNames.includes(filename.toUpperCase())) {
    return false;
  }

  return true;
}
