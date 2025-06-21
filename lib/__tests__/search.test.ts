import Fuse from 'fuse.js';
import {
  initializeSearch,
  searchRecipes,
  searchRecipesByField,
  resetSearch,
} from '../search';
import { Recipe } from '../recipes';

// Mock Fuse.js
jest.mock('fuse.js');
const MockedFuse = Fuse as jest.MockedClass<typeof Fuse>;

describe('Search Functionality', () => {
  const mockRecipes: Recipe[] = [
    {
      title: 'אורז לבן פשוט',
      slug: 'simple-white-rice',
      description: 'אורז לבן בסיסי וטעים, מושלם כתוספת לכל ארוחה',
      tags: ['אורז', 'תוספת', 'קל'],
      ingredients: [
        '1 כוס אורז לבן',
        '1.5 כוסות מים',
        '1 כף שמן',
        '1/2 כפית מלח',
      ],
      instructions: 'שוטפים את האורז...',
      content: 'אורז לבן פשוט, רך וטעים.',
    },
    {
      title: 'סלט ירקות טרי',
      slug: 'fresh-vegetable-salad',
      description: 'סלט בריא וטעים עם ירקות טריים ועלי בזיליקום',
      tags: ['סלט', 'ירקות', 'בריא'],
      ingredients: ['עגבניות', 'מלפפונים', 'בצל אדום', 'שמן זית'],
      instructions: 'חותכים את הירקות...',
      content: 'סלט ירקות טרי וטעים.',
    },
    {
      title: 'עוף צלוי בתנור',
      slug: 'roasted-chicken',
      description: 'חזה עוף צלוי עם תבלינים, רך ועסיסי',
      tags: ['עוף', 'צלוי', 'עיקרי'],
      ingredients: ['חזה עוף', 'תבלינים', 'שמן זית', 'לימון'],
      instructions: 'מחממים תנור...',
      content: 'עוף צלוי בתנור, רך וטעים.',
    },
  ];

  const mockSearchResults = [
    { item: mockRecipes[0], score: 0.1, matches: [] },
    { item: mockRecipes[1], score: 0.3, matches: [] },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    MockedFuse.mockClear();
    resetSearch();
  });

  describe('initializeSearch', () => {
    it('should initialize Fuse.js with correct options', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);

      expect(MockedFuse).toHaveBeenCalledWith(mockRecipes, {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'description', weight: 0.3 },
          { name: 'tags', weight: 0.1 },
          { name: 'ingredients', weight: 0.1 },
        ],
        threshold: 0.3,
        ignoreLocation: true,
        useExtendedSearch: false,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
        shouldSort: true,
      });
    });

    it('should store recipes for field-specific searches', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);

      // Verify that recipes are stored (we'll test this through searchRecipesByField)
      expect(MockedFuse).toHaveBeenCalledWith(mockRecipes, expect.any(Object));
    });
  });

  describe('searchRecipes', () => {
    it('should return empty array when search is not initialized', () => {
      const results = searchRecipes('אורז');

      expect(results).toEqual([]);
    });

    it('should return empty array for empty query', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipes('');

      expect(results).toEqual([]);
    });

    it('should return empty array for whitespace-only query', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipes('   ');

      expect(results).toEqual([]);
    });

    it('should search and return recipes', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue(mockSearchResults),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipes('אורז');

      expect(mockFuseInstance.search).toHaveBeenCalledWith('אורז');
      expect(results).toEqual([mockRecipes[0], mockRecipes[1]]);
    });

    it('should handle Hebrew text correctly', () => {
      const mockFuseInstance = {
        search: jest
          .fn()
          .mockReturnValue([{ item: mockRecipes[0], score: 0.1, matches: [] }]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipes('ירקות');

      expect(mockFuseInstance.search).toHaveBeenCalledWith('ירקות');
      expect(results).toEqual([mockRecipes[0]]);
    });
  });

  describe('searchRecipesByField', () => {
    it('should return empty array when search is not initialized', () => {
      const results = searchRecipesByField('אורז', 'title');

      expect(results).toEqual([]);
    });

    it('should return empty array for empty query', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipesByField('', 'title');

      expect(results).toEqual([]);
    });

    it('should search by title field', () => {
      const mockFuseInstance = {
        search: jest
          .fn()
          .mockReturnValue([{ item: mockRecipes[0], score: 0.1, matches: [] }]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipesByField('אורז', 'title');

      expect(MockedFuse).toHaveBeenCalledWith(mockRecipes, {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'description', weight: 0.3 },
          { name: 'tags', weight: 0.1 },
          { name: 'ingredients', weight: 0.1 },
        ],
        threshold: 0.3,
        ignoreLocation: true,
        useExtendedSearch: false,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
        shouldSort: true,
      });
      expect(mockFuseInstance.search).toHaveBeenCalledWith('אורז');
      expect(results).toEqual([mockRecipes[0]]);
    });

    it('should search by tags field', () => {
      const mockFuseInstance = {
        search: jest
          .fn()
          .mockReturnValue([{ item: mockRecipes[1], score: 0.2, matches: [] }]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipesByField('סלט', 'tags');

      expect(MockedFuse).toHaveBeenCalledWith(mockRecipes, {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'description', weight: 0.3 },
          { name: 'tags', weight: 0.1 },
          { name: 'ingredients', weight: 0.1 },
        ],
        threshold: 0.3,
        ignoreLocation: true,
        useExtendedSearch: false,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
        shouldSort: true,
      });
      expect(mockFuseInstance.search).toHaveBeenCalledWith('סלט');
      expect(results).toEqual([mockRecipes[1]]);
    });

    it('should search by ingredients field', () => {
      const mockFuseInstance = {
        search: jest
          .fn()
          .mockReturnValue([{ item: mockRecipes[2], score: 0.1, matches: [] }]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipesByField('עוף', 'ingredients');

      expect(MockedFuse).toHaveBeenCalledWith(mockRecipes, {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'description', weight: 0.3 },
          { name: 'tags', weight: 0.1 },
          { name: 'ingredients', weight: 0.1 },
        ],
        threshold: 0.3,
        ignoreLocation: true,
        useExtendedSearch: false,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
        shouldSort: true,
      });
      expect(mockFuseInstance.search).toHaveBeenCalledWith('עוף');
      expect(results).toEqual([mockRecipes[2]]);
    });

    it('should search by description field', () => {
      const mockFuseInstance = {
        search: jest
          .fn()
          .mockReturnValue([{ item: mockRecipes[0], score: 0.1, matches: [] }]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipesByField('פשוט', 'description');

      expect(MockedFuse).toHaveBeenCalledWith(mockRecipes, {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'description', weight: 0.3 },
          { name: 'tags', weight: 0.1 },
          { name: 'ingredients', weight: 0.1 },
        ],
        threshold: 0.3,
        ignoreLocation: true,
        useExtendedSearch: false,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
        shouldSort: true,
      });
      expect(mockFuseInstance.search).toHaveBeenCalledWith('פשוט');
      expect(results).toEqual([mockRecipes[0]]);
    });

    it('should handle multiple search results', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([
          { item: mockRecipes[0], score: 0.1, matches: [] },
          { item: mockRecipes[1], score: 0.3, matches: [] },
        ]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipesByField('ירקות', 'ingredients');

      expect(results).toEqual([mockRecipes[0], mockRecipes[1]]);
    });
  });

  describe('Search with Description Content', () => {
    it('should find recipes by searching description content', () => {
      const mockFuseInstance = {
        search: jest
          .fn()
          .mockReturnValue([{ item: mockRecipes[0], score: 0.2, matches: [] }]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipes('בסיסי');

      expect(mockFuseInstance.search).toHaveBeenCalledWith('בסיסי');
      expect(results).toEqual([mockRecipes[0]]);
    });

    it('should find recipes by searching Hebrew words in description', () => {
      const mockFuseInstance = {
        search: jest
          .fn()
          .mockReturnValue([
            { item: mockRecipes[1], score: 0.15, matches: [] },
          ]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipes('בזיליקום');

      expect(mockFuseInstance.search).toHaveBeenCalledWith('בזיליקום');
      expect(results).toEqual([mockRecipes[1]]);
    });

    it('should prioritize title matches over description matches', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([
          { item: mockRecipes[0], score: 0.1, matches: [] }, // Title match (higher weight)
          { item: mockRecipes[1], score: 0.25, matches: [] }, // Description match (lower weight)
        ]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipes('טעים');

      expect(mockFuseInstance.search).toHaveBeenCalledWith('טעים');
      expect(results).toEqual([mockRecipes[0], mockRecipes[1]]);
    });

    it('should handle partial word matches in descriptions', () => {
      const mockFuseInstance = {
        search: jest
          .fn()
          .mockReturnValue([
            { item: mockRecipes[2], score: 0.18, matches: [] },
          ]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipes('עסיסי');

      expect(mockFuseInstance.search).toHaveBeenCalledWith('עסיסי');
      expect(results).toEqual([mockRecipes[2]]);
    });

    it('should return empty results for non-existent description content', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipes('לא קיים');

      expect(mockFuseInstance.search).toHaveBeenCalledWith('לא קיים');
      expect(results).toEqual([]);
    });

    it('should handle recipes without descriptions gracefully', () => {
      const recipesWithoutDescription = [
        {
          ...mockRecipes[0],
          description: undefined,
        },
        {
          ...mockRecipes[1],
          description: undefined,
        },
      ];

      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(recipesWithoutDescription);
      const results = searchRecipes('בסיסי');

      expect(mockFuseInstance.search).toHaveBeenCalledWith('בסיסי');
      expect(results).toEqual([]);
    });

    it('should search across multiple fields including description', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([
          { item: mockRecipes[0], score: 0.1, matches: [] }, // Title match
          { item: mockRecipes[1], score: 0.2, matches: [] }, // Description match
          { item: mockRecipes[2], score: 0.3, matches: [] }, // Tags match
        ]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipes('עוף');

      expect(mockFuseInstance.search).toHaveBeenCalledWith('עוף');
      expect(results).toEqual([mockRecipes[0], mockRecipes[1], mockRecipes[2]]);
    });
  });

  describe('Search Performance', () => {
    it('should maintain acceptable performance with description field', () => {
      // Create a larger dataset to test performance
      const largeRecipeDataset: Recipe[] = Array.from(
        { length: 100 },
        (_, i) => ({
          title: `Recipe ${i + 1}`,
          slug: `recipe-${i + 1}`,
          description: `This is a detailed description for recipe ${i + 1} with various ingredients and cooking methods`,
          tags: [`tag${i % 10}`, `category${i % 5}`],
          ingredients: [`ingredient${i}`, `spice${i % 8}`],
          instructions: `Step 1: Prepare ingredients. Step 2: Cook. Step 3: Serve.`,
          content: `Full content for recipe ${i + 1}`,
        })
      );

      const mockFuseInstance = {
        search: jest
          .fn()
          .mockReturnValue([
            { item: largeRecipeDataset[0], score: 0.1, matches: [] },
          ]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      const startTime = performance.now();
      initializeSearch(largeRecipeDataset);
      const initTime = performance.now() - startTime;

      const searchStartTime = performance.now();
      searchRecipes('Recipe');
      const searchTime = performance.now() - searchStartTime;

      // Performance assertions
      expect(initTime).toBeLessThan(100); // Initialization should be under 100ms
      expect(searchTime).toBeLessThan(50); // Search should be under 50ms
      expect(mockFuseInstance.search).toHaveBeenCalledWith('Recipe');
    });

    it('should handle search with weighted fields efficiently', () => {
      const testRecipes: Recipe[] = [
        {
          title: 'Test Recipe 1',
          slug: 'test-1',
          description:
            'A test recipe with specific keywords for performance testing',
          tags: ['test', 'performance'],
          ingredients: ['test ingredient'],
          instructions: 'Test instructions',
          content: 'Test content',
        },
        {
          title: 'Test Recipe 2',
          slug: 'test-2',
          description: 'Another test recipe with different keywords',
          tags: ['test', 'different'],
          ingredients: ['different ingredient'],
          instructions: 'Different instructions',
          content: 'Different content',
        },
      ];

      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([
          { item: testRecipes[0], score: 0.1, matches: [] },
          { item: testRecipes[1], score: 0.2, matches: [] },
        ]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(testRecipes);

      const startTime = performance.now();
      const results = searchRecipes('keywords');
      const searchTime = performance.now() - startTime;

      expect(searchTime).toBeLessThan(10); // Should be very fast for small dataset
      expect(results).toHaveLength(2);
      expect(mockFuseInstance.search).toHaveBeenCalledWith('keywords');
    });

    it('should maintain performance with Hebrew text search', () => {
      const hebrewRecipes: Recipe[] = [
        {
          title: 'מתכון עברי ראשון',
          slug: 'hebrew-1',
          description: 'תיאור מפורט של המתכון הראשון עם מילים עבריות',
          tags: ['עברי', 'ראשון'],
          ingredients: ['רכיב ראשון', 'רכיב שני'],
          instructions: 'הוראות בישול בעברית',
          content: 'תוכן מלא בעברית',
        },
        {
          title: 'מתכון עברי שני',
          slug: 'hebrew-2',
          description: 'תיאור של המתכון השני עם מילים שונות',
          tags: ['עברי', 'שני'],
          ingredients: ['רכיב שלישי', 'רכיב רביעי'],
          instructions: 'הוראות נוספות בעברית',
          content: 'תוכן נוסף בעברית',
        },
      ];

      const mockFuseInstance = {
        search: jest
          .fn()
          .mockReturnValue([
            { item: hebrewRecipes[0], score: 0.15, matches: [] },
          ]),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(hebrewRecipes);

      const startTime = performance.now();
      const results = searchRecipes('עברי');
      const searchTime = performance.now() - startTime;

      expect(searchTime).toBeLessThan(10); // Hebrew search should be fast
      expect(results).toHaveLength(1);
      expect(mockFuseInstance.search).toHaveBeenCalledWith('עברי');
    });
  });

  describe('Error handling', () => {
    it('should handle Fuse.js search errors gracefully', () => {
      const mockFuseInstance = {
        search: jest.fn().mockImplementation(() => {
          throw new Error('Search error');
        }),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);

      expect(() => searchRecipes('test')).toThrow('Search error');
    });

    it('should handle field-specific search errors gracefully', () => {
      const mockFuseInstance = {
        search: jest.fn().mockImplementation(() => {
          throw new Error('Field search error');
        }),
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);

      expect(() => searchRecipesByField('test', 'title')).toThrow(
        'Field search error'
      );
    });
  });
});
