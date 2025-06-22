import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { RecipeFormData } from '@/types/recipe';
import {
  generateRecipeMarkdown,
  parseRecipeMarkdown,
  generateRecipeFilename,
} from '@/lib/recipe-parser';

// Path to the recipes directory (parent directory)
const RECIPES_DIR = path.join(process.cwd(), '..', 'recipes');

// GET /api/recipes - Get all available recipes
export async function GET() {
  try {
    // Ensure recipes directory exists
    await fs.mkdir(RECIPES_DIR, { recursive: true });

    // Read all files in the recipes directory
    const files = await fs.readdir(RECIPES_DIR);
    const recipes: { filename: string; title: string; slug: string }[] = [];

    for (const file of files) {
      if (file.endsWith('.md') && !file.endsWith('.backup')) {
        try {
          const filePath = path.join(RECIPES_DIR, file);
          const content = await fs.readFile(filePath, 'utf8');
          const recipeData = parseRecipeMarkdown(content);

          if (recipeData.title && recipeData.slug) {
            recipes.push({
              filename: file,
              title: recipeData.title,
              slug: recipeData.slug,
            });
          }
        } catch (error) {
          console.warn(`Error reading recipe file ${file}:`, error);
        }
      }
    }

    // Sort by title
    const sortedRecipes = recipes.sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    return NextResponse.json({ success: true, recipes: sortedRecipes });
  } catch (error) {
    console.error('Error getting recipes:', error);
    return NextResponse.json(
      { success: false, message: 'שגיאה בטעינת המתכונים' },
      { status: 500 }
    );
  }
}

// POST /api/recipes - Save a new recipe
export async function POST(request: NextRequest) {
  try {
    const data: RecipeFormData = await request.json();

    // Generate markdown content
    const markdownContent = generateRecipeMarkdown(data);
    const filename = generateRecipeFilename(data.slug);
    const filePath = path.join(RECIPES_DIR, filename);

    // Ensure recipes directory exists
    await fs.mkdir(RECIPES_DIR, { recursive: true });

    // Check if file already exists and create backup
    try {
      await fs.access(filePath);
      const backupPath = path.join(RECIPES_DIR, `${filename}.backup`);
      await fs.copyFile(filePath, backupPath);
    } catch {
      // File doesn't exist, no backup needed
    }

    // Write the file
    await fs.writeFile(filePath, markdownContent, 'utf8');

    return NextResponse.json({
      success: true,
      message: 'המתכון נשמר בהצלחה!',
      filename,
    });
  } catch (error) {
    console.error('Error saving recipe:', error);
    return NextResponse.json(
      { success: false, message: 'שגיאה בשמירת המתכון' },
      { status: 500 }
    );
  }
}
