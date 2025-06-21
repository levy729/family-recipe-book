import { RecipeFormData } from '@/types/recipe';
import yaml from 'js-yaml';

/**
 * Escapes single quotes in a string by doubling them for YAML compliance
 */
function escapeSingleQuotes(str: string): string {
  return str.replace(/'/g, "''");
}

/**
 * Converts recipe form data to markdown format with YAML frontmatter
 */
export function generateRecipeMarkdown(data: RecipeFormData): string {
  const { title, slug, description, tags, ingredients, instructions } = data;

  // Build YAML frontmatter
  const frontmatter: Record<string, any> = {
    title: `'${escapeSingleQuotes(title)}'`,
    slug,
  };

  // Add optional fields if they exist
  if (description && description.trim()) {
    frontmatter.description = `'${escapeSingleQuotes(description.trim())}'`;
  }

  if (tags && tags.length > 0) {
    frontmatter.tags = tags.map(tag => `'${escapeSingleQuotes(tag)}'`);
  }

  if (ingredients && ingredients.length > 0) {
    frontmatter.ingredients = ingredients
      .filter(ingredient => ingredient.trim())
      .map(ingredient => `'${escapeSingleQuotes(ingredient.trim())}'`);
  }

  if (instructions && instructions.trim()) {
    frontmatter.instructions = `|\n  ${instructions
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n  ')}`;
  }

  // Convert frontmatter to YAML string
  const yamlLines: string[] = [];
  
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      yamlLines.push(`${key}:`);
      for (const item of value) {
        yamlLines.push(`  - ${item}`);
      }
    } else {
      yamlLines.push(`${key}: ${value}`);
    }
  }

  const yamlContent = yamlLines.join('\n');

  // Build the complete markdown content
  const markdown = `---\n${yamlContent}\n---\n\n`;

  return markdown;
}

/**
 * Parses markdown content to extract recipe data
 */
export function parseRecipeMarkdown(content: string): Partial<RecipeFormData> {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!frontmatterMatch) {
    throw new Error('Invalid recipe format: missing YAML frontmatter');
  }
  const yamlContent = frontmatterMatch[1];
  let parsed: any;
  try {
    parsed = yaml.load(yamlContent);
  } catch (e) {
    throw new Error('Invalid YAML in recipe frontmatter');
  }

  // Remove single quotes from string values
  const clean = (val: any): any => {
    if (typeof val === 'string') {
      return val.replace(/^'(.*)'$/, '$1');
    }
    if (Array.isArray(val)) {
      return val.map(clean);
    }
    return val;
  };

  const recipe: Partial<RecipeFormData> = {
    title: clean(parsed.title),
    slug: parsed.slug,
    description: parsed.description ? clean(parsed.description) : undefined,
    tags: parsed.tags ? clean(parsed.tags) : undefined,
    ingredients: parsed.ingredients ? clean(parsed.ingredients) : undefined,
    instructions: parsed.instructions
      ? (typeof parsed.instructions === 'string' ? parsed.instructions : undefined)
      : undefined,
  };

  return recipe;
}

/**
 * Validates recipe data before saving
 */
export function validateRecipeData(data: RecipeFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || !data.title.trim()) {
    errors.push('כותרת המתכון היא שדה חובה');
  }

  if (!data.slug || !data.slug.trim()) {
    errors.push('מזהה URL הוא שדה חובה');
  } else if (!/^[a-z0-9-]+$/.test(data.slug)) {
    errors.push('מזהה URL חייב להכיל רק אותיות באנגלית, מספרים ומקפים');
  }

  if (!data.ingredients || data.ingredients.length === 0 || data.ingredients.every(i => !i.trim())) {
    errors.push('יש להוסיף לפחות מרכיב אחד');
  }

  if (!data.instructions || !data.instructions.trim()) {
    errors.push('יש להוסיף לפחות שלב הכנה אחד');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Generates a filename for the recipe
 */
export function generateRecipeFilename(slug: string): string {
  return `${slug}.md`;
} 