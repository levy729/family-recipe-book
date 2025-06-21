# Product Requirements Document: Web-Based Recipe Builder

## Introduction/Overview

The Web-Based Recipe Builder is a standalone local tool designed to simplify the creation and editing of recipes for the Family Recipe Book. The current process of manually writing recipes in markdown with YAML frontmatter and Hebrew text is complex and frustrating, especially when dealing with Hebrew RTL input in standard text editors. This tool will provide an intuitive, Hebrew-friendly interface for recipe creation and editing, saving time and reducing frustration for technical users.

**Problem**: Creating and editing recipes manually requires dealing with complex Hebrew text input, YAML formatting, and markdown syntax, leading to frustration and time waste.

**Goal**: Provide a user-friendly, Hebrew-optimized interface for creating and editing recipes that saves time and eliminates the complexity of manual recipe creation.

## Goals

1. **Simplify Recipe Creation**: Reduce the time and effort required to create new recipes by 80%
2. **Improve Hebrew Input Experience**: Provide seamless Hebrew RTL text input without editor complications
3. **Enable Recipe Editing**: Allow easy editing of existing recipes with the same interface
4. **Maintain Data Integrity**: Ensure all generated recipes follow the established `RECIPE_FORMAT.md` structure
5. **Local-First Approach**: Run entirely locally without requiring external services or internet connectivity
6. **Git-Safe Operations**: Save directly to the recipes folder, allowing manual git operations for version control

## User Stories

### Primary User Stories

- **As a recipe creator**, I want to easily input Hebrew text so that I can create recipes without dealing with complex editor issues.
- **As a recipe creator**, I need to be able to easily edit existing recipes so that I can update and improve recipes over time.
- **As a recipe creator**, I can save a recipe into the main website (locally on my machine) and then review the changes, commit and push them so that I maintain full control over version control.

### Secondary User Stories

- **As a recipe creator**, I want to preview how my recipe will look before saving so that I can ensure proper formatting.
- **As a recipe creator**, I want to use predefined tags and templates so that I can quickly create common recipe types.
- **As a recipe creator**, I want validation of required fields so that I don't create invalid recipes.

## Functional Requirements

### 1. Recipe Creation

1.1. The system must provide a form interface for creating new recipes with Hebrew RTL support.
1.2. The system must include input fields for all required recipe metadata (title, slug, tags, ingredients, instructions).
1.3. The system must auto-generate a slug from the Hebrew title if not provided.
1.4. The system must provide a tag selection interface with predefined Hebrew tags.
1.5. The system must allow dynamic addition and removal of ingredients.
1.6. The system must allow step-by-step instruction input with automatic numbering.

### 2. Recipe Editing

2.1. The system must allow loading and editing of existing recipe files.
2.2. The system must preserve all existing recipe data when editing.
2.3. The system must provide a file browser to select existing recipes for editing.

### 3. Hebrew Text Support

3.1. The system must provide proper RTL (right-to-left) text input for Hebrew content.
3.2. The system must handle Hebrew characters correctly in all input fields.
3.3. The system must display Hebrew text properly in preview mode.

### 4. Preview and Validation

4.1. The system must provide real-time preview of the recipe as it will appear on the website.
4.2. The system must validate required fields (title, slug) before allowing save.
4.3. The system must validate YAML syntax and markdown formatting.
4.4. The system must show validation errors clearly to the user.

### 5. File Operations

5.1. The system must save recipes directly to the `/recipes/` folder in the project.
5.2. The system must overwrite existing files when saving (relying on git for backup).
5.3. The system must generate properly formatted markdown files following `RECIPE_FORMAT.md`.
5.4. The system must handle file encoding properly (UTF-8 for Hebrew text).

### 6. Templates and Presets

6.1. The system must provide recipe templates for common types (main dish, side dish, dessert, etc.).
6.2. The system must include predefined Hebrew tags for easy selection.
6.3. The system must allow saving and loading of custom templates.

### 7. User Interface

7.1. The system must follow the same design principles as the main website (zinc theme, shadcn/ui).
7.2. The system must be responsive and work on desktop and tablet devices.
7.3. The system must provide clear navigation between creation, editing, and preview modes.

## Non-Goals (Out of Scope)

