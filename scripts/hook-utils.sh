#!/usr/bin/env sh

# Git Hooks Utility Functions
# Provides shared functionality for pre-commit and pre-push hooks

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Global variables
ORIGINAL_DIR=""
CURRENT_PHASE=""
CURRENT_PROJECT=""

# Save the original working directory
save_working_directory() {
    ORIGINAL_DIR=$(pwd)
    echo "📁 Saved working directory: $ORIGINAL_DIR"
}

# Restore the original working directory
restore_working_directory() {
    if [ -n "$ORIGINAL_DIR" ]; then
        cd "$ORIGINAL_DIR"
        echo "📁 Restored working directory: $ORIGINAL_DIR"
    fi
}

# Set current phase for better error reporting
set_phase() {
    CURRENT_PHASE="$1"
    echo "🔄 Phase: $CURRENT_PHASE"
}

# Set current project for better error reporting
set_project() {
    CURRENT_PROJECT="$1"
    echo "📦 Project: $CURRENT_PROJECT"
}

# Print success message
print_success() {
    printf "${GREEN}✅ %s${NC}\n" "$1"
}

# Print warning message
print_warning() {
    printf "${YELLOW}⚠️  %s${NC}\n" "$1"
}

# Print error message
print_error() {
    printf "${RED}❌ %s${NC}\n" "$1"
}

# Print info message
print_info() {
    printf "${BLUE}ℹ️  %s${NC}\n" "$1"
}

# Print progress message
print_progress() {
    printf "${BLUE}🔄 %s${NC}\n" "$1"
}

# Enhanced progress indicators and messaging
print_phase_start() {
    echo ""
    printf "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    printf "${BLUE}🔄 Phase: %s${NC}\n" "$1"
    printf "${BLUE}📦 Project: %s${NC}\n" "$2"
    printf "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    echo ""
}

print_phase_success() {
    echo ""
    printf "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    printf "${GREEN}✅ Phase Completed Successfully: %s${NC}\n" "$1"
    printf "${GREEN}📦 Project: %s${NC}\n" "$2"
    printf "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    echo ""
}

print_phase_failure() {
    echo ""
    printf "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    printf "${RED}❌ Phase Failed: %s${NC}\n" "$1"
    printf "${RED}📦 Project: %s${NC}\n" "$2"
    printf "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    echo ""
}

print_step_progress() {
    local step_number=$1
    local total_steps=$2
    local description="$3"
    printf "${BLUE}📋 Step %s/%s: %s${NC}\n" "$step_number" "$total_steps" "$description"
}

print_step_success() {
    local step_number=$1
    local total_steps=$2
    local description="$3"
    printf "${GREEN}✅ Step %s/%s: %s completed${NC}\n" "$step_number" "$total_steps" "$description"
}

print_step_failure() {
    local step_number=$1
    local total_steps=$2
    local description="$3"
    printf "${RED}❌ Step %s/%s: %s failed${NC}\n" "$step_number" "$total_steps" "$description"
}

print_hook_summary() {
    local hook_name="$1"
    local total_phases="$2"
    local successful_phases="$3"
    local failed_phases="$4"
    
    echo ""
    printf "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    printf "${BLUE}📊 %s Summary${NC}\n" "$hook_name"
    printf "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    printf "${BLUE}📋 Total Phases: %s${NC}\n" "$total_phases"
    printf "${GREEN}✅ Successful: %s${NC}\n" "$successful_phases"
    if [ "$failed_phases" -gt 0 ]; then
        printf "${RED}❌ Failed: %s${NC}\n" "$failed_phases"
    fi
    printf "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    echo ""
}

# Handle errors with clear messaging
handle_error() {
    local exit_code=$1
    local message="$2"
    local recovery_steps="$3"
    
    print_error "Phase '$CURRENT_PHASE' failed in project '$CURRENT_PROJECT'"
    print_error "$message"
    
    if [ -n "$recovery_steps" ]; then
        print_info "Recovery steps:"
        echo "$recovery_steps"
    fi
    
    restore_working_directory
    exit "$exit_code"
}

# Handle specific error types with tailored messages
handle_typescript_error() {
    local project_path="$1"
    local error_details="$2"
    
    local recovery_steps="
1. Fix TypeScript errors in the files listed above
2. Run 'npx tsc --noEmit' to verify fixes
3. Stage the fixed files: 'git add <fixed-files>'
4. Try committing again"
    
    handle_error 1 "TypeScript compilation failed in $project_path: $error_details" "$recovery_steps"
}

