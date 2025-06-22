# Product Requirements Document: Git Hooks Improvement

## Introduction/Overview

The current git hooks system in the Family Recipe Book project has several critical issues that are blocking development workflow and causing CI failures. The pre-commit and pre-push hooks have directory navigation problems, inconsistent error handling, and incomplete coverage of both the main website and recipe-builder projects. This improvement will create a robust, thorough git hooks system that ensures code quality, prevents CI failures, and streamlines the development process for contributors.

## Goals

1. **Eliminate CI Failures**: Ensure all code pushed to the repository passes CI checks on the first attempt
2. **Streamline Development Workflow**: Make commits and pushes reliable and predictable for all contributors
3. **Comprehensive Code Quality**: Implement thorough checks for both main website and recipe-builder projects
4. **Clear Error Feedback**: Provide specific, actionable error messages when hooks fail
5. **Consistent Behavior**: Ensure hooks work reliably across different development environments
6. **Complete Project Coverage**: Validate both projects (main website and recipe-builder) in all hooks

## User Stories

1. **As a contributor**, I want to commit my changes and have the pre-commit hook automatically format and validate my code so that I don't accidentally commit poorly formatted or broken code.

2. **As a contributor**, I want to push my changes and have the pre-push hook run comprehensive checks so that I can be confident my code will pass CI and not break the build.

3. **As a contributor**, I want clear error messages when hooks fail so that I can quickly understand what needs to be fixed and how to fix it.

4. **As a contributor**, I want hooks to check both the main website and recipe-builder projects so that I don't accidentally break either project.

5. **As a contributor**, I want hooks to run efficiently and provide progress feedback so that I can understand what's happening during the validation process.

6. **As a project maintainer**, I want consistent code quality across all contributions so that the codebase remains maintainable and reliable.

## Functional Requirements

### Pre-commit Hook Requirements

1. **Format Staged Files**: The system must automatically format all staged files using Prettier for both main website and recipe-builder projects.

2. **Lint Staged Files**: The system must run ESLint on all staged files for both projects and fail if linting errors are found.

3. **Type Check Staged Files**: The system must run TypeScript type checking on staged files for both projects.

4. **Run Tests for Changed Files**: The system must run Jest tests for files that have been modified in both projects.

5. **Validate Recipe Files**: The system must validate any staged recipe (.md) files to ensure they follow the correct format.

6. **Proper Error Handling**: The system must provide clear error messages indicating which specific check failed and how to fix it.

7. **Directory Management**: The system must properly navigate between projects and return to the original directory regardless of success or failure.

### Pre-push Hook Requirements

8. **Full Linting**: The system must run ESLint on the entire codebase for both projects.

9. **Full Formatting Check**: The system must verify that all files are properly formatted using Prettier for both projects.

10. **Full Type Checking**: The system must run complete TypeScript compilation for both projects.

11. **Build Verification**: The system must successfully build both projects using `npm run build`.

12. **Complete Test Suite**: The system must run all tests with coverage for both projects.

13. **Security Audit**: The system must run `npm audit` for both projects to check for security vulnerabilities.

14. **Cross-Project Validation**: The system must verify that both projects are in sync and compatible.

15. **Bundle Analysis**: The system must check bundle sizes and performance metrics for both projects.

### Error Handling Requirements

16. **Clear Error Messages**: The system must provide specific, actionable error messages that clearly indicate which phase failed and how to resolve the issue.

17. **Phase Identification**: The system must clearly identify which project and which check failed (e.g., "Main project linting failed", "Recipe builder build failed").

18. **Recovery Instructions**: The system must provide specific commands or steps to fix the identified issues.

19. **Graceful Failure**: The system must exit cleanly and restore the working directory state when any check fails.

### Integration Requirements

20. **Husky Integration**: The system must work seamlessly with the existing Husky configuration.

21. **NPM Scripts Integration**: The system must utilize existing npm scripts defined in both project package.json files.

