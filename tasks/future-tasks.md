# Future Tasks

These tasks should be completed when convenient, but are not blocking for current development.

## Documentation Organization

### Task: Organize All Documentation Under a Single Directory

**Problem**: Documentation files are scattered throughout the project root.

**Solution**: Create a `docs/` directory and organize all documentation files there, keeping only `README.md` in the root.

**Proposed Structure**:

```
family-recipe-book/
├── README.md                    # Keep in root (project overview)
├── docs/
│   ├── recipe-format.md         # Recipe file format specification
│   ├── rules.md                 # Project rules and guidelines
│   ├── deployment.md            # Deployment instructions
│   ├── recipe-builder-sync.md   # Recipe builder sync system
│   ├── processes/
│   │   ├── create-prd.md        # PRD creation process (DO NOT MODIFY)
│   │   ├── generate-tasks.md    # Task generation process (DO NOT MODIFY)
│   │   └── process-task-list.md # Task list processing (DO NOT MODIFY)
│   └── README.md                # Documentation index
```

**Files to Move**:

- `RECIPE_FORMAT.md` → `docs/recipe-format.md`
- `RULES.md` → `docs/rules.md`
- `DEPLOYMENT.md` → `docs/deployment.md`
- `RECIPE_BUILDER_SYNC.md` → `docs/recipe-builder-sync.md`
- `create-prd.mdc` → `docs/processes/create-prd.md` (DO NOT MODIFY)
- `generate-tasks.mdc` → `docs/processes/generate-tasks.md` (DO NOT MODIFY)
- `process-task-list.mdc` → `docs/processes/process-task-list.md` (DO NOT MODIFY)

**Files to Update**:

- `scripts/sync-recipe-builder.js` - Update documentation reference
- `package.json` - Update any documentation references
- Any other files that link to documentation

**Priority**: Low - Can be done when convenient

## Attribution and Licensing

### Task: Add Attribution to AI Dev Tasks

**Problem**: We used ideas and concepts from the [AI Dev Tasks](https://github.com/snarktank/ai-dev-tasks) project but haven't properly attributed it.

**Solution**: Add proper attribution in README.md and documentation.

**Implementation**:

1. Add attribution section to README.md
2. Reference the original project in documentation
3. Credit the workflow concepts and .mdc file structure

**Reference**: [https://github.com/snarktank/ai-dev-tasks](https://github.com/snarktank/ai-dev-tasks)

**Priority**: Medium - Should be done soon for proper attribution

### Task: Add License to Repository

**Problem**: This is a public repository without a license, which creates uncertainty about usage rights.

**Solution**: Add an appropriate license file.

**Recommended License**: **MIT License** - Most suitable because:

- Simple and permissive
- Allows commercial use
- Requires attribution
- Compatible with most other licenses
- Standard for personal/family projects
- Not "open source" in the traditional sense, but clarifies usage rights

**Alternative Options**:

- **Apache 2.0** - More comprehensive, includes patent protection
- **GPL-3.0** - Copyleft, requires derivative works to be open source
- **CC BY-NC-SA 4.0** - Creative Commons, non-commercial use only

**Implementation**:

1. Create `LICENSE` file with MIT License
2. Add license badge to README.md
3. Update package.json with license field
4. Add license information to documentation

**Priority**: Medium - Should be done soon for legal clarity

## Implementation Notes

### Protected Files (DO NOT MODIFY)

The following files are from the AI Dev Tasks project and should not be modified:

- `create-prd.mdc`
- `generate-tasks.mdc`
- `process-task-list.mdc`

These files should be moved to `docs/processes/` but their content should remain unchanged.

### Benefits of These Tasks

1. **Better Organization** - Cleaner project structure
2. **Proper Attribution** - Credit where credit is due
3. **Legal Clarity** - Clear usage rights for public repository
4. **Professional Standards** - Follows open source best practices

### When to Complete

- **Documentation Organization**: When convenient, non-blocking
- **Attribution**: Soon, for proper credit
- **Licensing**: Soon, for legal clarity

These tasks can be completed in any order and are independent of current development work.
