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
    echo -e "${GREEN}✅ $1${NC}"
}

# Print warning message
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Print error message
print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Print info message
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Print progress message
print_progress() {
    echo -e "${BLUE}🔄 $1${NC}"
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