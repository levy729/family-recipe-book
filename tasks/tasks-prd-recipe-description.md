# Task List: Recipe Description Feature

Based on PRD: `tasks/prd-recipe-description.md`

## Relevant Files

- `lib/recipes.ts` - Recipe type definition and parsing logic
- `components/recipe-card.tsx` - Recipe card component for displaying descriptions
- `app/recipe/[slug]/page.tsx` - Recipe page component for displaying descriptions
- `lib/search.ts` - Search functionality to include descriptions
- `RECIPE_FORMAT.md` - Documentation update for new description field
- `recipes/plain-rice.md` - Example recipe to add description to
- `recipes/persian-soup-abgosh.md` - Example recipe to add description to
- `lib/__tests__/recipes.test.ts` - Unit tests for recipe parsing
- `lib/__tests__/search.test.ts` - Unit tests for search functionality

### Notes

- Unit tests should typically be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- All changes must maintain backward compatibility with existing recipes
- **Avoid style changes as much as possible**
- **When style changes are unavoidable, present plan and wait for user approval**

## Tasks

- [x] 1.0 Update Recipe Data Structure and Parsing

  - [x] 1.1 Add description field to Recipe type in lib/recipes.ts
  - [x] 1.2 Update getAllRecipes() to parse description field from YAML
  - [x] 1.3 Add validation for description field (optional, max 200 chars)
  - [x] 1.4 Update unit tests for recipe parsing with description field
  - [x] 1.5 Test backward compatibility with existing recipes

- [x] 2.0 Update Recipe Card Component

  - [x] 2.1 Add description prop to RecipeCard component interface
  - [x] 2.2 Display description below title in existing card layout
  - [x] 2.3 Handle missing description gracefully (no layout changes)
  - [x] 2.4 Test card display with and without descriptions
  - [x] 2.5 Verify no style changes to existing card appearance
  - [x] 2.6 Fix card height consistency with min-height container

- [x] 3.0 Update Recipe Page Component

  - [x] 3.1 Add description display between title and ingredients
  - [x] 3.2 Use existing typography classes for description styling
  - [x] 3.3 Handle missing description gracefully
  - [x] 3.4 Test page layout with and without descriptions
  - [x] 3.5 Verify no style changes to existing page appearance

- [ ] 4.0 Update Search Functionality

  - [x] 4.1 Add description field to search index in lib/search.ts
  - [x] 4.2 Update search weights to include description matches
  - [x] 4.3 Test search functionality with description content
  - [x] 4.4 Verify search performance is not degraded
  - [x] 4.5 Update search unit tests

- [ ] 5.0 Update Documentation and Examples

  - [ ] 5.1 Add description field documentation to RECIPE_FORMAT.md
  - [ ] 5.2 Update example recipes with descriptions
  - [ ] 5.3 Add description field to field descriptions section
  - [ ] 5.4 Update validation section to include description rules
  - [ ] 5.5 Test documentation examples work correctly

- [ ] 6.0 Future Improvements
  - [ ] 6.1 Revisit and enforce code coverage thresholds in Jest config and CI/pre-push hooks once more tests are added
