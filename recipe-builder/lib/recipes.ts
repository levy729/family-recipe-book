import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export type Recipe = {
  title: string;
  slug: string;
  description?: string;
  tags: string[];
  ingredients: string[];
  instructions: string;
  content: string;
};

const RECIPES_DIR = path.join(process.cwd(), 'recipes');

function validateDescription(description?: string): string | undefined {
  if (!description) return undefined;
  if (description.length > 200) {
    console.warn(
      `Description too long (${description.length} chars), truncating to 200 chars`
    );
    return description.substring(0, 200);
  }
  return description;
}

export async function getAllRecipes(
  dir: string = RECIPES_DIR
): Promise<Recipe[]> {
  const files = await fs.readdir(dir);
  const recipes: Recipe[] = [];

  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const filePath = path.join(dir, file);
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(raw);
    recipes.push({
      title: data.title,
      slug: data.slug,
      description: validateDescription(data.description),
      tags: data.tags || [],
      ingredients: (data.ingredients || []).filter(
        (i: string) => i && i.trim().length > 0
      ),
      instructions: data.instructions || '',
      content,
    });
  }
  return recipes;
}

export async function getRecipeBySlug(
  slug: string,
  dir: string = RECIPES_DIR
): Promise<Recipe | null> {
  const recipes = await getAllRecipes(dir);
  const recipe = recipes.find(recipe => recipe.slug === slug) || null;
  if (recipe) {
    recipe.ingredients = recipe.ingredients.filter(
      i => i && i.trim().length > 0
    );
  }
  return recipe;
}

export async function getRecentRecipes(
  limit: number = 6,
  dir: string = RECIPES_DIR
): Promise<Recipe[]> {
  const recipes = await getAllRecipes(dir);
  return recipes.slice(0, limit);
}