handle_lint_error() {
    local project_path="$1"
    local error_details="$2"
    
    local recovery_steps="
1. Fix ESLint errors in the files listed above
2. Run 'npm run lint' to verify fixes
3. Stage the fixed files: 'git add <fixed-files>'
4. Try committing again"
    
    handle_error 1 "Linting failed in $project_path: $error_details" "$recovery_steps"
}

handle_format_error() {
    local project_path="$1"
    local error_details="$2"
    
    local recovery_steps="
1. Run 'npm run format' to auto-fix formatting issues
2. Stage the formatted files: 'git add <formatted-files>'
3. Try committing again"
    
    handle_error 1 "Code formatting failed in $project_path: $error_details" "$recovery_steps"
}

handle_recipe_error() {
    local project_path="$1"
    local error_details="$2"
    
    local recovery_steps="
1. Fix recipe format errors shown above
2. Ensure YAML frontmatter is properly formatted
3. Check that title and slug fields are present and valid
4. Verify slug contains only lowercase letters, numbers, and hyphens
5. Stage the fixed files: 'git add <fixed-files>'
6. Try committing again"
    
    handle_error 1 "Recipe validation failed in $project_path: $error_details" "$recovery_steps"
}

handle_test_error() {
    local project_path="$1"
    local error_details="$2"
    
    local recovery_steps="
1. Fix failing tests in $project_path
2. Run 'npm test' to verify all tests pass
3. Stage the fixed files: 'git add <fixed-files>'
4. Try committing again"
    
    handle_error 1 "Tests failed in $project_path: $error_details" "$recovery_steps"
}

handle_build_error() {
    local project_path="$1"
    local error_details="$2"
    
    local recovery_steps="
1. Fix build errors in $project_path
2. Run 'npm run build' to verify the build succeeds
3. Stage the fixed files: 'git add <fixed-files>'
4. Try committing again"
    
    handle_error 1 "Build failed in $project_path: $error_details" "$recovery_steps"
}

# Enhanced command runner with specific error handling
run_command_with_error_handling() {
    local command="$1"
    local description="$2"
    local error_type="$3"
    local project_path="$4"
    
    print_progress "$description"
    
    if ! eval "$command"; then
        case "$error_type" in
            "typescript")
                handle_typescript_error "$project_path" "Command failed: $command"
                ;;
            "lint")
                handle_lint_error "$project_path" "Command failed: $command"
                ;;
            "format")
                handle_format_error "$project_path" "Command failed: $command"
                ;;
            "recipe")
                handle_recipe_error "$project_path" "Command failed: $command"
                ;;
            "test")
                handle_test_error "$project_path" "Command failed: $command"
                ;;
            "build")
                handle_build_error "$project_path" "Command failed: $command"
                ;;
            *)
                handle_error 1 "Command failed: $command" "Fix the issue and try again"
                ;;
        esac
    fi
    
    print_success "$description completed"
}

# Check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Run a command with error handling
run_command() {
    local command="$1"
    local description="$2"
    local recovery_steps="$3"
    
    print_progress "$description"
    
    if ! eval "$command"; then
        handle_error 1 "Command failed: $command" "$recovery_steps"
    fi
    
    print_success "$description completed"
}

# Check if we're in a git repository
check_git_repository() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not in a git repository"
        exit 1
    fi
}

# Get staged files for a specific project
get_staged_files() {
    local project_path="$1"
    local file_pattern="$2"
    
    if [ -n "$project_path" ] && [ "$project_path" != "." ]; then
        git diff --cached --name-only --diff-filter=ACM | grep "^$project_path/$file_pattern" || true
    else
        git diff --cached --name-only --diff-filter=ACM | grep "$file_pattern" || true
    fi
}

# Check if there are any staged files
has_staged_files() {
    local project_path="$1"
    local file_pattern="$2"
    
    local staged_files
    staged_files=$(get_staged_files "$project_path" "$file_pattern")
    
    [ -n "$staged_files" ]
}

# Get staged files by type for efficient processing
get_staged_files_by_type() {
    local project_path="$1"
    local file_type="$2"
    
    case "$file_type" in
        "typescript")
            get_staged_files "$project_path" "\.(ts|tsx)$"
            ;;
        "javascript")
            get_staged_files "$project_path" "\.(js|jsx)$"
            ;;
        "styles")
            get_staged_files "$project_path" "\.(css|scss|sass)$"
            ;;
        "recipes")
            get_staged_files "$project_path" "\.md$"
            ;;
        "config")
            get_staged_files "$project_path" "\.(json|yaml|yml|toml)$"
            ;;
        "all")
            get_staged_files "$project_path" ".*"
            ;;
        *)
            print_warning "Unknown file type: $file_type"
            return 1
            ;;
    esac
}