22. **Lint-staged Integration**: The system must properly integrate with lint-staged for efficient staged file processing.

## Non-Goals (Out of Scope)

- **Performance Optimization**: This PRD does not focus on optimizing hook execution speed beyond basic efficiency.
- **New Tool Integration**: The system will not introduce new linting, formatting, or testing tools beyond what's already configured.
- **CI/CD Pipeline Changes**: This PRD does not modify the existing GitHub Actions workflow, only ensures hooks prevent CI failures.
- **Development Environment Setup**: The system will not handle initial project setup or environment configuration.
- **Emergency Bypass**: The system will not include mechanisms to bypass hooks, as thoroughness is prioritized over convenience.

## Design Considerations

- **Consistent Messaging**: Use emojis and clear formatting for hook output messages to match existing style
- **Progress Indicators**: Show clear progress through different phases of validation
- **Color-coded Output**: Use colors to distinguish between success, warning, and error states
- **Modular Structure**: Organize hooks into logical phases that can be easily understood and debugged

## Technical Considerations

- **Shell Script Compatibility**: Ensure hooks work across different shell environments (bash, zsh, etc.)
- **Node.js Version**: Maintain compatibility with Node.js 20 as specified in the project
- **Cross-Platform Support**: Ensure hooks work on macOS, Linux, and Windows development environments
- **Git Configuration**: Leverage existing git configuration and avoid requiring additional setup
- **Error Exit Codes**: Use appropriate exit codes to ensure git properly recognizes hook failures

## Success Metrics

1. **CI Success Rate**: 100% of pushes to main branch should pass CI on the first attempt
2. **Hook Failure Reduction**: Reduce hook failures by 90% compared to current state
3. **Developer Feedback**: Contributors report improved confidence in their commits and pushes
4. **Error Resolution Time**: Contributors can resolve hook failures within 5 minutes of receiving error messages
5. **Zero Directory Issues**: No more directory navigation problems or stuck states in hooks

## Open Questions

1. **Test Coverage Thresholds**: Should we set minimum test coverage requirements for both projects?
2. **Bundle Size Limits**: What are acceptable bundle size limits for the main website and recipe-builder?
3. **Performance Regression**: Should we implement performance regression detection in the hooks?
4. **Recipe Validation Rules**: What specific rules should be enforced for recipe file validation?
5. **Cross-Project Dependencies**: How should we handle dependencies that are shared between projects?
6. **Hook Execution Order**: Should certain checks run in parallel to improve performance while maintaining thoroughness?

# Git Hooks Improvement PRD - Task List

## Task 3.0: Enhanced Pre-push Hook with Utility Functions ✅ COMPLETED

**Status**: ✅ COMPLETED  
**Priority**: High  
**Estimated Time**: 2-3 hours

### Requirements

- [x] Refactor pre-push hook to use new utility functions
- [x] Add comprehensive validation including:
  - [x] Linting and formatting checks
  - [x] TypeScript type checking
  - [x] Main project build
  - [x] Recipe builder build and tests
  - [x] Main project tests
  - [x] Security audit for both projects
  - [x] Cross-project validation (placeholder for task 4.0)
- [x] Implement proper error handling and progress indicators
- [x] Add phase-based organization with clear visual feedback
- [x] Include detailed error reporting with context

### Implementation Details

- [x] Uses `run_command_with_error_handling` for all command execution
- [x] Implements phase-based organization with `print_phase_start` and `print_phase_success`
- [x] Shows progress indicators with `print_step_progress`
- [x] Provides comprehensive error context and recovery suggestions
- [x] Includes security audit with moderate level threshold
- [x] Maintains proper directory navigation between projects
- [x] Generates final summary with `print_hook_summary`

### Files Modified

- [x] `.husky/pre-push` - Completely refactored with utility functions

### Testing

- [x] Verified all utility functions are properly sourced
- [x] Confirmed error handling works for each validation step
- [x] Tested progress indicators and phase organization
- [x] Validated security audit integration

