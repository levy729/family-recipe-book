import {
  generateRecipeMarkdown,
  parseRecipeMarkdown,
  validateRecipeData,
  generateRecipeFilename,
} from '../recipe-parser';
import { RecipeFormData } from '../../types/recipe';

describe('Recipe Parser', () => {
  describe('generateRecipeMarkdown', () => {
    it('should generate valid markdown with all required fields', () => {
      const recipeData: RecipeFormData = {
        title: 'מתכון בדיקה',
        slug: 'test-recipe',
        description: 'תיאור המתכון',
        tags: ['בשר', 'עיקרי'],
        ingredients: ['בשר טחון', 'בצל', 'תבלינים'],
        instructions: 'שלב 1: הכנת הבשר\nשלב 2: הוספת התבלינים',
      };

      const result = generateRecipeMarkdown(recipeData);

      expect(result).toContain('---');
      expect(result).toContain("title: 'מתכון בדיקה'");
      expect(result).toContain('slug: test-recipe');
      expect(result).toContain("description: 'תיאור המתכון'");
      expect(result).toContain('tags:');
      expect(result).toContain("  - 'בשר'");
      expect(result).toContain("  - 'עיקרי'");
      expect(result).toContain('ingredients:');
      expect(result).toContain("  - 'בשר טחון'");
      expect(result).toContain("  - 'בצל'");
      expect(result).toContain("  - 'תבלינים'");
      expect(result).toContain('instructions: |');
      expect(result).toContain('  שלב 1: הכנת הבשר');
      expect(result).toContain('  שלב 2: הוספת התבלינים');
    });

    it('should handle recipe without optional fields', () => {
      const recipeData: RecipeFormData = {
        title: 'מתכון פשוט',
        slug: 'simple-recipe',
        description: '',
        tags: [],
        ingredients: ['מרכיב אחד'],
        instructions: 'הוראות פשוטות',
      };

      const result = generateRecipeMarkdown(recipeData);

      expect(result).toContain("title: 'מתכון פשוט'");
      expect(result).toContain('slug: simple-recipe');
      expect(result).not.toContain('description:');
      expect(result).not.toContain('tags:');
      expect(result).toContain('ingredients:');
      expect(result).toContain("  - 'מרכיב אחד'");
    });

    it('should handle empty ingredients and tags arrays', () => {
      const recipeData: RecipeFormData = {
        title: 'מתכון ריק',
        slug: 'empty-recipe',
        description: '',
        tags: [],
        ingredients: [],
        instructions: 'הוראות',
      };

      const result = generateRecipeMarkdown(recipeData);

      expect(result).not.toContain('tags:');
      expect(result).not.toContain('ingredients:');
    });

    it('should handle multi-line instructions properly', () => {
      const recipeData: RecipeFormData = {
        title: 'מתכון עם הוראות מורכבות',
        slug: 'complex-instructions',
        description: '',
        tags: [],
        ingredients: ['מרכיב'],
        instructions: 'שלב ראשון\n\nשלב שני\n\nשלב שלישי',
      };

      const result = generateRecipeMarkdown(recipeData);

      expect(result).toContain('instructions: |');
      expect(result).toContain('  שלב ראשון');
      expect(result).toContain('  שלב שני');
      expect(result).toContain('  שלב שלישי');
    });

    it('should escape special characters in strings', () => {
      const recipeData: RecipeFormData = {
        title: 'מתכון עם \'גרש\' ו"מרכאות"',
        slug: 'special-chars',
        description: '',
        tags: [],
        ingredients: ['מרכיב עם "מרכאות"'],
        instructions: "הוראות עם 'גרש'",
      };

      const result = generateRecipeMarkdown(recipeData);

      expect(result).toContain("title: 'מתכון עם ''גרש'' ו\"מרכאות\"'");
      expect(result).toContain('  - \'מרכיב עם "מרכאות"\'');
      expect(result).toContain("  הוראות עם 'גרש'");
    });
  });

  describe('parseRecipeMarkdown', () => {
    it('should parse valid markdown with all fields', () => {
      const markdown = `---
title: 'מתכון בדיקה'
slug: test-recipe
description: 'תיאור המתכון'
tags:
  - 'בשר'
  - 'עיקרי'
ingredients:
  - 'בשר טחון'
  - 'בצל'
  - 'תבלינים'
instructions: |
  שלב 1: הכנת הבשר
  שלב 2: הוספת התבלינים
---`;

      const result = parseRecipeMarkdown(markdown);

      expect(result.title).toBe('מתכון בדיקה');
      expect(result.slug).toBe('test-recipe');
      expect(result.description).toBe('תיאור המתכון');
      expect(result.tags).toEqual(['בשר', 'עיקרי']);
      expect(result.ingredients).toEqual(['בשר טחון', 'בצל', 'תבלינים']);
      expect(result.instructions?.trim()).toBe(
        'שלב 1: הכנת הבשר\nשלב 2: הוספת התבלינים'
      );
    });

    it('should parse markdown without optional fields', () => {
      const markdown = `---
title: 'מתכון פשוט'
slug: simple-recipe
ingredients:
  - 'מרכיב אחד'
instructions: |
  הוראות פשוטות
---`;

      const result = parseRecipeMarkdown(markdown);

      expect(result.title).toBe('מתכון פשוט');
      expect(result.slug).toBe('simple-recipe');
      expect(result.description).toBeUndefined();
      expect(result.tags).toBeUndefined();
      expect(result.ingredients).toEqual(['מרכיב אחד']);
      expect(result.instructions?.trim()).toBe('הוראות פשוטות');
    });

    it('should throw error for invalid markdown format', () => {
      const invalidMarkdown = `title: 'מתכון'
slug: test
ingredients:
  - 'מרכיב'
instructions: |
  הוראות
---`;

      expect(() => parseRecipeMarkdown(invalidMarkdown)).toThrow(
        'Invalid recipe format: missing YAML frontmatter'
      );
    });

    it('should handle empty arrays in YAML', () => {
      const markdown = `---
title: 'מתכון ריק'
slug: empty-recipe
tags: []
ingredients: []
instructions: |
  הוראות
---`;

      const result = parseRecipeMarkdown(markdown);

      expect(result.title).toBe('מתכון ריק');
      expect(result.slug).toBe('empty-recipe');
      expect(result.tags).toEqual([]);
      expect(result.ingredients).toEqual([]);
    });
  });

  describe('validateRecipeData', () => {
    it('should validate correct recipe data', () => {
      const validData: RecipeFormData = {
        title: 'מתכון תקין',
        slug: 'valid-recipe',
        description: '',
        tags: [],
        ingredients: ['מרכיב'],
        instructions: 'הוראות',
      };

      const result = validateRecipeData(validData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return errors for missing required fields', () => {
      const invalidData: RecipeFormData = {
        title: '',
        slug: '',
        description: '',
        tags: [],
        ingredients: [],
        instructions: '',
      };

      const result = validateRecipeData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('כותרת המתכון היא שדה חובה');
      expect(result.errors).toContain('מזהה URL הוא שדה חובה');
      expect(result.errors).toContain('יש להוסיף לפחות מרכיב אחד');
      expect(result.errors).toContain('יש להוסיף לפחות שלב הכנה אחד');
    });

    it('should validate slug format', () => {
      const invalidData: RecipeFormData = {
        title: 'מתכון',
        slug: 'invalid slug with spaces',
        description: '',
        tags: [],
        ingredients: ['מרכיב'],
        instructions: 'הוראות',
      };

      const result = validateRecipeData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'מזהה URL חייב להכיל רק אותיות באנגלית, מספרים ומקפים'
      );
    });

    it('should accept valid slug formats', () => {
      const validSlugs = ['valid-slug', 'valid123', 'valid-slug-123'];

      validSlugs.forEach(slug => {
        const data: RecipeFormData = {
          title: 'מתכון',
          slug,
          description: '',
          tags: [],
          ingredients: ['מרכיב'],
          instructions: 'הוראות',
        };

        const result = validateRecipeData(data);
        expect(result.isValid).toBe(true);
      });
    });

    it('should handle ingredients with only whitespace', () => {
      const invalidData: RecipeFormData = {
        title: 'מתכון',
        slug: 'test',
        description: '',
        tags: [],
        ingredients: ['', '   ', '\t'],
        instructions: 'הוראות',
      };

      const result = validateRecipeData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('יש להוסיף לפחות מרכיב אחד');
    });
  });

  describe('generateRecipeFilename', () => {
    it('should generate correct filename with .md extension', () => {
      const result = generateRecipeFilename('test-recipe');
      expect(result).toBe('test-recipe.md');
    });

    it('should handle different slug formats', () => {
      expect(generateRecipeFilename('simple')).toBe('simple.md');
      expect(generateRecipeFilename('complex-recipe-123')).toBe(
        'complex-recipe-123.md'
      );
      expect(generateRecipeFilename('recipe_with_underscores')).toBe(
        'recipe_with_underscores.md'
      );
    });
  });

  describe('Integration tests', () => {
    it('should generate and parse markdown correctly', () => {
      const originalData: RecipeFormData = {
        title: 'מתכון אינטגרציה',
        slug: 'integration-test',
        description: 'תיאור מפורט',
        tags: ['בשר', 'עיקרי', 'מסורתי'],
        ingredients: ['בשר טחון', 'בצל', 'שום', 'תבלינים'],
        instructions: 'שלב 1: הכנת הבשר\nשלב 2: הוספת התבלינים\nשלב 3: בישול',
      };

      const markdown = generateRecipeMarkdown(originalData);
      const parsedData = parseRecipeMarkdown(markdown);

      expect(parsedData.title).toBe(originalData.title);
      expect(parsedData.slug).toBe(originalData.slug);
      expect(parsedData.description).toBe(originalData.description);
      expect(parsedData.tags).toEqual(originalData.tags);
      expect(parsedData.ingredients).toEqual(originalData.ingredients);
      expect(parsedData.instructions?.trim()).toBe(originalData.instructions);
    });

    it('should validate generated data', () => {
      const recipeData: RecipeFormData = {
        title: 'מתכון בדיקה',
        slug: 'test-recipe',
        description: '',
        tags: [],
        ingredients: ['מרכיב'],
        instructions: 'הוראות',
      };

      const markdown = generateRecipeMarkdown(recipeData);
      const parsedData = parseRecipeMarkdown(markdown);
      const validation = validateRecipeData(parsedData as RecipeFormData);

      expect(validation.isValid).toBe(true);
    });
  });
});
