# Task: Hebrew Text Constants Implementation

## Overview

Implement centralized Hebrew text constants to ensure consistency and easy maintenance across the Family Recipe Book project.

## Problem

Hebrew text is currently hardcoded throughout the codebase, making it difficult to:

- Maintain consistency in terminology
- Update text across multiple components
- Ensure proper Hebrew text formatting
- Manage translations or text changes

## Solution

Create centralized constants files with all Hebrew text organized by category.

## Implementation

### 1. Main Project Constants (`/lib/constants.ts`)

Created constants file with:

- `HEBREW_TEXTS` object containing all UI text
- `HEBREW_TAGS` array for recipe tags
- `formatHebrewText()` helper function for dynamic text
- Type-safe exports with `as const`

### 2. Recipe Builder Constants (`/recipe-builder/lib/constants.ts`)

Created separate constants file for recipe builder with:

- Form labels and placeholders
- Button text
- Validation messages
- File operation messages
- Template-related text

### 3. Updated Type Definitions

- Updated `recipe-builder/types/recipe.ts` to import from constants
- Fixed TypeScript linter errors with proper type exports

### 4. Updated Project Rules

Added Hebrew Text Constants section to `RULES.md`:

- Centralized text requirement
- No hardcoded Hebrew rule
- Consistent naming conventions
- Type safety requirements

## Constants Structure

### Main Project (`/lib/constants.ts`)

```typescript
export const HEBREW_TEXTS = {
  // Page titles and headers
  SITE_TITLE: 'ספר מתכונים',
  SEARCH_RESULTS_TITLE: 'תוצאות חיפוש',
  // ... more categories

  // Search related
  SEARCH_PLACEHOLDER: 'חפש מתכונים...',
  SEARCHING_TEXT: 'מחפש...',
  // ... more search text

  // Search results with placeholders
  FOUND_RECIPES_FOR: 'נמצאו {count} מתכונים עבור "{query}"',
  // ... more dynamic text
} as const;
```

### Recipe Builder (`/recipe-builder/lib/constants.ts`)

```typescript
export const HEBREW_TEXTS = {
  // Form labels and placeholders
  TITLE_LABEL: 'כותרת המתכון',
  TITLE_PLACEHOLDER: 'הכנס את כותרת המתכון',
  // ... more form text

  // Buttons
  SAVE_RECIPE: 'שמור מתכון',
  // ... more button text

  // Messages
  RECIPE_SAVED: 'המתכון נשמר בהצלחה!',
  // ... more messages
} as const;
```

## Usage Examples

### Static Text

```typescript
import { HEBREW_TEXTS } from '@/lib/constants';

<h1>{HEBREW_TEXTS.SITE_TITLE}</h1>
```

### Dynamic Text with Placeholders

```typescript
import { HEBREW_TEXTS, formatHebrewText } from '@/lib/constants';

const message = formatHebrewText(HEBREW_TEXTS.FOUND_RECIPES_FOR, {
  count: 5,
  query: 'אורז',
});
// Result: "נמצאו 5 מתכונים עבור "אורז""
```

### Tags

```typescript
import { HEBREW_TAGS } from '@/lib/constants';

// Use in components
{HEBREW_TAGS.map(tag => (
  <option key={tag} value={tag}>{tag}</option>
))}
```

## Benefits

1. **Consistency**: All Hebrew text is centralized and consistent
2. **Maintainability**: Easy to update text across the entire application
3. **Type Safety**: TypeScript provides autocomplete and type checking
4. **Reusability**: Text can be reused across components
5. **Internationalization Ready**: Easy to add translation support later
6. **Code Quality**: Reduces duplication and improves code organization

## Next Steps

1. **Refactor Components**: Update all components to use constants instead of hardcoded text
2. **Add Missing Text**: Identify and add any missing Hebrew text to constants
3. **Testing**: Ensure all text displays correctly after refactoring
4. **Documentation**: Update component documentation to reference constants

## Files Modified

- ✅ `lib/constants.ts` - Created main constants file
- ✅ `recipe-builder/lib/constants.ts` - Created recipe builder constants
- ✅ `recipe-builder/types/recipe.ts` - Updated to use constants
- ✅ `RULES.md` - Added Hebrew constants rules
- ✅ `tasks/hebrew-constants.md` - Created this task documentation

## Files to Update (Future Task)

- `components/home-page-client.tsx` - Use constants for all Hebrew text
- `components/search-page-client.tsx` - Use constants for all Hebrew text
- `components/ingredient-header.tsx` - Use constants for Hebrew text
- `components/not-found.tsx` - Use constants for error messages
- `recipe-builder/app/layout.tsx` - Use constants for layout text
- Any other components with hardcoded Hebrew text

## Rules Added

### Hebrew Text Constants

- **Centralized Text**: All Hebrew hardcoded text must be in `/lib/constants.ts`
- **HEBREW_TEXTS Object**: Use the `HEBREW_TEXTS` constant for all UI text
- **HEBREW_TAGS Array**: Use the `HEBREW_TAGS` constant for recipe tags
- **Format Helper**: Use `formatHebrewText()` function for dynamic text with placeholders
- **No Hardcoded Hebrew**: Never write Hebrew text directly in components
- **Consistent Naming**: Use descriptive keys in the constants object
- **Type Safety**: Use `as const` for type safety and autocomplete
