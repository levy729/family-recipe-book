export type IngredientState = {
  [ingredient: string]: boolean;
};

export type RecipeIngredientsState = {
  [recipeSlug: string]: IngredientState;
};

export type InstructionState = {
  [stepIndex: number]: boolean;
};

export type RecipeInstructionsState = {
  [recipeSlug: string]: InstructionState;
};

const INGREDIENTS_STORAGE_KEY = 'recipe-ingredients-state';
const INSTRUCTIONS_STORAGE_KEY = 'recipe-instructions-state';

export function saveIngredientState(recipeSlug: string, ingredient: string, checked: boolean): void {
  if (typeof window === 'undefined') return;
  
  const currentState = getRecipeIngredientsState();
  if (!currentState[recipeSlug]) {
    currentState[recipeSlug] = {};
  }
  
  currentState[recipeSlug][ingredient] = checked;
  
  try {
    sessionStorage.setItem(INGREDIENTS_STORAGE_KEY, JSON.stringify(currentState));
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
    const stored = sessionStorage.getItem(INGREDIENTS_STORAGE_KEY);
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
    sessionStorage.setItem(INGREDIENTS_STORAGE_KEY, JSON.stringify(currentState));
  } else {
    sessionStorage.removeItem(INGREDIENTS_STORAGE_KEY);
  }
}

// Instruction progress storage functions
export function saveInstructionState(recipeSlug: string, stepIndex: number, completed: boolean): void {
  if (typeof window === 'undefined') return;
  
  const currentState = getRecipeInstructionsState();
  if (!currentState[recipeSlug]) {
    currentState[recipeSlug] = {};
  }
  
  currentState[recipeSlug][stepIndex] = completed;
  
  try {
    sessionStorage.setItem(INSTRUCTIONS_STORAGE_KEY, JSON.stringify(currentState));
  } catch (error) {
    console.error('Failed to save instruction state:', error);
  }
}

export function getInstructionState(recipeSlug: string, stepIndex: number): boolean {
  if (typeof window === 'undefined') return false;
  
  const recipeState = getRecipeInstructionsState()[recipeSlug];
  return recipeState?.[stepIndex] || false;
}

export function getRecipeInstructionsState(): RecipeInstructionsState {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = sessionStorage.getItem(INSTRUCTIONS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load instruction state:', error);
    return {};
  }
}

export function clearRecipeInstructionsState(recipeSlug?: string): void {
  if (typeof window === 'undefined') return;
  
  if (recipeSlug) {
    const currentState = getRecipeInstructionsState();
    delete currentState[recipeSlug];
    sessionStorage.setItem(INSTRUCTIONS_STORAGE_KEY, JSON.stringify(currentState));
  } else {
    sessionStorage.removeItem(INSTRUCTIONS_STORAGE_KEY);
  }
} 