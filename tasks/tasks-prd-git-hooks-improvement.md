# Tasks: Git Hooks Improvement

## Relevant Files

- `.husky/pre-commit` - Main pre-commit hook script that runs before each commit
- `.husky/pre-push` - Main pre-push hook script that runs before each push
- `package.json` - Main project package.json with lint-staged configuration and npm scripts
- `recipe-builder/package.json` - Recipe builder project package.json with npm scripts
- `.prettierrc` - Prettier configuration file
- `.prettierignore` - Prettier ignore file to exclude build artifacts
- `.eslintrc.json` - ESLint configuration file
- `jest.config.js` - Jest configuration for main project
- `recipe-builder/jest.config.js` - Jest configuration for recipe builder project
- `tsconfig.json` - TypeScript configuration for main project
- `recipe-builder/tsconfig.json` - TypeScript configuration for recipe builder project
- `scripts/hook-utils.sh` - Shared utility functions for git hooks with directory management and error handling
- `scripts/validate-recipes.js` - Recipe validation script (to be created)
- `scripts/cross-project-check.js` - Cross-project validation script (to be created)

### Notes

- Hook scripts should use proper error handling and directory management
- All scripts should be compatible with bash, zsh, and other common shells
- Test files should be created alongside the scripts they test
- Use `npx jest [optional/path/to/test/file]` to run tests

## Tasks

- [x] 1.0 Fix Pre-commit Hook Implementation

  - [x] 1.1 Create shared utility functions for directory management and error handling
  - [x] 1.2 Update pre-commit hook to properly handle both main and recipe-builder projects
  - [x] 1.3 Implement staged file filtering for efficient processing
  - [x] 1.4 Add TypeScript type checking for staged files in both projects
  - [x] 1.5 Add recipe file validation for staged .md files
  - [x] 1.6 Implement proper error messages with phase identification
  - [x] 1.7 Add progress indicators and clear success/failure messaging
  - [x] 1.8 Test pre-commit hook with various file change scenarios

- [x] 2.0 Fix Pre-push Hook Implementation

  - [x] 2.1 Refactor pre-push hook to use shared utility functions
  - [x] 2.2 Implement full linting for both projects with clear error reporting
  - [x] 2.3 Add full formatting check for both projects
  - [x] 2.4 Implement complete TypeScript compilation for both projects
  - [x] 2.5 Add build verification for both projects with proper error handling
  - [x] 2.6 Implement complete test suite with coverage for both projects
  - [x] 2.7 Add security audit (npm audit) for both projects
  - [x] 2.8 Add bundle analysis and performance checks
  - [x] 2.9 Implement cross-project validation and compatibility checks
  - [x] 2.10 Add proper directory restoration and cleanup on failure
  - [x] 2.11 Test pre-push hook with various failure scenarios

- [x] 3.0 Enhance Lint-staged Configuration

  - [x] 3.1 Update package.json lint-staged configuration to include ESLint
  - [x] 3.2 Add TypeScript checking to lint-staged for staged files
  - [x] 3.3 Configure lint-staged to handle both main and recipe-builder projects
  - [x] 3.4 Add recipe validation to lint-staged for .md files
  - [x] 3.5 Test lint-staged configuration with various file types
  - [x] 3.6 Ensure lint-staged works correctly with the pre-commit hook

- [x] 4.0 Implement Cross-Project Validation

  - [x] 4.1 Create cross-project validation script (scripts/cross-project-check.js)
  - [x] 4.2 Implement recipe synchronization validation between projects
  - [x] 4.3 Add dependency consistency checks between projects
  - [x] 4.4 Implement configuration validation (TypeScript, ESLint, Prettier)
  - [x] 4.5 Add version compatibility checks for shared dependencies
  - [x] 4.6 Create tests for cross-project validation script
  - [x] 4.7 Integrate cross-project validation into pre-push hook

- [x] 5.0 Add Recipe Validation System

  - [x] 5.1 Create recipe validation script (scripts/validate-recipes.js)
  - [x] 5.2 Implement frontmatter validation for recipe files
  - [x] 5.3 Add ingredient format validation
  - [x] 5.4 Implement instruction format validation
  - [x] 5.5 Add metadata validation (title, description, tags, etc.)
  - [x] 5.6 Create comprehensive tests for recipe validation
  - [x] 5.7 Integrate recipe validation into pre-commit and pre-push hooks
  - [x] 5.8 Add recipe validation to lint-staged for .md files

- [x] 6.0 Create Error Handling and Utility Functions
  - [x] 6.1 Create shared utility script (scripts/hook-utils.sh)
  - [x] 6.2 Implement directory management functions (save/restore working directory)
  - [x] 6.3 Add error handling functions with clear messaging
  - [x] 6.4 Implement progress indicator functions
  - [x] 6.5 Add color-coded output functions for success/warning/error states
  - [x] 6.6 Create phase identification and logging functions
  - [x] 6.7 Implement recovery instruction generation
  - [x] 6.8 Add graceful failure handling with proper exit codes
  - [x] 6.9 Create tests for utility functions
  - [x] 6.10 Update .prettierignore to exclude build artifacts and improve formatting performance
