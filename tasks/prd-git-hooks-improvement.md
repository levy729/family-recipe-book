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

- [ ] Enhance pre-commit hook with utility functions
- [ ] Add staged file validation
- [ ] Implement quick linting and formatting checks
- [ ] Add TypeScript type checking for staged files
- [ ] Include recipe format validation for recipe files

### Implementation Details

- [ ] Refactor existing pre-commit hook
- [ ] Add staged file detection and filtering
- [ ] Implement quick validation pipeline
- [ ] Add recipe-specific validation for .md files

### Files to Modify

- [ ] `.husky/pre-commit` - Enhanced with utility functions

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

## Overall Progress

- **Completed**: 5/8 tasks (62.5%)
- **In Progress**: 0/8 tasks (0%)
- **Pending**: 3/8 tasks (37.5%)

### Next Steps

1. ✅ Task 3.0: Enhanced Pre-push Hook - COMPLETED
2. ✅ Task 4.0: Cross-Project Validation Script - COMPLETED
3. ✅ Task 4.1: Recipe Builder Runtime Verification in Pre-commit Hook - COMPLETED
4. 🔄 Task 5.0: Pre-commit Hook Enhancement - NEXT
5. 🔄 Task 6.0: Post-merge Hook Implementation
6. 🔄 Task 7.0: Documentation and Testing