---

## Task 4.0: Cross-Project Validation Script ✅ COMPLETED

**Status**: ✅ COMPLETED  
**Priority**: Medium  
**Estimated Time**: 3-4 hours

### Requirements

- [x] Create comprehensive cross-project validation script
- [x] Validate recipe format consistency between projects
- [x] Check for shared dependencies and version conflicts
- [x] Verify recipe file synchronization
- [x] Validate TypeScript type compatibility
- [x] Check for duplicate recipe slugs across projects
- [x] Validate Hebrew text constants consistency

### Implementation Details

- [x] Create `scripts/validate-cross-project.js` script
- [x] Implement recipe format validation using existing parsers
- [x] Add dependency conflict detection
- [x] Create recipe synchronization validation
- [x] Add TypeScript interface compatibility checking
- [x] Implement duplicate detection across projects
- [x] Add Hebrew constants validation

### Files to Create/Modify

- [x] `scripts/validate-cross-project.js` - New validation script
- [x] `.husky/pre-push` - Update to call the new validation script
- [x] `package.json` - Add validation script command

### Testing

- [x] Test with valid cross-project state
- [x] Test with various validation failures
- [x] Verify error reporting and recovery suggestions
- [x] Test performance with large recipe sets

---

## Task 4.1: Recipe Builder Runtime Verification in Pre-commit Hook ✅ COMPLETED

**Status**: ✅ COMPLETED  
**Priority**: High  
**Estimated Time**: 1-2 hours

### Requirements

- [x] Integrate recipe builder runtime verification into pre-commit hook
- [x] Test recipe builder development server startup in pre-commit
- [x] Validate recipe builder build process in pre-commit
- [x] Check recipe builder dependency installation
- [x] Test recipe builder file operations
- [x] Verify recipe builder UI functionality
- [x] Fix npm start to work consistently

### Implementation Details

- [x] Add recipe builder validation to `.husky/pre-commit` hook
- [x] Fix Next.js configuration to support both development and static export modes
- [x] Update package.json scripts to include build:static for static export
- [x] Test npm start functionality with proper port management
- [x] Verify build process with `npm run build` in recipe builder
- [x] Check all dependencies are properly installed
- [x] Test recipe file reading and parsing
- [x] Validate UI components render correctly
- [x] Test recipe form functionality

### Files to Modify

- [x] `.husky/pre-commit` - Add recipe builder runtime validation
- [x] `recipe-builder/next.config.js` - Fix configuration for npm start compatibility
- [x] `recipe-builder/package.json` - Add build:static script

### Files to Test

- [x] `recipe-builder/package.json` - Dependencies and scripts
- [x] `recipe-builder/app/page.tsx` - Main page component
- [x] `recipe-builder/components/recipe-form.tsx` - Recipe form
- [x] `recipe-builder/lib/recipe-parser.ts` - Recipe parsing logic

### Testing

- [x] Test development server startup in pre-commit context
- [x] Test build process completion in pre-commit context
- [x] Verify no console errors during startup
- [x] Test recipe file operations
- [x] Validate UI responsiveness
- [x] Confirm npm start works consistently without port conflicts

---

## Task 5.0: Pre-commit Hook Enhancement

**Status**: 🔄 PENDING  
**Priority**: Medium  
**Estimated Time**: 2-3 hours

### Requirements

- [ ] Optimize pre-commit hook performance
- [ ] Add staged file filtering for targeted validation
- [ ] Implement parallel execution for independent checks
- [ ] Add caching for unchanged files
- [ ] Improve error messages and recovery suggestions
- [ ] Add configurable timeouts and validation levels

### Implementation Details

- [ ] Refactor pre-commit hook for parallel execution
- [ ] Add smart file filtering based on file types
- [ ] Implement caching strategy for build artifacts
- [ ] Add progress indicators and better user feedback
- [ ] Create configurable validation modes

### Files to Modify

