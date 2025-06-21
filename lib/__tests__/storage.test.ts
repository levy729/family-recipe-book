import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import {
  saveIngredientState,
  getIngredientState,
  getRecipeIngredientsState,
  clearRecipeIngredientsState,
  IngredientState,
  RecipeIngredientsState,
  clearIngredientState,
  getAllIngredientStates,
} from '../storage';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
      // Reset all mock implementations to default
      localStorageMock.getItem
        .mockReset()
        .mockImplementation((key: string) => store[key] || null);
      localStorageMock.setItem
        .mockReset()
        .mockImplementation((key: string, value: string) => {
          store[key] = value;
        });
      localStorageMock.removeItem
        .mockReset()
        .mockImplementation((key: string) => {
          delete store[key];
        });
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Storage Utilities', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  describe('saveIngredientState', () => {
    it('should save ingredient state to localStorage', () => {
      saveIngredientState('recipe-1', 'flour', true);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'recipe-ingredients-state',
        JSON.stringify({
          'recipe-1': { flour: true },
        })
      );
    });

    it('should update existing recipe state', () => {
      const existingState = {
        'recipe-1': { flour: true, sugar: false },
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingState));

      saveIngredientState('recipe-1', 'eggs', true);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'recipe-ingredients-state',
        JSON.stringify({
          'recipe-1': { flour: true, sugar: false, eggs: true },
        })
      );
    });

    it('should create new recipe state if it does not exist', () => {
      saveIngredientState('new-recipe', 'milk', false);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'recipe-ingredients-state',
        JSON.stringify({
          'new-recipe': { milk: false },
        })
      );
    });

    it('should handle localStorage errors gracefully', () => {
      const originalSetItem = localStorageMock.setItem;
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });

      expect(() =>
        saveIngredientState('recipe-1', 'flour', true)
      ).not.toThrow();

      localStorageMock.setItem = originalSetItem;
    });

    it('should not throw error when window is undefined (SSR)', () => {
      const originalWindow = global.window;
      delete (global as any).window;

      expect(() =>
        saveIngredientState('recipe-1', 'flour', true)
      ).not.toThrow();

      global.window = originalWindow;
    });
  });

  describe('getIngredientState', () => {
    it('should return ingredient state from localStorage', () => {
      const state = {
        'recipe-1': { flour: true, sugar: false },
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(state));

      const result = getIngredientState('recipe-1', 'flour');

      expect(result).toBe(true);
    });

    it('should return false for non-existent ingredient', () => {
      const state = {
        'recipe-1': { flour: true },
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(state));

      const result = getIngredientState('recipe-1', 'sugar');

      expect(result).toBe(false);
    });

    it('should return false for non-existent recipe', () => {
      const result = getIngredientState('non-existent-recipe', 'flour');

      expect(result).toBe(false);
    });

    it('should return false when localStorage is empty', () => {
      const result = getIngredientState('recipe-1', 'flour');

      expect(result).toBe(false);
    });

    it('should not throw error when window is undefined (SSR)', () => {
      const originalWindow = global.window;
      delete (global as any).window;

      const result = getIngredientState('recipe-1', 'flour');

      expect(result).toBe(false);

      global.window = originalWindow;
    });
  });

  describe('getRecipeIngredientsState', () => {
    it('should return parsed state from localStorage', () => {
      const state = {
        'recipe-1': { flour: true, sugar: false },
        'recipe-2': { eggs: true },
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(state));

      const result = getRecipeIngredientsState();

      expect(result).toEqual(state);
    });

    it('should return empty object when localStorage is empty', () => {
      const result = getRecipeIngredientsState();

      expect(result).toEqual({});
    });

    it('should handle JSON parse errors gracefully', () => {
      localStorageMock.getItem.mockReturnValue('invalid-json');

      const result = getRecipeIngredientsState();

      expect(result).toEqual({});
    });

    it('should handle localStorage errors gracefully', () => {
      const originalGetItem = localStorageMock.getItem;
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('Storage error');
      });

      const result = getRecipeIngredientsState();

      expect(result).toEqual({});

      localStorageMock.getItem = originalGetItem;
    });

    it('should return empty object when window is undefined (SSR)', () => {
      const originalWindow = global.window;
      delete (global as any).window;

      const result = getRecipeIngredientsState();

      expect(result).toEqual({});

      global.window = originalWindow;
    });
  });

  describe('clearRecipeIngredientsState', () => {
    it('should clear specific recipe state', () => {
      const state = {
        'recipe-1': { flour: true },
        'recipe-2': { eggs: true },
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(state));

      clearRecipeIngredientsState('recipe-1');

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'recipe-ingredients-state',
        JSON.stringify({
          'recipe-2': { eggs: true },
        })
      );
    });

    it('should clear all state when no recipe slug provided', () => {
      clearRecipeIngredientsState();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        'recipe-ingredients-state'
      );
    });

    it('should handle non-existent recipe gracefully', () => {
      const state = {
        'recipe-1': { flour: true },
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(state));

      clearRecipeIngredientsState('non-existent-recipe');

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'recipe-ingredients-state',
        JSON.stringify({
          'recipe-1': { flour: true },
        })
      );
    });

    it('should not throw error when window is undefined (SSR)', () => {
      const originalWindow = global.window;
      delete (global as any).window;

      expect(() => clearRecipeIngredientsState('recipe-1')).not.toThrow();
      expect(() => clearRecipeIngredientsState()).not.toThrow();

      global.window = originalWindow;
    });
  });

  describe('Integration tests', () => {
    it('should maintain state across multiple operations', () => {
      // Save initial state
      saveIngredientState('recipe-1', 'flour', true);
      saveIngredientState('recipe-1', 'sugar', false);
      saveIngredientState('recipe-2', 'eggs', true);

      // Verify state is saved correctly
      expect(getIngredientState('recipe-1', 'flour')).toBe(true);
      expect(getIngredientState('recipe-1', 'sugar')).toBe(false);
      expect(getIngredientState('recipe-2', 'eggs')).toBe(true);

      // Update state
      saveIngredientState('recipe-1', 'flour', false);

      // Verify updated state
      expect(getIngredientState('recipe-1', 'flour')).toBe(false);
      expect(getIngredientState('recipe-1', 'sugar')).toBe(false);
      expect(getIngredientState('recipe-2', 'eggs')).toBe(true);

      // Clear specific recipe
      clearRecipeIngredientsState('recipe-1');

      // Verify cleared state
      expect(getIngredientState('recipe-1', 'flour')).toBe(false);
      expect(getIngredientState('recipe-1', 'sugar')).toBe(false);
      expect(getIngredientState('recipe-2', 'eggs')).toBe(true);
    });

    it('should handle complex nested state', () => {
      const complexState = {
        'recipe-1': {
          '1 כוס אורז לבן': true,
          '1.5 כוסות מים': false,
          '1 כף שמן': true,
        },
        'recipe-2': {
          עגבניות: true,
          מלפפונים: false,
        },
      };

      // Set up complex state
      localStorageMock.getItem.mockReturnValue(JSON.stringify(complexState));

      // Test retrieval
      expect(getIngredientState('recipe-1', '1 כוס אורז לבן')).toBe(true);
      expect(getIngredientState('recipe-1', '1.5 כוסות מים')).toBe(false);
      expect(getIngredientState('recipe-2', 'עגבניות')).toBe(true);
      expect(getIngredientState('recipe-2', 'מלפפונים')).toBe(false);

      // Test full state retrieval
      const retrievedState = getRecipeIngredientsState();
      expect(retrievedState).toEqual(complexState);
    });
  });
});
