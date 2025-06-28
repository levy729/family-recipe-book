import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import fs from 'fs/promises';
import {
  getAllRecipes,
  getRecipeBySlug,
  getRecentRecipes,
  Recipe,
} from '../recipes';

// Mock fs functions using jest.spyOn
const mockReaddir = jest.spyOn(fs, 'readdir') as any;
const mockReadFile = jest.spyOn(fs, 'readFile') as any;

const mockedFs = jest.requireActual('fs/promises');

describe('Recipe Utilities', () => {
  const mockRecipeContent = `---
title: "אורז לבן פשוט"
slug: "simple-white-rice"
description: "אורז לבן פשוט וטעים, רך ומתאים לכל ארוחה"
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
    title: 'אורז לבן פשוט',
    slug: 'simple-white-rice',
    description: 'אורז לבן פשוט וטעים, רך ומתאים לכל ארוחה',
    tags: ['אורז', 'תוספת', 'קל'],
    ingredients: [
      '1 כוס אורז לבן',
      '1.5 כוסות מים',
      '1 כף שמן',
      '1/2 כפית מלח',
    ],
    instructions: `1. שוטפים את האורז היטב במסננת.\n2. מחממים שמן בסיר קטן, מוסיפים את האורז ומטגנים כדקה.\n3. מוסיפים מים ומלח, מביאים לרתיחה.\n4. מכסים, מנמיכים לאש נמוכה ומבשלים 18 דקות.\n5. מכבים את האש ומשאירים מכוסה 5 דקות.\n6. מפרידים בעדינות עם מזלג ומגישים.\n`,
    content: '\nאורז לבן פשוט, רך וטעים שמתאים לכל ארוחה.',
  };

  beforeEach(() => {
    mockReaddir.mockReset();
    mockReadFile.mockReset();
  });

  describe('getAllRecipes', () => {
    it('should parse YAML frontmatter correctly', async () => {
      mockReaddir.mockResolvedValue(['recipe.md']);
      mockReadFile.mockResolvedValue(mockRecipeContent);

      const recipes = await getAllRecipes('mock-recipes');

      expect(recipes).toHaveLength(1);
      expect(recipes[0]).toEqual(mockRecipeData);
    });

    it('should extract markdown content correctly', async () => {
      mockReaddir.mockResolvedValue(['recipe.md']);
      mockReadFile.mockResolvedValue(mockRecipeContent);

      const recipes = await getAllRecipes('mock-recipes');

      expect(recipes[0].content).toBe(
        '\nאורז לבן פשוט, רך וטעים שמתאים לכל ארוחה.'
      );
    });

    it('should handle missing optional fields', async () => {
      const minimalContent = `---
title: "מתכון מינימלי"
slug: "minimal-recipe"
tags: ["ארוחה קלה"]
ingredients: ["מרכיב 1", "מרכיב 2"]
instructions: "הוראות בישול"
---

תוכן המתכון`;

      mockReaddir.mockResolvedValue(['minimal.md']);
      mockReadFile.mockResolvedValue(minimalContent);

      const recipes = await getAllRecipes('mock-recipes');

      expect(recipes).toHaveLength(1);
      expect(recipes[0].description).toBeUndefined();
      expect(recipes[0].title).toBe('מתכון מינימלי');
    });

    it('should handle description field correctly', async () => {
      const contentWithDescription = `---
title: "מתכון עם תיאור"
slug: "recipe-with-description"
description: "תיאור קצר של המתכון"
tags: ["ארוחה קלה"]
ingredients: ["מרכיב 1", "מרכיב 2"]
instructions: "הוראות בישול"
---

תוכן המתכון`;

      mockReaddir.mockResolvedValue(['with-description.md']);
      mockReadFile.mockResolvedValue(contentWithDescription);

      const recipes = await getAllRecipes('mock-recipes');

      expect(recipes).toHaveLength(1);
      expect(recipes[0].description).toBe('תיאור קצר של המתכון');
    });

    it('should truncate description if longer than 200 characters', async () => {
      const longDescription = 'א'.repeat(250);
      const contentWithLongDescription = `---
title: "מתכון עם תיאור ארוך"
slug: "recipe-with-long-description"
description: "${longDescription}"
tags: ["ארוחה קלה"]
ingredients: ["מרכיב 1", "מרכיב 2"]
instructions: "הוראות בישול"
---

תוכן המתכון`;

      mockReaddir.mockResolvedValue(['long-description.md']);
      mockReadFile.mockResolvedValue(contentWithLongDescription);

      const recipes = await getAllRecipes('mock-recipes');

      expect(recipes).toHaveLength(1);
      expect(recipes[0].description).toBe('א'.repeat(200));
    });

    it('should skip non-markdown files', async () => {
      mockReaddir.mockResolvedValue([
        'recipe.md',
        'image.jpg',
        'text.txt',
        'another-recipe.md',
      ]);
      mockReadFile.mockResolvedValue(mockRecipeContent);

      const recipes = await getAllRecipes('mock-recipes');

      expect(recipes).toHaveLength(2);
      expect(recipes.every(r => r.slug.endsWith('.md'))).toBe(false);
    });

    it('should handle empty recipes directory', async () => {
      mockReaddir.mockResolvedValue([]);

      const recipes = await getAllRecipes('mock-recipes');

      expect(recipes).toHaveLength(0);
    });

    it('should handle file system errors gracefully', async () => {
      mockReaddir.mockRejectedValue(new Error('File system error'));

      await expect(getAllRecipes('mock-recipes')).rejects.toThrow(
        'File system error'
      );
    });

    it('should return an empty array if all ingredients are empty/whitespace', async () => {
      const contentWithOnlyEmptyIngredients = `---
title: "מתכון ריק"
slug: "empty-ingredients-recipe"
tags: ["בדיקה"]
ingredients:
  - "   "
  - ""
  - "\t"
instructions: "הוראות"
---

תוכן המתכון`;
      mockReaddir.mockResolvedValue(['only-empty-ingredients.md']);
      mockReadFile.mockResolvedValue(contentWithOnlyEmptyIngredients);

      const recipes = await getAllRecipes('mock-recipes');
      expect(recipes).toHaveLength(1);
      expect(recipes[0].ingredients).toEqual([]);
    });

    it('should not modify valid ingredients', async () => {
      const contentWithValidIngredients = `---
title: "מתכון תקין"
slug: "valid-ingredients-recipe"
tags: ["בדיקה"]
ingredients:
  - "מרכיב 1"
  - "מרכיב 2"
  - "מרכיב 3"
instructions: "הוראות"
---

תוכן המתכון`;
      mockReaddir.mockResolvedValue(['valid-ingredients.md']);
      mockReadFile.mockResolvedValue(contentWithValidIngredients);

      const recipes = await getAllRecipes('mock-recipes');
      expect(recipes).toHaveLength(1);
      expect(recipes[0].ingredients).toEqual(['מרכיב 1', 'מרכיב 2', 'מרכיב 3']);
    });
  });

  describe('getRecipeBySlug', () => {
    it('should find recipe by slug', async () => {
      mockReaddir.mockResolvedValue(['simple-white-rice.md']);
      mockReadFile.mockResolvedValue(mockRecipeContent);

      const recipe = await getRecipeBySlug('simple-white-rice', 'mock-recipes');

      expect(recipe).toEqual(mockRecipeData);
    });

    it('should return null for non-existent slug', async () => {
      mockReaddir.mockResolvedValue(['other-recipe.md']);
      mockReadFile.mockResolvedValue(mockRecipeContent);

      const recipe = await getRecipeBySlug('non-existent', 'mock-recipes');

      expect(recipe).toBeNull();
    });

    it('should handle multiple recipes correctly', async () => {
      const secondRecipeContent = `---
title: "מתכון שני"
slug: "second-recipe"
tags: ["ארוחה קלה"]
ingredients: ["מרכיב 3", "מרכיב 4"]
instructions: "הוראות בישול שני"
---

תוכן המתכון השני`;

      mockReaddir.mockResolvedValue([
        'simple-white-rice.md',
        'second-recipe.md',
      ]);
      mockReadFile.mockImplementation((filePath: string) => {
        if (filePath.includes('simple-white-rice.md'))
          return Promise.resolve(mockRecipeContent);
        if (filePath.includes('second-recipe.md'))
          return Promise.resolve(secondRecipeContent);
        return Promise.reject(new Error('File not found'));
      });

      const recipe1 = await getRecipeBySlug(
        'simple-white-rice',
        'mock-recipes'
      );
      const recipe2 = await getRecipeBySlug('second-recipe', 'mock-recipes');

      expect(recipe1).toEqual(mockRecipeData);
      expect(recipe2?.title).toBe('מתכון שני');
    });
  });

  describe('getRecentRecipes', () => {
    it('should return default limit of 6 recipes', async () => {
      const multipleRecipes = Array.from(
        { length: 8 },
        (_, i) => `recipe-${i}.md`
      );

      mockReaddir.mockResolvedValue(multipleRecipes);
      mockReadFile.mockResolvedValue(mockRecipeContent);

      const recipes = await getRecentRecipes(6, 'mock-recipes');

      expect(recipes).toHaveLength(6);
    });

    it('should return custom limit of recipes', async () => {
      const multipleRecipes = Array.from(
        { length: 10 },
        (_, i) => `recipe-${i}.md`
      );

      mockReaddir.mockResolvedValue(multipleRecipes);
      mockReadFile.mockResolvedValue(mockRecipeContent);

      const recipes = await getRecentRecipes(3, 'mock-recipes');

      expect(recipes).toHaveLength(3);
    });

    it('should return all recipes if limit exceeds available recipes', async () => {
      const multipleRecipes = Array.from(
        { length: 3 },
        (_, i) => `recipe-${i}.md`
      );

      mockReaddir.mockResolvedValue(multipleRecipes);
      mockReadFile.mockResolvedValue(mockRecipeContent);

      const recipes = await getRecentRecipes(10, 'mock-recipes');

      expect(recipes).toHaveLength(3);
    });
  });

  describe('Ingredient Parsing and Validation', () => {
    it('should filter out empty and whitespace-only ingredients', async () => {
      const contentWithEmptyIngredients = `---
title: "מתכון עם מרכיבים ריקים"
slug: "recipe-with-empty-ingredients"
tags: ["בדיקה"]
ingredients:
  - "מרכיב 1"
  - "   "
  - ""
  - "מרכיב 2"
  - "\t"
instructions: "הוראות"
---

תוכן המתכון`;
      mockReaddir.mockResolvedValue(['empty-ingredients.md']);
      mockReadFile.mockResolvedValue(contentWithEmptyIngredients);

      const recipes = await getAllRecipes('mock-recipes');
      expect(recipes).toHaveLength(1);
      expect(recipes[0].ingredients).toEqual(['מרכיב 1', 'מרכיב 2']);
    });

    it('should filter out empty and whitespace-only ingredients in getRecipeBySlug', async () => {
      const contentWithEmptyIngredients = `---
title: "מתכון עם מרכיבים ריקים"
slug: "recipe-with-empty-ingredients"
tags: ["בדיקה"]
ingredients:
  - "מרכיב 1"
  - "   "
  - ""
  - "מרכיב 2"
  - "\t"
instructions: "הוראות"
---

תוכן המתכון`;
      mockReaddir.mockResolvedValue(['empty-ingredients.md']);
      mockReadFile.mockResolvedValue(contentWithEmptyIngredients);

      const recipe = await getRecipeBySlug(
        'recipe-with-empty-ingredients',
        'mock-recipes'
      );
      expect(recipe).not.toBeNull();
      expect(recipe?.ingredients).toEqual(['מרכיב 1', 'מרכיב 2']);
    });
  });
});
