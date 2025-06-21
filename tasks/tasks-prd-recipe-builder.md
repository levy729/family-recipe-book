# Task List: Web-Based Recipe Builder

Based on PRD: `prd-recipe-builder.md`

## Relevant Files

- `recipe-builder/app/layout.tsx` - Main layout for the recipe builder application with Hebrew RTL support.
- `recipe-builder/app/page.tsx` - Main page component that orchestrates the recipe builder interface.
- `recipe-builder/components/recipe-form.tsx` - Main form component for recipe creation and editing.
- `recipe-builder/components/recipe-form.test.tsx` - Unit tests for the recipe form component.
- `recipe-builder/components/hebrew-input.tsx` - Custom input component with Hebrew RTL support.
- `recipe-builder/components/hebrew-input.test.tsx` - Unit tests for Hebrew input component.
- `recipe-builder/components/ingredient-list.tsx` - Dynamic ingredient list component with add/remove functionality.
- `recipe-builder/components/ingredient-list.test.tsx` - Unit tests for ingredient list component.
- `recipe-builder/components/instruction-list.tsx` - Step-by-step instruction input component.
- `recipe-builder/components/instruction-list.test.tsx` - Unit tests for instruction list component.
- `recipe-builder/components/recipe-preview.tsx` - Preview component showing how recipe will look.
- `recipe-builder/components/recipe-preview.test.tsx` - Unit tests for recipe preview component.
- `recipe-builder/components/tag-selector.tsx` - Tag selection component with predefined Hebrew tags.
- `recipe-builder/components/tag-selector.test.tsx` - Unit tests for tag selector component.
- `recipe-builder/components/file-browser.tsx` - File browser for selecting existing recipes to edit.
- `recipe-builder/components/file-browser.test.tsx` - Unit tests for file browser component.
- `recipe-builder/lib/recipe-parser.ts` - Utility functions for parsing and generating recipe markdown.
- `recipe-builder/lib/recipe-parser.test.ts` - Unit tests for recipe parsing utilities.
- `recipe-builder/lib/file-operations.ts` - File system operations for saving and loading recipes.
- `recipe-builder/lib/file-operations.test.ts` - Unit tests for file operations.
- `recipe-builder/lib/validation.ts` - Validation functions for recipe data and YAML syntax.
- `recipe-builder/lib/validation.test.ts` - Unit tests for validation functions.
- `recipe-builder/lib/templates.ts` - Template system for common recipe types.
- `recipe-builder/lib/templates.test.ts` - Unit tests for template system.
- `recipe-builder/types/recipe.ts` - TypeScript interfaces for recipe data structures.
- `recipe-builder/next.config.js` - Next.js configuration for the recipe builder.
- `recipe-builder/package.json` - Package configuration for the recipe builder.
- `recipe-builder/tailwind.config.ts` - Tailwind CSS configuration for the recipe builder.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Set up Recipe Builder Project Structure

  - [x] 1.1 Create `/recipe-builder/` directory structure with Next.js app router
  - [x] 1.2 Set up package.json with dependencies (Next.js, Tailwind CSS, shadcn/ui)
  - [x] 1.3 Configure Next.js for local development on port 3002
  - [x] 1.4 Set up Tailwind CSS configuration matching main project
  - [x] 1.5 Install and configure shadcn/ui components
  - [x] 1.6 Create basic layout with Hebrew RTL support
  - [x] 1.7 Set up TypeScript configuration and types directory

- [x] 2.0 Implement Core Recipe Creation Interface

  - [x] 2.1 Create main recipe form component with basic structure
  - [x] 2.2 Implement title input field with Hebrew support
  - [x] 2.3 Add slug input field with auto-generation from Hebrew title
  - [x] 2.4 Create tag selector component with predefined Hebrew tags
  - [x] 2.5 Implement ingredient list component with add/remove functionality
  - [x] 2.6 Add instruction list component with step-by-step input
  - [x] 2.7 Create form validation for required fields
  - [x] 2.8 Add form submission handling and error display

- [x] 3.0 Add Hebrew RTL Support and Text Input Components

  - [x] 3.1 Create custom Hebrew input component with RTL support
  - [x] 3.2 Implement proper text direction handling for Hebrew content
  - [x] 3.3 Add Hebrew character validation and input sanitization
  - [x] 3.4 Create Hebrew textarea component for longer content
  - [x] 3.5 Implement Hebrew tag input component
  - [x] 3.6 Add Hebrew placeholder text and labels
  - [ ] 3.7 Test Hebrew text input across different browsers

- [x] 4.0 Implement Recipe Editing and File Operations

  - [x] 4.1 Create file browser component for selecting existing recipes
  - [x] 4.2 Implement recipe loading functionality from markdown files
  - [x] 4.3 Add recipe parsing utilities to extract YAML frontmatter
  - [x] 4.4 Create file saving functionality with proper markdown generation
  - [x] 4.5 Implement file overwrite confirmation and error handling
  - [x] 4.6 Add file encoding handling for UTF-8 Hebrew text
  - [x] 4.7 Create backup functionality before file operations
  - [x] 4.8 Add file system error handling and user feedback

- [ ] 5.0 Add Preview, Validation, and Template System

  - [ ] 5.1 Create recipe preview component with real-time updates
  - [ ] 5.2 Implement YAML syntax validation
  - [ ] 5.3 Add markdown formatting validation
  - [ ] 5.4 Create template system for common recipe types
  - [ ] 5.5 Implement template selection and application
  - [ ] 5.6 Add custom template creation and management
  - [ ] 5.7 Create validation error display and suggestions
  - [ ] 5.8 Implement preview styling similar to main website
  - [ ] 5.9 Sort suggested tags alphabetically for better UX

- [ ] 6.0 Create Comprehensive Test Suite
  - [ ] 6.1 Write unit tests for recipe parsing utilities
  - [ ] 6.2 Create tests for Hebrew input components
  - [ ] 6.3 Add tests for form validation logic
  - [ ] 6.4 Implement tests for file operations
  - [ ] 6.5 Create integration tests for recipe creation workflow
  - [ ] 6.6 Add tests for template system
  - [ ] 6.7 Implement tests for Hebrew text handling
  - [ ] 6.8 Create end-to-end tests for complete recipe creation process
