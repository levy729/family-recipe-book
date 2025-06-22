import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import {
  parseRecipeMarkdown,
  generateRecipeFilename,
} from '@/lib/recipe-parser';
import { RecipeFormData } from '@/types/recipe';

// Path to the recipes directory (parent directory)
const RECIPES_DIR = path.join(process.cwd(), '..', 'recipes');

// GET /api/recipes/[slug] - Get a specific recipe by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const filename = generateRecipeFilename(slug);
    const filePath = path.join(RECIPES_DIR, filename);

    // Check if file exists
    await fs.access(filePath);

    // Read file content
    const content = await fs.readFile(filePath, 'utf8');

    // Parse the markdown content
    const recipeData = parseRecipeMarkdown(content);

    // Validate that we have the required fields
    if (!recipeData.title || !recipeData.slug) {
      return NextResponse.json(
        { success: false, message: 'הקובץ אינו מכיל מתכון תקין' },
        { status: 400 }
      );
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

    return NextResponse.json({
      success: true,
      data: formData,
      message: 'המתכון נטען בהצלחה!',
    });
  } catch (error) {
    console.error('Error loading recipe:', error);
    return NextResponse.json(
      { success: false, message: 'שגיאה בטעינת המתכון' },
      { status: 500 }
    );
  }
}

// DELETE /api/recipes/[slug] - Delete a recipe
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const filename = generateRecipeFilename(slug);
    const filePath = path.join(RECIPES_DIR, filename);

    // Check if file exists
    await fs.access(filePath);

    // Delete the file
    await fs.unlink(filePath);

    return NextResponse.json({
      success: true,
      message: 'המתכון נמחק בהצלחה!',
    });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return NextResponse.json(
      { success: false, message: 'שגיאה במחיקת המתכון' },
      { status: 500 }
    );
  }
}
