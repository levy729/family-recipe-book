import {
  generateBasicMetaTags,
  generateRecipeMetaTags,
  generateSearchMetaTags,
  generateRecipesMetaTags,
  generateRecipeStructuredData,
  generateWebsiteStructuredData,
  generateBreadcrumbStructuredData,
  SEOMetaTags,
} from '../seo';
import { Recipe } from '../recipes';

// Mock recipe data for testing
const mockRecipe: Recipe = {
  title: 'Test Recipe',
  slug: 'test-recipe',
  description: 'A delicious test recipe for testing purposes',
  tags: ['test', 'delicious', 'family'],
  ingredients: ['ingredient 1', 'ingredient 2', 'ingredient 3'],
  instructions:
    'Step 1: Do something\nStep 2: Do something else\nStep 3: Enjoy!',
  content: 'Full recipe content here',
};

describe('SEO Utilities', () => {
  describe('generateBasicMetaTags', () => {
    it('should generate default meta tags when no parameters provided', () => {
      const metaTags = generateBasicMetaTags();

      expect(metaTags.title).toBe('Family Recipe Book');
      expect(metaTags.description).toBe(
        'A collection of traditional family recipes with Hebrew RTL support'
      );
      expect(metaTags.keywords).toBe(
        'family recipes, Hebrew recipes, traditional cooking, RTL recipes'
      );
      expect(metaTags.ogType).toBe('website');
      expect(metaTags.twitterCard).toBe('summary_large_image');
      expect(metaTags.robots).toBe('index, follow');
    });

    it('should generate custom meta tags when parameters provided', () => {
      const metaTags = generateBasicMetaTags(
        'Custom Title',
        'Custom Description',
        'custom, keywords'
      );

      expect(metaTags.title).toBe('Custom Title');
      expect(metaTags.description).toBe('Custom Description');
      expect(metaTags.keywords).toBe('custom, keywords');
      expect(metaTags.ogTitle).toBe('Custom Title');
      expect(metaTags.ogDescription).toBe('Custom Description');
    });
  });

  describe('generateRecipeMetaTags', () => {
    it('should generate recipe-specific meta tags', () => {
      const metaTags = generateRecipeMetaTags(mockRecipe);

      expect(metaTags.title).toBe('Test Recipe - Family Recipe Book');
      expect(metaTags.description).toBe(
        'A delicious test recipe for testing purposes'
      );
      expect(metaTags.keywords).toBe('test, delicious, family');
      expect(metaTags.ogType).toBe('article');
      expect(metaTags.ogImage).toBe('/api/og/recipe/test-recipe');
      expect(metaTags.canonical).toBe(
        'https://yourdomain.com/recipe/test-recipe'
      );
    });

    it('should truncate long descriptions', () => {
      const longDescriptionRecipe = {
        ...mockRecipe,
        description: 'A'.repeat(200) + 'This should be truncated',
      };

      const metaTags = generateRecipeMetaTags(longDescriptionRecipe);

      expect(metaTags.description.length).toBeLessThanOrEqual(160);
      expect(metaTags.description).toMatch(/\.\.\.$/);
    });

    it('should handle recipe without description', () => {
      const recipeWithoutDescription = {
        ...mockRecipe,
        description: undefined,
      };
      const metaTags = generateRecipeMetaTags(recipeWithoutDescription);

      expect(metaTags.description).toContain('Learn how to make Test Recipe');
    });

    it('should handle recipe without tags', () => {
      const recipeWithoutTags = { ...mockRecipe, tags: [] };
      const metaTags = generateRecipeMetaTags(recipeWithoutTags);

      expect(metaTags.keywords).toBe(
        'family recipes, Hebrew recipes, traditional cooking, RTL recipes'
      );
    });
  });

  describe('generateSearchMetaTags', () => {
    it('should generate search meta tags with query', () => {
      const metaTags = generateSearchMetaTags('chicken');

      expect(metaTags.title).toBe(
        'Search Results for "chicken" - Family Recipe Book'
      );
      expect(metaTags.description).toContain('Find recipes matching "chicken"');
      expect(metaTags.robots).toBe('noindex, follow');
      expect(metaTags.ogType).toBe('website');
      expect(metaTags.twitterCard).toBe('summary');
    });

    it('should generate search meta tags without query', () => {
      const metaTags = generateSearchMetaTags();

      expect(metaTags.title).toBe('Search Recipes - Family Recipe Book');
      expect(metaTags.description).toContain('Search through our collection');
      expect(metaTags.robots).toBe('noindex, follow');
    });
  });

  describe('generateRecipesMetaTags', () => {
    it('should generate recipes listing meta tags', () => {
      const metaTags = generateRecipesMetaTags();

      expect(metaTags.title).toBe('All Recipes - Family Recipe Book');
      expect(metaTags.description).toContain('Browse our complete collection');
      expect(metaTags.robots).toBe('index, follow');
      expect(metaTags.ogType).toBe('website');
      expect(metaTags.twitterCard).toBe('summary_large_image');
    });
  });

  describe('generateRecipeStructuredData', () => {
    it('should generate valid recipe structured data', () => {
      const structuredData = generateRecipeStructuredData(mockRecipe);

      expect(structuredData).toMatchObject({
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        name: 'Test Recipe',
        description: 'A delicious test recipe for testing purposes',
        author: {
          '@type': 'Organization',
          name: 'Family Recipe Book',
        },
        recipeIngredient: ['ingredient 1', 'ingredient 2', 'ingredient 3'],
        keywords: 'test, delicious, family',
        inLanguage: 'he',
      });
    });

    it('should generate recipe instructions as HowToStep array', () => {
      const structuredData = generateRecipeStructuredData(mockRecipe) as any;

      expect(structuredData.recipeInstructions).toHaveLength(3);
      expect(structuredData.recipeInstructions[0]).toMatchObject({
        '@type': 'HowToStep',
        position: 1,
        text: 'Step 1: Do something',
      });
      expect(structuredData.recipeInstructions[1]).toMatchObject({
        '@type': 'HowToStep',
        position: 2,
        text: 'Step 2: Do something else',
      });
      expect(structuredData.recipeInstructions[2]).toMatchObject({
        '@type': 'HowToStep',
        position: 3,
        text: 'Step 3: Enjoy!',
      });
    });

    it('should handle recipe without tags', () => {
      const recipeWithoutTags = { ...mockRecipe, tags: [] };
      const structuredData = generateRecipeStructuredData(
        recipeWithoutTags
      ) as any;

      expect(structuredData.keywords).toBe('');
    });
  });

  describe('generateWebsiteStructuredData', () => {
    it('should generate valid website structured data', () => {
      const structuredData = generateWebsiteStructuredData();

      expect(structuredData).toMatchObject({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Family Recipe Book',
        description:
          'A collection of traditional family recipes with Hebrew RTL support',
        url: 'https://yourdomain.com',
        inLanguage: 'he',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://yourdomain.com/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      });
    });
  });

  describe('generateBreadcrumbStructuredData', () => {
    it('should generate valid breadcrumb structured data', () => {
      const breadcrumbs = [
        { name: 'Home', url: 'https://yourdomain.com' },
        { name: 'Recipes', url: 'https://yourdomain.com/recipes' },
        {
          name: 'Test Recipe',
          url: 'https://yourdomain.com/recipe/test-recipe',
        },
      ];

      const structuredData = generateBreadcrumbStructuredData(breadcrumbs);

      expect(structuredData).toMatchObject({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://yourdomain.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Recipes',
            item: 'https://yourdomain.com/recipes',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Test Recipe',
            item: 'https://yourdomain.com/recipe/test-recipe',
          },
        ],
      });
    });

    it('should handle empty breadcrumbs array', () => {
      const structuredData = generateBreadcrumbStructuredData([]) as any;

      expect(structuredData.itemListElement).toHaveLength(0);
    });
  });
});
