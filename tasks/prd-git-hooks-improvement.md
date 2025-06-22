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
