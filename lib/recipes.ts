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

export async function getAllRecipes(): Promise<Recipe[]> {
  const files = await fs.readdir(RECIPES_DIR);
  const recipes: Recipe[] = [];

  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const filePath = path.join(RECIPES_DIR, file);
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(raw);
    recipes.push({
      title: data.title,
      slug: data.slug,
      description: validateDescription(data.description),
      tags: data.tags || [],
      ingredients: data.ingredients || [],
      instructions: data.instructions || '',
      content,
    });
  }
  return recipes;
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const recipes = await getAllRecipes();
  return recipes.find(recipe => recipe.slug === slug) || null;
}

export async function getRecentRecipes(limit: number = 6): Promise<Recipe[]> {
  const recipes = await getAllRecipes();
  return recipes.slice(0, limit);
}
