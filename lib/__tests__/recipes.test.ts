import fs from 'fs/promises';
import path from 'path';
import { getAllRecipes, getRecipeBySlug, getRecentRecipes, Recipe } from '../recipes';

// Mock fs module
jest.mock('fs/promises');
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('Recipe Utilities', () => {
  const mockRecipeContent = `---
title: "אורז לבן פשוט"
slug: "simple-white-rice"
tags: ["אורז", "תוספת", "קל"]
ingredients:
  - "1 כוס אורז לבן"
  - "1.5 כוסות מים"
  - "1 כף שמן"
  - "1/2 כפית מלח"
instructions: |
  1. שוטפים את האורז היטב במסננת.
  2. מחממים שמן בסיר קטן, מוסיפים את האורז ומטגנים כדקה.
  3. מוסיפים מים ומלח, מביאים לרתיחה.
  4. מכסים, מנמיכים לאש נמוכה ומבשלים 18 דקות.
  5. מכבים את האש ומשאירים מכוסה 5 דקות.
  6. מפרידים בעדינות עם מזלג ומגישים.
---

אורז לבן פשוט, רך וטעים שמתאים לכל ארוחה.`;

  const mockRecipeData: Recipe = {
    title: "אורז לבן פשוט",
    slug: "simple-white-rice",
    tags: ["אורז", "תוספת", "קל"],
    ingredients: [
      "1 כוס אורז לבן",
      "1.5 כוסות מים", 
      "1 כף שמן",
      "1/2 כפית מלח"
    ],
    instructions: `1. שוטפים את האורז היטב במסננת.\n2. מחממים שמן בסיר קטן, מוסיפים את האורז ומטגנים כדקה.\n3. מוסיפים מים ומלח, מביאים לרתיחה.\n4. מכסים, מנמיכים לאש נמוכה ומבשלים 18 דקות.\n5. מכבים את האש ומשאירים מכוסה 5 דקות.\n6. מפרידים בעדינות עם מזלג ומגישים.\n`,
    content: "\nאורז לבן פשוט, רך וטעים שמתאים לכל ארוחה."
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllRecipes', () => {
    it('should parse YAML frontmatter correctly', async () => {
      mockedFs.readdir.mockResolvedValue(['recipe.md'] as any);
      mockedFs.readFile.mockResolvedValue(mockRecipeContent);

      const recipes = await getAllRecipes();

      expect(recipes).toHaveLength(1);
      expect(recipes[0]).toEqual(mockRecipeData);
    });

    it('should extract markdown content correctly', async () => {
      mockedFs.readdir.mockResolvedValue(['recipe.md'] as any);
      mockedFs.readFile.mockResolvedValue(mockRecipeContent);

      const recipes = await getAllRecipes();

      expect(recipes[0].content).toBe('\nאורז לבן פשוט, רך וטעים שמתאים לכל ארוחה.');
    });

    it('should handle missing optional fields', async () => {
      const minimalContent = `---
title: "Test Recipe"
slug: "test-recipe"
---

Recipe content here.`;

      mockedFs.readdir.mockResolvedValue(['recipe.md'] as any);
      mockedFs.readFile.mockResolvedValue(minimalContent);

      const recipes = await getAllRecipes();

      expect(recipes[0]).toEqual({
        title: "Test Recipe",
        slug: "test-recipe",
        tags: [],
        ingredients: [],
        instructions: '',
        content: '\nRecipe content here.'
      });
    });

    it('should skip non-markdown files', async () => {
      mockedFs.readdir.mockResolvedValue(['recipe.md', 'image.jpg', 'text.txt'] as any);

      const recipes = await getAllRecipes();

      expect(mockedFs.readFile).toHaveBeenCalledTimes(1);
      expect(mockedFs.readFile).toHaveBeenCalledWith(expect.stringContaining('recipe.md'), 'utf8');
    });

    it('should handle empty recipes directory', async () => {
      mockedFs.readdir.mockResolvedValue([]);

      const recipes = await getAllRecipes();

      expect(recipes).toEqual([]);
    });

    it('should handle file system errors gracefully', async () => {
      mockedFs.readdir.mockRejectedValue(new Error('File system error'));

      await expect(getAllRecipes()).rejects.toThrow('File system error');
    });
  });

  describe('getRecipeBySlug', () => {
    it('should find recipe by slug', async () => {
      mockedFs.readdir.mockResolvedValue(['recipe.md'] as any);
      mockedFs.readFile.mockResolvedValue(mockRecipeContent);

      const recipe = await getRecipeBySlug('simple-white-rice');

      expect(recipe).toEqual(mockRecipeData);
    });

    it('should return null for non-existent slug', async () => {
      mockedFs.readdir.mockResolvedValue(['recipe.md'] as any);
      mockedFs.readFile.mockResolvedValue(mockRecipeContent);

      const recipe = await getRecipeBySlug('non-existent-recipe');

      expect(recipe).toBeNull();
    });

    it('should handle multiple recipes correctly', async () => {
      const secondRecipeContent = `---
title: "Second Recipe"
slug: "second-recipe"
tags: ["test"]
ingredients: []
instructions: ""
---

Second recipe content.`;

      mockedFs.readdir.mockResolvedValue(['recipe1.md', 'recipe2.md'] as any);
      mockedFs.readFile
        .mockResolvedValueOnce(mockRecipeContent)
        .mockResolvedValueOnce(secondRecipeContent);

      const recipe = await getRecipeBySlug('second-recipe');

      expect(recipe?.title).toBe('Second Recipe');
      expect(recipe?.slug).toBe('second-recipe');
    });
  });

  describe('getRecentRecipes', () => {
    it('should return default limit of 6 recipes', async () => {
      mockedFs.readdir.mockResolvedValue(
        Array.from({ length: 10 }, (_, i) => `recipe${i}.md`) as any
      );
      mockedFs.readFile.mockResolvedValue(mockRecipeContent);

      const recentRecipes = await getRecentRecipes();

      expect(recentRecipes).toHaveLength(6);
      expect(recentRecipes[0].slug).toBe('simple-white-rice');
      expect(recentRecipes[5].slug).toBe('simple-white-rice');
    });

    it('should return custom limit of recipes', async () => {
      mockedFs.readdir.mockResolvedValue(
        Array.from({ length: 10 }, (_, i) => `recipe${i}.md`) as any
      );
      mockedFs.readFile.mockResolvedValue(mockRecipeContent);

      const recentRecipes = await getRecentRecipes(3);

      expect(recentRecipes).toHaveLength(3);
      expect(recentRecipes[0].slug).toBe('simple-white-rice');
      expect(recentRecipes[2].slug).toBe('simple-white-rice');
    });

    it('should return all recipes if limit exceeds available recipes', async () => {
      mockedFs.readdir.mockResolvedValue(['recipe1.md', 'recipe2.md'] as any);
      mockedFs.readFile.mockResolvedValue(mockRecipeContent);

      const recentRecipes = await getRecentRecipes(10);

      expect(recentRecipes).toHaveLength(2);
    });
  });
}); 