# Check if there are staged files by type
has_staged_files_by_type() {
    local project_path="$1"
    local file_type="$2"
    
    local staged_files
    staged_files=$(get_staged_files_by_type "$project_path" "$file_type")
    
    [ -n "$staged_files" ]
}

# Get unique staged file extensions for a project
get_staged_file_extensions() {
    local project_path="$1"
    
    git diff --cached --name-only --diff-filter=ACM | \
    grep "^$project_path/" | \
    sed 's/.*\.//' | \
    sort | \
    uniq || true
}

# Check if staged files need specific validation
needs_typescript_validation() {
    has_staged_files_by_type "$1" "typescript"
}

needs_recipe_validation() {
    has_staged_files_by_type "$1" "recipes"
}

needs_style_validation() {
    has_staged_files_by_type "$1" "styles"
}

needs_config_validation() {
    has_staged_files_by_type "$1" "config"
}

# Get summary of staged files for logging
get_staged_files_summary() {
    local project_path="$1"
    
    local total_files
    local typescript_files
    local recipe_files
    local style_files
    local config_files
    
    total_files=$(get_staged_files "$project_path" ".*" | wc -l | tr -d ' ')
    typescript_files=$(get_staged_files_by_type "$project_path" "typescript" | wc -l | tr -d ' ')
    recipe_files=$(get_staged_files_by_type "$project_path" "recipes" | wc -l | tr -d ' ')
    style_files=$(get_staged_files_by_type "$project_path" "styles" | wc -l | tr -d ' ')
    config_files=$(get_staged_files_by_type "$project_path" "config" | wc -l | tr -d ' ')
    
    echo "Total: $total_files, TypeScript: $typescript_files, Recipes: $recipe_files, Styles: $style_files, Config: $config_files"
}

# Initialize hook utilities
init_hook_utils() {
    save_working_directory
    check_git_repository
    print_info "Git hooks utilities initialized"
}

# Cleanup hook utilities
cleanup_hook_utils() {
    restore_working_directory
    print_success "Git hooks utilities cleanup completed"
}

# Trap to ensure cleanup on exit
trap cleanup_hook_utils EXIT

# Run TypeScript type checking for staged files
run_typescript_check() {
    local project_path="$1"
    local tsconfig_path="$2"
    
    print_progress "Running TypeScript type checking for staged files in $project_path..."
    
    # Get staged TypeScript files
    local staged_ts_files
    staged_ts_files=$(get_staged_files_by_type "$project_path" "typescript")
    
    if [ -z "$staged_ts_files" ]; then
        print_info "No TypeScript files staged in $project_path"
        return 0
    fi
    
    print_info "Staged TypeScript files:"
    echo "$staged_ts_files" | sed 's/^/  - /'
    
    # Run TypeScript compiler with specific files
    if [ -n "$tsconfig_path" ]; then
        # Use specific tsconfig file - run full type check for now
        # TODO: Optimize to check only staged files when possible
        npx tsc --noEmit --project "$tsconfig_path"
    else
        # Use default tsconfig.json
        npx tsc --noEmit
    fi
    
    print_success "TypeScript type checking passed for $project_path"
}

# Check TypeScript configuration
check_typescript_config() {
    local project_path="$1"
    local tsconfig_path="$2"
    
    if [ ! -f "$tsconfig_path" ]; then
        print_error "TypeScript configuration not found: $tsconfig_path"
        return 1
    fi
    
    print_info "Using TypeScript config: $tsconfig_path"
    return 0
}

# Run recipe validation for staged files
run_recipe_validation() {
    local project_path="$1"
    
    print_progress "Running recipe validation for staged files in $project_path..."
    
    # Get staged recipe files
    local staged_recipe_files
    staged_recipe_files=$(get_staged_files_by_type "$project_path" "recipes")
    
    if [ -z "$staged_recipe_files" ]; then
        print_info "No recipe files staged in $project_path"
        return 0
    fi
    
    print_info "Staged recipe files:"
    echo "$staged_recipe_files" | sed 's/^/  - /'
    
    # Run recipe validation script
    if ! node scripts/validate-recipes.js; then
        handle_error 1 "Recipe validation failed" "Fix the recipe format errors shown above and try again"
    fi
    
    print_success "Recipe validation passed for $project_path"
} 