- **Git Integration**: The tool will not commit or push changes automatically
- **Remote Operations**: The tool will not connect to external services or require internet
- **Recipe Publishing**: The tool will not deploy or publish recipes to a live website
- **Image Handling**: The tool will not handle recipe images or media files
- **Collaboration**: The tool will not support multiple users or real-time collaboration
- **Recipe Import**: The tool will not import recipes from external sources or websites
- **Advanced Search**: The tool will not include recipe search or filtering capabilities

## Design Considerations

### UI/UX Requirements

- **Consistent Design**: Use the same design system as the main website (shadcn/ui, zinc color palette)
- **Hebrew RTL Support**: All text inputs and displays must support proper RTL layout
- **Responsive Design**: Interface must work well on desktop and tablet devices
- **Accessibility**: Follow basic accessibility guidelines for keyboard navigation and screen readers

### Layout Structure

- **Form Layout**: Clean, organized form with logical grouping of fields
- **Preview Panel**: Side-by-side or toggle view of form and preview
- **Navigation**: Clear tabs or sections for Create, Edit, and Preview modes

## Technical Considerations

### Technology Stack

- **Framework**: Next.js (consistent with main project)
- **Styling**: Tailwind CSS + shadcn/ui components
- **File System**: Node.js fs module for local file operations
- **Validation**: YAML and markdown validation libraries

### Dependencies

- **Existing Dependencies**: Leverage already installed packages from main project
- **New Dependencies**: Minimize additional dependencies, prefer existing solutions

### File Structure

- **Location**: `/recipe-builder/` directory within the main project
- **Build Process**: Separate build process from main website
- **Port**: Run on different port (e.g., 3002) to avoid conflicts

### Testing Requirements

- **Unit Tests**: Test recipe parsing, validation, and file operations
- **Integration Tests**: Test end-to-end recipe creation and editing workflow
- **Hebrew Text Tests**: Ensure proper handling of Hebrew characters and RTL

## Success Metrics

### Primary Metrics

- **Time Savings**: Reduce recipe creation time from 15-20 minutes to 3-5 minutes
- **User Satisfaction**: Eliminate frustration with Hebrew text input and YAML formatting
- **Error Reduction**: Reduce recipe formatting errors by 90%

### Secondary Metrics

- **Adoption Rate**: Tool usage for 100% of new recipe creation
- **Edit Frequency**: Increased recipe editing and improvement due to ease of use
- **Maintenance**: Reduced time spent fixing recipe formatting issues

## Open Questions

1. **Error Handling**: How should the tool handle file system errors (permissions, disk space, etc.)?
2. **Backup Strategy**: Should the tool create automatic backups before overwriting files?
3. **Template Management**: How should users manage and organize custom templates?
4. **Validation Strictness**: How strict should the validation be for optional fields?
5. **Performance**: What is the acceptable load time for the tool with large recipe files?
6. **Browser Compatibility**: Which browsers should be supported for the local tool?

## Implementation Phases

### Phase 1: Basic Recipe Creation

- Form interface with Hebrew RTL support
- Basic validation and preview
- File saving functionality
- Core UI components

### Phase 2: Recipe Editing

- File loading and editing capabilities
- Enhanced validation
- Template system

### Phase 3: Advanced Features

- Custom templates
- Enhanced preview modes
- Performance optimizations
- Comprehensive testing

## Acceptance Criteria

### Must Have

- [ ] User can create a new recipe with Hebrew title and content
- [ ] User can edit an existing recipe file
- [ ] Tool saves recipes in correct markdown format following `RECIPE_FORMAT.md`
- [ ] All Hebrew text displays and inputs correctly with RTL support
- [ ] Tool validates required fields and shows clear error messages
- [ ] Tool provides real-time preview of recipe formatting
- [ ] Tool runs locally without external dependencies
- [ ] Tool includes comprehensive test coverage

### Should Have

- [ ] Template system for common recipe types
- [ ] Auto-generation of slugs from Hebrew titles
- [ ] Enhanced preview with styling similar to main website
- [ ] File browser for selecting existing recipes

### Nice to Have

- [ ] Custom template creation and management
- [ ] Batch recipe editing capabilities
- [ ] Advanced validation rules
- [ ] Performance optimizations for large recipe files
