import Fuse from 'fuse.js';
import { initializeSearch, searchRecipes, searchRecipesByField, resetSearch } from '../search';
import { Recipe } from '../recipes';

// Mock Fuse.js
jest.mock('fuse.js');
const MockedFuse = Fuse as jest.MockedClass<typeof Fuse>;

describe('Search Functionality', () => {
  const mockRecipes: Recipe[] = [
    {
      title: "אורז לבן פשוט",
      slug: "simple-white-rice",
      tags: ["אורז", "תוספת", "קל"],
      ingredients: [
        "1 כוס אורז לבן",
        "1.5 כוסות מים",
        "1 כף שמן",
        "1/2 כפית מלח"
      ],
      instructions: "שוטפים את האורז...",
      content: "אורז לבן פשוט, רך וטעים."
    },
    {
      title: "סלט ירקות טרי",
      slug: "fresh-vegetable-salad",
      tags: ["סלט", "ירקות", "בריא"],
      ingredients: [
        "עגבניות",
        "מלפפונים",
        "בצל אדום",
        "שמן זית"
      ],
      instructions: "חותכים את הירקות...",
      content: "סלט ירקות טרי וטעים."
    },
    {
      title: "עוף צלוי בתנור",
      slug: "roasted-chicken",
      tags: ["עוף", "צלוי", "עיקרי"],
      ingredients: [
        "חזה עוף",
        "תבלינים",
        "שמן זית",
        "לימון"
      ],
      instructions: "מחממים תנור...",
      content: "עוף צלוי בתנור, רך וטעים."
    }
  ];

  const mockSearchResults = [
    { item: mockRecipes[0], score: 0.1, matches: [] },
    { item: mockRecipes[1], score: 0.3, matches: [] }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    MockedFuse.mockClear();
    resetSearch();
  });

  describe('initializeSearch', () => {
    it('should initialize Fuse.js with correct options', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([])
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);

      expect(MockedFuse).toHaveBeenCalledWith(mockRecipes, {
        keys: ['title', 'tags', 'ingredients'],
        threshold: 0.3,
        ignoreLocation: true,
        useExtendedSearch: false,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
        shouldSort: true
      });
    });

    it('should store recipes for field-specific searches', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([])
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
        search: jest.fn().mockReturnValue([])
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipes('');

      expect(results).toEqual([]);
    });

    it('should return empty array for whitespace-only query', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([])
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipes('   ');

      expect(results).toEqual([]);
    });

    it('should search and return recipes', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue(mockSearchResults)
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipes('אורז');

      expect(mockFuseInstance.search).toHaveBeenCalledWith('אורז');
      expect(results).toEqual([mockRecipes[0], mockRecipes[1]]);
    });

    it('should handle Hebrew text correctly', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([{ item: mockRecipes[0], score: 0.1, matches: [] }])
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
        search: jest.fn().mockReturnValue([])
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipesByField('', 'title');

      expect(results).toEqual([]);
    });

    it('should search by title field', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([{ item: mockRecipes[0], score: 0.1, matches: [] }])
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipesByField('אורז', 'title');

      expect(MockedFuse).toHaveBeenCalledWith(mockRecipes, {
        keys: ['title'],
        threshold: 0.3,
        ignoreLocation: true,
        useExtendedSearch: false,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
        shouldSort: true
      });
      expect(mockFuseInstance.search).toHaveBeenCalledWith('אורז');
      expect(results).toEqual([mockRecipes[0]]);
    });

    it('should search by tags field', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([{ item: mockRecipes[1], score: 0.2, matches: [] }])
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipesByField('סלט', 'tags');

      expect(MockedFuse).toHaveBeenCalledWith(mockRecipes, {
        keys: ['tags'],
        threshold: 0.3,
        ignoreLocation: true,
        useExtendedSearch: false,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
        shouldSort: true
      });
      expect(mockFuseInstance.search).toHaveBeenCalledWith('סלט');
      expect(results).toEqual([mockRecipes[1]]);
    });

    it('should search by ingredients field', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([{ item: mockRecipes[2], score: 0.1, matches: [] }])
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipesByField('עוף', 'ingredients');

      expect(MockedFuse).toHaveBeenCalledWith(mockRecipes, {
        keys: ['ingredients'],
        threshold: 0.3,
        ignoreLocation: true,
        useExtendedSearch: false,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
        shouldSort: true
      });
      expect(mockFuseInstance.search).toHaveBeenCalledWith('עוף');
      expect(results).toEqual([mockRecipes[2]]);
    });

    it('should handle multiple search results', () => {
      const mockFuseInstance = {
        search: jest.fn().mockReturnValue([
          { item: mockRecipes[0], score: 0.1, matches: [] },
          { item: mockRecipes[1], score: 0.3, matches: [] }
        ])
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);
      const results = searchRecipesByField('ירקות', 'ingredients');

      expect(results).toEqual([mockRecipes[0], mockRecipes[1]]);
    });
  });

  describe('Error handling', () => {
    it('should handle Fuse.js search errors gracefully', () => {
      const mockFuseInstance = {
        search: jest.fn().mockImplementation(() => {
          throw new Error('Search error');
        })
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);

      expect(() => searchRecipes('test')).toThrow('Search error');
    });

    it('should handle field-specific search errors gracefully', () => {
      const mockFuseInstance = {
        search: jest.fn().mockImplementation(() => {
          throw new Error('Field search error');
        })
      };
      MockedFuse.mockImplementation(() => mockFuseInstance as any);

      initializeSearch(mockRecipes);

      expect(() => searchRecipesByField('test', 'title')).toThrow('Field search error');
    });
  });
}); 