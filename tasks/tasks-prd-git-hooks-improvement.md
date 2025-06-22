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

- [ ] 1.0 Fix Pre-commit Hook Implementation

  - [x] 1.1 Create shared utility functions for directory management and error handling
  - [x] 1.2 Update pre-commit hook to properly handle both main and recipe-builder projects
  - [x] 1.3 Implement staged file filtering for efficient processing
  - [x] 1.4 Add TypeScript type checking for staged files in both projects
  - [x] 1.5 Add recipe file validation for staged .md files
  - [x] 1.6 Implement proper error messages with phase identification
  - [ ] 1.7 Add progress indicators and clear success/failure messaging
  - [ ] 1.8 Test pre-commit hook with various file change scenarios

- [ ] 2.0 Fix Pre-push Hook Implementation

  - [ ] 2.1 Refactor pre-push hook to use shared utility functions
  - [ ] 2.2 Implement full linting for both projects with clear error reporting
  - [ ] 2.3 Add full formatting check for both projects
  - [ ] 2.4 Implement complete TypeScript compilation for both projects
  - [ ] 2.5 Add build verification for both projects with proper error handling
  - [ ] 2.6 Implement complete test suite with coverage for both projects
  - [ ] 2.7 Add security audit (npm audit) for both projects
  - [ ] 2.8 Add bundle analysis and performance checks
  - [ ] 2.9 Implement cross-project validation and compatibility checks
  - [ ] 2.10 Add proper directory restoration and cleanup on failure
  - [ ] 2.11 Test pre-push hook with various failure scenarios

- [ ] 3.0 Enhance Lint-staged Configuration

  - [ ] 3.1 Update package.json lint-staged configuration to include ESLint
  - [ ] 3.2 Add TypeScript checking to lint-staged for staged files
  - [ ] 3.3 Configure lint-staged to handle both main and recipe-builder projects
  - [ ] 3.4 Add recipe validation to lint-staged for .md files
  - [ ] 3.5 Test lint-staged configuration with various file types
  - [ ] 3.6 Ensure lint-staged works correctly with the pre-commit hook

- [ ] 4.0 Implement Cross-Project Validation

  - [ ] 4.1 Create cross-project validation script (scripts/cross-project-check.js)
  - [ ] 4.2 Implement recipe synchronization validation between projects
  - [ ] 4.3 Add dependency consistency checks between projects
  - [ ] 4.4 Implement configuration validation (TypeScript, ESLint, Prettier)
  - [ ] 4.5 Add version compatibility checks for shared dependencies
  - [ ] 4.6 Create tests for cross-project validation script
  - [ ] 4.7 Integrate cross-project validation into pre-push hook

- [ ] 5.0 Add Recipe Validation System

  - [ ] 5.1 Create recipe validation script (scripts/validate-recipes.js)
  - [ ] 5.2 Implement frontmatter validation for recipe files
  - [ ] 5.3 Add ingredient format validation
  - [ ] 5.4 Implement instruction format validation
  - [ ] 5.5 Add metadata validation (title, description, tags, etc.)
  - [ ] 5.6 Create comprehensive tests for recipe validation
  - [ ] 5.7 Integrate recipe validation into pre-commit and pre-push hooks
  - [ ] 5.8 Add recipe validation to lint-staged for .md files

- [ ] 6.0 Create Error Handling and Utility Functions
  - [ ] 6.1 Create shared utility script (scripts/hook-utils.sh)
  - [ ] 6.2 Implement directory management functions (save/restore working directory)
  - [ ] 6.3 Add error handling functions with clear messaging
  - [ ] 6.4 Implement progress indicator functions
  - [ ] 6.5 Add color-coded output functions for success/warning/error states
  - [ ] 6.6 Create phase identification and logging functions
  - [ ] 6.7 Implement recovery instruction generation
  - [ ] 6.8 Add graceful failure handling with proper exit codes
  - [ ] 6.9 Create tests for utility functions
  - [ ] 6.10 Update .prettierignore to exclude build artifacts and improve formatting performance