- [ ] `.husky/pre-commit` - Enhanced with parallel execution
- [ ] `scripts/hook-utils.sh` - Add performance optimization functions
- [ ] `package.json` - Add new validation scripts

### Testing

- [ ] Test performance improvements
- [ ] Verify parallel execution works correctly
- [ ] Test caching and file filtering
- [ ] Validate error handling and recovery

---

## Task 5.1: Recipe Builder Keyboard Navigation Enhancement

**Status**: 🔄 PENDING  
**Priority**: High  
**Estimated Time**: 3-4 hours

### Requirements

- [ ] Improve keyboard navigation for ingredient input
- [ ] Add tab-to-next functionality for ingredient fields
- [ ] Implement auto-focus on new ingredient inputs
- [ ] Add keyboard shortcuts for common actions
- [ ] Improve instruction input navigation
- [ ] Add form validation feedback via keyboard

### Implementation Details

- [ ] **Ingredient Input Enhancement**:
  - [ ] Type text in ingredient field, press Tab to create new ingredient input
  - [ ] Auto-focus on newly created ingredient field
  - [ ] Shift+Tab to go back to previous field
  - [ ] Enter to submit form or move to next section
- [ ] **Instruction Input Enhancement**:
  - [ ] Tab to create new instruction line
  - [ ] Auto-focus on new instruction field
  - [ ] Shift+Tab to go back to previous instruction
- [ ] **General Navigation**:
  - [ ] Tab navigation between form sections
  - [ ] Escape to cancel current action
  - [ ] Ctrl+S to save recipe
  - [ ] Ctrl+Enter to submit form

### Files to Modify

- [ ] `recipe-builder/components/recipe-form.tsx` - Add keyboard navigation logic
- [ ] `recipe-builder/components/ui/input.tsx` - Enhance input component
- [ ] `recipe-builder/app/page.tsx` - Add keyboard event handlers
- [ ] `recipe-builder/lib/utils.ts` - Add keyboard navigation utilities

### User Experience Goals

- [ ] **Efficient Recipe Creation**: Users can create recipes using only keyboard
- [ ] **Intuitive Navigation**: Tab behavior feels natural and predictable
- [ ] **Quick Input**: Minimal clicks required to add ingredients/instructions
- [ ] **Accessibility**: Full keyboard navigation support for accessibility

### Testing

- [ ] Test tab navigation between all form fields
- [ ] Verify auto-focus works correctly on new fields
- [ ] Test keyboard shortcuts in different browsers
- [ ] Validate accessibility with screen readers
- [ ] Test form submission via keyboard

---

## Task 6.0: Post-merge Hook Implementation

**Status**: 🔄 PENDING  
**Priority**: Low  
**Estimated Time**: 2-3 hours

### Requirements

- [ ] Create post-merge hook for dependency updates
- [ ] Implement automatic dependency installation
- [ ] Add cross-project dependency synchronization
- [ ] Include validation after dependency updates

### Implementation Details

- [ ] Create `.husky/post-merge` hook
- [ ] Add dependency installation for both projects
- [ ] Implement validation after updates
- [ ] Add user notification for manual steps

### Files to Create

- [ ] `.husky/post-merge` - New post-merge hook

---

## Task 7.0: Documentation and Testing

**Status**: 🔄 PENDING  
**Priority**: Low  
**Estimated Time**: 1-2 hours

### Requirements

- [ ] Update documentation for new hooks
- [ ] Create testing scenarios for all hooks
- [ ] Add troubleshooting guide
- [ ] Document error recovery procedures

### Implementation Details

- [ ] Update README with hook documentation
- [ ] Create test scenarios for each hook
- [ ] Add troubleshooting section
- [ ] Document common error patterns and solutions

---

## Task 8.0: Recipe Builder Ingredient Sorting Enhancement

**Status**: 🔄 PENDING  
**Priority**: Medium  
**Estimated Time**: 2-3 hours

### Requirements

