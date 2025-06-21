# Recipe Builder Sync System

## Overview

The Recipe Builder is a standalone Next.js application that shares code and configuration with the main Family Recipe Book project. This document explains how the sync system works and how to maintain it.

## How It Works

### Post-Install Script

The sync system uses a post-install script that automatically runs after `npm install`. This ensures that every fresh clone of the repository will have the recipe builder properly set up with the latest shared files.

### Sync Script Location

- **Script**: `scripts/sync-recipe-builder.js`
- **Trigger**: `npm install` (via postinstall script in package.json)
- **Manual Run**: `node scripts/sync-recipe-builder.js`

## Files Synced

### Core Library Files

- `lib/recipes.ts` - Recipe parsing and validation logic
- `lib/search.ts` - Search functionality
- `lib/storage.ts` - Local storage utilities
- `lib/utils.ts` - Utility functions

### Configuration Files

- `tailwind.config.ts` - Tailwind CSS configuration (design system)
- `components.json` - shadcn/ui component configuration

### UI Components

- `components/ui/` - shadcn/ui components (Button, Input, Card, etc.)

### Content Files

- `recipes/` - All recipe markdown files

### Files NOT Synced (Recipe Builder Specific)

- `app/` - Next.js application pages and layout
- `components/` (non-ui) - Recipe builder specific components
- `lib/` (recipe builder specific) - File operations, templates
- `package.json` - Different dependencies
- `next.config.js` - Different configuration (port 3002)
- `tsconfig.json` - TypeScript configuration

## File Structure After Sync

```
family-recipe-book/
├── recipe-builder/           # Created by sync script
│   ├── lib/                  # Copied from main project
│   │   ├── recipes.ts
│   │   ├── search.ts
│   │   ├── storage.ts
│   │   └── utils.ts
│   ├── components/
│   │   └── ui/              # Copied from main project
│   ├── recipes/             # Copied from main project
│   ├── tailwind.config.ts   # Copied from main project
│   ├── components.json      # Copied from main project
│   ├── app/                 # Recipe builder specific
│   ├── components/          # Recipe builder specific
│   ├── lib/                 # Recipe builder specific
│   ├── package.json         # Recipe builder specific
│   ├── next.config.js       # Recipe builder specific
│   └── tsconfig.json        # Recipe builder specific
└── ... (main project files)
```

## Adding New Files to Sync

To add a new file to the sync system:

1. **Update the sync script** (`scripts/sync-recipe-builder.js`):

   ```javascript
   const sourceFiles = [
     // ... existing files
     'path/to/new/file.ts', // Add new file here
   ];
   ```

2. **Test the sync**:

   ```bash
   node scripts/sync-recipe-builder.js
   ```

3. **Commit the changes**:
   ```bash
   git add scripts/sync-recipe-builder.js
   git commit -m "feat: add new-file.ts to recipe builder sync"
   ```

## Removing Files from Sync

To remove a file from the sync system:

1. **Update the sync script** (`scripts/sync-recipe-builder.js`):

   ```javascript
   const sourceFiles = [
     // Remove the file from this array
   ];
   ```

2. **Manually delete from recipe-builder** (if needed):

   ```bash
   rm recipe-builder/path/to/file.ts
   ```

3. **Test and commit**:
   ```bash
   node scripts/sync-recipe-builder.js
   git add scripts/sync-recipe-builder.js
   git commit -m "feat: remove file.ts from recipe builder sync"
   ```

## Troubleshooting

### Sync Script Fails

```bash
# Check if fs-extra is installed
npm list fs-extra

# Reinstall if needed
npm install fs-extra @types/fs-extra --save-dev

# Run sync manually
node scripts/sync-recipe-builder.js
```

### Files Not Syncing

1. **Check file paths** in `scripts/sync-recipe-builder.js`
2. **Verify files exist** in the main project
3. **Check permissions** on recipe-builder directory
4. **Run sync manually** to see detailed output

### TypeScript Errors

1. **Ensure recipe-builder has its own tsconfig.json**
2. **Check import paths** in recipe builder files
3. **Verify copied files** are in the correct locations

### Fresh Clone Issues

1. **Run npm install** to trigger postinstall script
2. **Check if postinstall script** is in package.json
3. **Run sync manually** if needed

## Manual Sync Commands

```bash
# Run sync manually
node scripts/sync-recipe-builder.js

# Force sync (delete and recreate)
rm -rf recipe-builder
node scripts/sync-recipe-builder.js

# Sync specific files only
# Edit scripts/sync-recipe-builder.js and comment out unwanted files
```

## Best Practices

### When to Update Sync Script

- **Adding new shared utilities** to lib/
- **Updating UI components** in components/ui/
- **Adding new configuration** files
- **Changing file structure** in main project

### When NOT to Update Sync Script

- **Recipe builder specific files** (should be created manually)
- **Temporary files** or build artifacts
- **Test files** (recipe builder has its own tests)
- **Development-only files**

### Version Control

- **Commit sync script changes** with clear messages
- **Test sync** after making changes
- **Document changes** in this file
- **Update this documentation** when adding/removing files

## Dependencies

### Required for Sync Script

- `fs-extra` - Enhanced file system operations
- `@types/fs-extra` - TypeScript types

### Installation

```bash
npm install fs-extra @types/fs-extra --save-dev
```

## Future Considerations

### Potential Improvements

1. **Incremental sync** - Only copy changed files
2. **File watching** - Auto-sync on file changes
3. **Conflict resolution** - Handle merge conflicts
4. **Backup system** - Backup before overwriting
5. **Validation** - Verify copied files are valid

### Alternative Approaches

1. **NPM Workspaces** - Monorepo structure
2. **Shared Package** - Extract shared code to separate package
3. **Symlinks** - Link files instead of copying (not recommended for fresh clones)

## Related Files

- `scripts/sync-recipe-builder.js` - Sync script implementation
- `package.json` - Postinstall script configuration
- `tasks/prd-recipe-builder.md` - Recipe builder requirements
- `tasks/tasks-prd-recipe-builder.md` - Implementation tasks
- `RECIPE_FORMAT.md` - Recipe file format specification
