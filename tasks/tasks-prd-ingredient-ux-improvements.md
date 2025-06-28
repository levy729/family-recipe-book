## Relevant Files

- `recipe-builder/components/recipe-form.tsx` – Main form for editing/creating recipes, where ingredient input logic is handled. (Refactored to add drag handle icon to each ingredient line, focus new ingredient input on add, ignore empty ingredient lines on submit and in state, add Tab-to-create-new-ingredient logic, Cmd+Backspace to delete line, intuitive keyboard navigation, dnd-kit drag-and-drop sorting with out-of-bounds protection, and updated form validation)
- `recipe-builder/components/ui/input.tsx` – Reusable input component, may be extended for ingredient entry and focus management. (Confirmed minimal, consistent styling)
- `recipe-builder/components/ui/button.tsx` – For the "Add Ingredient" and remove actions. (Confirmed minimal, consistent styling)
- `recipe-builder/components/ui/card.tsx` – For grouping form sections, including ingredients. (Confirmed minimal, consistent styling)
- `lib/recipes.ts` – Recipe parsing/validation logic, now filters out empty/whitespace-only ingredients when loading recipes.
- `lib/__tests__/recipes.test.ts` – Unit tests for recipe logic.
- `recipe-builder/lib/__tests__/recipe-parser.test.ts` – Tests for recipe parsing in the builder.

### Notes

- Unit tests should be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- Use a popular drag-and-drop package (e.g., dnd-kit or react-beautiful-dnd) for sorting ingredients.

## Tasks

- [x] 1.0 Update Ingredient Input UX

  - [x] 1.1 Refactor the ingredient input area in `recipe-form.tsx` to render each ingredient as a textbox with a drag handle (using the "menu" icon from Lucide icons).
  - [x] 1.2 Ensure clicking "Add Ingredient" creates a new textbox and focuses it for immediate typing.
  - [x] 1.3 Ignore empty ingredient lines when saving or submitting the form.
  - [x] 1.4 Ensure the UI remains visually minimal and matches the app's style.

- [x] 2.0 Implement Keyboard-Driven Ingredient Entry

  - [x] 2.1 Add logic so that when a textbox is focused and contains text, pressing Tab creates a new ingredient textbox below and focuses it.
  - [x] 2.2 Ensure keyboard navigation (Tab, Shift+Tab, Enter) works intuitively between ingredient fields.
  - [x] 2.3 Add logic so that pressing Cmd+Backspace (on Mac) deletes the current ingredient line.

- [x] 3.0 Add Drag-and-Drop Sorting for Ingredients

  - [x] 3.1 Research and select a popular, well-maintained drag-and-drop npm package (e.g., dnd-kit or react-beautiful-dnd).
  - [x] 3.2 Integrate the drag-and-drop package into the ingredient list in `recipe-form.tsx`.
  - [x] 3.3 Implement vertical drag-and-drop sorting for ingredient lines using the drag handle.
  - [x] 3.4 Ensure out-of-bounds drag operations do nothing.
  - [x] 3.5 Test drag-and-drop with keyboard and mouse.

- [x] 4.0 Refactor and Validate Ingredient Data Handling

  - [x] 4.1 Update state management to ensure ingredient data is always valid and empty lines are ignored.
  - [x] 4.2 Update form validation logic to match new UX (at least one non-empty ingredient required).
  - [x] 4.3 Update `lib/recipes.ts` if needed to support new ingredient structure.

- [x] 5.0 Update and Add Unit Tests
  - [x] 5.1 Add/extend tests in `lib/__tests__/recipes.test.ts` for ingredient parsing/validation.
  - [x] 5.2 Add/extend tests in `recipe-builder/lib/__tests__/recipe-parser.test.ts` for builder-specific logic.
  - [x] 5.3 Add/extend tests for the ingredient input UX in `recipe-form.tsx` (if/when a test file exists).
  - [x] 5.4 Test keyboard and drag-and-drop interactions for accessibility and correctness. # Relevant Files