- [ ] Add easy way to sort ingredients in recipe builder
- [ ] Implement drag-and-drop reordering
- [ ] Add sort by alphabetical order option
- [ ] Add sort by custom categories (proteins, vegetables, etc.)
- [ ] Maintain ingredient order in saved recipes

### Implementation Details

- [ ] **Drag-and-Drop Interface**:
  - [ ] Implement drag handles for each ingredient
  - [ ] Add visual feedback during dragging
  - [ ] Smooth animations for reordering
- [ ] **Sort Options**:
  - [ ] Alphabetical sort (A-Z, Z-A)
  - [ ] Category-based sort (proteins, vegetables, spices, etc.)
  - [ ] Manual order preservation
- [ ] **User Experience**:
  - [ ] Quick sort buttons for common operations
  - [ ] Undo/redo functionality for sorting changes
  - [ ] Visual indicators for sorted state

### Files to Modify

- [ ] `recipe-builder/components/recipe-form.tsx` - Add sorting interface
- [ ] `recipe-builder/components/ui/draggable-list.tsx` - New draggable component
- [ ] `recipe-builder/lib/sorting.ts` - Add sorting utilities
- [ ] `recipe-builder/types/recipe.ts` - Update types for sorting

### Testing

- [ ] Test drag-and-drop functionality
- [ ] Verify sort algorithms work correctly
- [ ] Test undo/redo functionality
- [ ] Validate accessibility for drag-and-drop

---

## Task 9.0: Website Instruction Formatting Enhancement

**Status**: 🔄 PENDING  
**Priority**: Medium  
**Estimated Time**: 2-3 hours

### Requirements

- [ ] Split instructions by paragraphs instead of lines
- [ ] Improve instruction readability on website
- [ ] Add proper spacing between instruction steps
- [ ] Maintain Hebrew RTL formatting
- [ ] Ensure responsive design for instruction display

### Implementation Details

- [ ] **Instruction Parsing**:
  - [ ] Parse instructions by paragraph breaks instead of line breaks
  - [ ] Handle mixed content (paragraphs and lists)
  - [ ] Preserve formatting within paragraphs
- [ ] **Display Enhancement**:
  - [ ] Add proper spacing between instruction paragraphs
  - [ ] Implement numbered or bulleted lists for steps
  - [ ] Add visual separators between major instruction sections
- [ ] **RTL Support**:
  - [ ] Ensure proper RTL layout for Hebrew instructions
  - [ ] Maintain correct text direction and alignment
  - [ ] Test with mixed Hebrew/English content

### Files to Modify

- [ ] `lib/recipes.ts` - Update instruction parsing logic
- [ ] `components/instruction-list.tsx` - Enhance instruction display
- [ ] `app/recipe/[slug]/page.tsx` - Update recipe page layout
- [ ] `lib/utils.ts` - Add instruction formatting utilities

### Testing

- [ ] Test instruction parsing with various formats
- [ ] Verify RTL layout works correctly
- [ ] Test responsive design on different screen sizes
- [ ] Validate accessibility for instruction reading

---

## Overall Progress

- **Completed**: 5/11 tasks (45.5%)
- **In Progress**: 0/11 tasks (0%)
- **Pending**: 6/11 tasks (54.5%)

### Next Steps

1. ✅ Task 3.0: Enhanced Pre-push Hook - COMPLETED
2. ✅ Task 4.0: Cross-Project Validation Script - COMPLETED
3. ✅ Task 4.1: Recipe Builder Runtime Verification in Pre-commit Hook - COMPLETED
4. 🔄 Task 5.0: Pre-commit Hook Enhancement - NEXT
5. 🔄 Task 5.1: Recipe Builder Keyboard Navigation Enhancement
6. 🔄 Task 6.0: Post-merge Hook Implementation
7. 🔄 Task 7.0: Documentation and Testing
8. 🔄 Task 8.0: Recipe Builder Ingredient Sorting Enhancement
9. 🔄 Task 9.0: Website Instruction Formatting Enhancement
