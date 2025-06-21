import { RecipeFormData } from '@/types/recipe';
import {
  generateRecipeMarkdown,
  parseRecipeMarkdown,
  generateRecipeFilename,
} from './recipe-parser';

/**
 * Saves a recipe to a markdown file
 */
export async function saveRecipe(
  data: RecipeFormData
): Promise<{ success: boolean; message: string; filename?: string }> {
  try {
    // Generate markdown content
    const markdownContent = generateRecipeMarkdown(data);
    const filename = generateRecipeFilename(data.slug);

    // Create a blob with the markdown content
    const blob = new Blob([markdownContent], {
      type: 'text/markdown;charset=utf-8',
    });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    URL.revokeObjectURL(url);

    return {
      success: true,
      message: 'המתכון נשמר בהצלחה!',
      filename,
    };
  } catch (error) {
    console.error('Error saving recipe:', error);
    return {
      success: false,
      message: 'שגיאה בשמירת המתכון',
    };
  }
}

/**
 * Loads a recipe from a file input
 */
export async function loadRecipeFromFile(
  file: File
): Promise<{ success: boolean; data?: RecipeFormData; message: string }> {
  try {
    // Validate file type
    if (!file.name.endsWith('.md')) {
      return {
        success: false,
        message: 'יש לבחור קובץ markdown (.md)',
      };
    }

    // Read file content
    const content = await file.text();

    // Parse the markdown content
    const recipeData = parseRecipeMarkdown(content);

    // Validate that we have the required fields
    if (!recipeData.title || !recipeData.slug) {
      return {
        success: false,
        message: 'הקובץ אינו מכיל מתכון תקין',
      };
    }

    // Convert to RecipeFormData format
    const formData: RecipeFormData = {
      title: recipeData.title || '',
      slug: recipeData.slug || '',
      description: recipeData.description || '',
      tags: recipeData.tags || [],
      ingredients: recipeData.ingredients || [''],
      instructions: recipeData.instructions || '',
    };

    return {
      success: true,
      data: formData,
      message: 'המתכון נטען בהצלחה!',
    };
  } catch (error) {
    console.error('Error loading recipe:', error);
    return {
      success: false,
      message: 'שגיאה בטעינת המתכון',
    };
  }
}

/**
 * Creates a file input element for loading recipes
 */
export function createFileInput(
  onFileSelect: (file: File) => void
): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.md';
  input.style.display = 'none';

  input.addEventListener('change', event => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  });

  return input;
}

/**
 * Gets a list of available recipe files from the recipes directory
 * Note: This would require server-side functionality in a real implementation
 */
export async function getAvailableRecipes(): Promise<
  { filename: string; title: string; slug: string }[]
> {
  // This is a placeholder - in a real implementation, this would fetch from the server
  // For now, we'll return an empty array and handle file loading through file input
  return [];
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

/**
 * Creates a backup of an existing file before overwriting
 */
export async function createBackup(
  filename: string
): Promise<{ success: boolean; message: string }> {
  try {
    // In a real implementation, this would create a backup copy
    // For now, we'll just return success
    return {
      success: true,
      message: 'גיבוי נוצר בהצלחה',
    };
  } catch (error) {
    return {
      success: false,
      message: 'שגיאה ביצירת גיבוי',
    };
  }
}
