export type IngredientState = {
  [ingredient: string]: boolean;
};

export type RecipeIngredientsState = {
  [recipeSlug: string]: IngredientState;
};

const STORAGE_KEY = 'recipe-ingredients-state';

export function saveIngredientState(recipeSlug: string, ingredient: string, checked: boolean): void {
  if (typeof window === 'undefined') return;
  
  const currentState = getRecipeIngredientsState();
  if (!currentState[recipeSlug]) {
    currentState[recipeSlug] = {};
  }
  
  currentState[recipeSlug][ingredient] = checked;
  
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
  } catch (error) {
    console.error('Failed to save ingredient state:', error);
  }
}

export function getIngredientState(recipeSlug: string, ingredient: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const recipeState = getRecipeIngredientsState()[recipeSlug];
  return recipeState?.[ingredient] || false;
}

export function getRecipeIngredientsState(): RecipeIngredientsState {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load ingredient state:', error);
    return {};
  }
}

export function clearRecipeIngredientsState(recipeSlug?: string): void {
  if (typeof window === 'undefined') return;
  
  if (recipeSlug) {
    const currentState = getRecipeIngredientsState();
    delete currentState[recipeSlug];
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
  } else {
    sessionStorage.removeItem(STORAGE_KEY);
  }
} 