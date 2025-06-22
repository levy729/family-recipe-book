# Recipe Builder and Website Enhancements - Task List

## Relevant Files

### Recipe Builder Components

- `recipe-builder/components/recipe-form.tsx` - Main recipe form component that needs keyboard navigation
- `recipe-builder/components/recipe-form.test.tsx` - Unit tests for recipe form component
- `recipe-builder/components/ui/input.tsx` - Enhanced input component with keyboard support
- `recipe-builder/components/ui/input.test.tsx` - Unit tests for input component
- `recipe-builder/components/ui/draggable-list.tsx` - New draggable list component for ingredient sorting
- `recipe-builder/components/ui/draggable-list.test.tsx` - Unit tests for draggable list component
- `recipe-builder/components/ui/sort-controls.tsx` - New component for sort controls
- `recipe-builder/components/ui/sort-controls.test.tsx` - Unit tests for sort controls

### Recipe Builder Utilities

- `recipe-builder/lib/keyboard-navigation.ts` - Keyboard navigation utilities
- `recipe-builder/lib/keyboard-navigation.test.ts` - Unit tests for keyboard navigation
- `recipe-builder/lib/sorting.ts` - Sorting algorithms and utilities
- `recipe-builder/lib/sorting.test.ts` - Unit tests for sorting utilities
- `recipe-builder/lib/utils.ts` - General utility functions
- `recipe-builder/lib/utils.test.ts` - Unit tests for utility functions

### Recipe Builder Types

- `recipe-builder/types/recipe.ts` - Updated recipe types for sorting and navigation
- `recipe-builder/types/recipe.test.ts` - Unit tests for recipe types

### Website Components

- `components/instruction-list.tsx` - Enhanced instruction display component
- `components/instruction-list.test.tsx` - Unit tests for instruction list
- `lib/recipes.ts` - Updated recipe parsing logic for paragraph-based instructions
- `lib/recipes.test.ts` - Unit tests for recipe parsing
- `lib/utils.ts` - Instruction formatting utilities
- `lib/utils.test.ts` - Unit tests for instruction formatting

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Recipe Builder Keyboard Navigation Implementation

  - [ ] 1.1 Create keyboard navigation utilities and event handlers
  - [ ] 1.2 Implement tab-to-next functionality for ingredient inputs
  - [ ] 1.3 Implement tab-to-next functionality for instruction inputs
  - [ ] 1.4 Add keyboard shortcuts (Escape, Ctrl+S, Ctrl+Enter)
  - [ ] 1.5 Integrate keyboard navigation into recipe form component
  - [ ] 1.6 Add visual feedback for keyboard interactions
  - [ ] 1.7 Test keyboard navigation across different browsers

- [ ] 2.0 Recipe Builder Ingredient Sorting System

  - [ ] 2.1 Create draggable list component with drag handles
  - [ ] 2.2 Implement drag-and-drop reordering logic
  - [ ] 2.3 Add visual feedback during dragging operations
  - [ ] 2.4 Implement alphabetical sorting (A-Z, Z-A)
  - [ ] 2.5 Implement category-based sorting (proteins, vegetables, spices)
  - [ ] 2.6 Create sort controls component with quick sort buttons
  - [ ] 2.7 Add undo/redo functionality for sorting changes
  - [ ] 2.8 Integrate sorting system into recipe form
  - [ ] 2.9 Add visual indicators for sorted state

- [x] 3.0 Website Instruction Formatting Enhancement

  - [x] 3.1 Update instruction parsing to handle paragraph breaks
  - [x] 3.2 Enhance instruction display with proper spacing
  - [x] 3.3 Implement numbered or bulleted lists for instruction steps
  - [x] 3.4 Add visual separators between major instruction sections
  - [x] 3.5 Ensure RTL layout preservation for Hebrew instructions
  - [x] 3.6 Test responsive design on different screen sizes
  - [x] 3.7 Update existing recipes to use new formatting

- [ ] 4.0 Component Library and Utilities

  - [ ] 4.1 Create reusable keyboard navigation hook
  - [ ] 4.2 Implement drag-and-drop utilities with accessibility support
  - [ ] 4.3 Add instruction formatting utilities
  - [ ] 4.4 Create shared types for keyboard and sorting functionality
  - [ ] 4.5 Add utility functions for form validation and state management

- [ ] 5.0 Testing and Accessibility Validation
  - [ ] 5.1 Write comprehensive unit tests for all new components
  - [ ] 5.2 Implement integration tests for keyboard navigation flow
  - [ ] 5.3 Add accessibility tests (WCAG 2.1 compliance)
  - [ ] 5.4 Test cross-browser compatibility (Chrome, Firefox, Safari, Edge)
  - [ ] 5.5 Validate screen reader compatibility
  - [ ] 5.6 Test responsive design on various devices
  - [ ] 5.7 Perform performance testing to ensure no degradation
