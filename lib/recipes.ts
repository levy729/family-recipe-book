import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export type Recipe = {
  title: string;
  slug: string;
  tags: string[];
  ingredients: string[];
  instructions: string;
  content: string;
};

const RECIPES_DIR = path.join(process.cwd(), 'recipes');

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
      tags: data.tags || [],
      ingredients: data.ingredients || [],
      instructions: data.instructions || '',
      content,
    });
  }
  return recipes;
} 