import Fuse from 'fuse.js';
import { Recipe } from './recipes';

// Configure Fuse.js for Hebrew content
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'description', weight: 0.3 },
    { name: 'tags', weight: 0.1 },
    { name: 'ingredients', weight: 0.1 },
  ],
  threshold: 0.3, // Lower threshold for more exact matches
  ignoreLocation: true,
  useExtendedSearch: false,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  shouldSort: true,
};

let fuseInstance: Fuse<Recipe> | null = null;
let allRecipes: Recipe[] = [];

export function initializeSearch(recipes: Recipe[]) {
  allRecipes = recipes;
  fuseInstance = new Fuse(recipes, fuseOptions);
}

export function searchRecipes(query: string): Recipe[] {
  if (!fuseInstance) {
    console.warn('Search not initialized. Call initializeSearch first.');
    return [];
  }

  if (!query.trim()) {
    return [];
  }

  const results = fuseInstance.search(query);
  return results.map(result => result.item);
}

export function searchRecipesByField(
  query: string,
  field: 'title' | 'tags' | 'ingredients' | 'description'
): Recipe[] {
  if (!fuseInstance) {
    console.warn('Search not initialized. Call initializeSearch first.');
    return [];
  }

  if (!query.trim()) {
    return [];
  }

  const fieldOptions = {
    ...fuseOptions,
    keys: [field],
  };

  const fieldFuse = new Fuse(allRecipes, fieldOptions);
  const results = fieldFuse.search(query);
  return results.map(result => result.item);
}

// For testing purposes
export function resetSearch() {
  fuseInstance = null;
  allRecipes = [];
}
