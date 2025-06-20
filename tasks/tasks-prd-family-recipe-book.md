# Task List: Family Recipe Book Website

## Relevant Files

- `package.json` - Project dependencies and scripts
- `next.config.js` - Next.js configuration for static export
- `tailwind.config.js` - Tailwind CSS configuration with shadcn
- `components.json` - shadcn/ui configuration
- `.prettierrc` - Prettier configuration
- `.eslintrc.json` - ESLint configuration
- `app/layout.tsx` - Root layout with RTL support
- `app/page.tsx` - Homepage with search and recent recipes
- `app/search/page.tsx` - Search results page
- `app/recipes/[slug]/page.tsx` - Dynamic recipe page
- `app/not-found.tsx` - Custom 404 page
- `components/ui/` - shadcn/ui components
- `components/search-bar.tsx` - Search input component with component-level styles
- `components/recipe-card.tsx` - Recipe card for search results with component-level styles
- `components/ingredient-list.tsx` - Ingredient checklist component with component-level styles
- `lib/recipes.ts` - Recipe data loading and parsing utilities
- `lib/search.ts` - Fuse.js search functionality
- `lib/storage.ts` - Session storage utilities for ingredient checkboxes
- `recipes/` - Directory containing markdown recipe files
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- All styles will be component-level using Tailwind CSS classes, no global.css except for basic resets and RTL support.

## Tasks

- [ ] 1.0 Project Setup and Configuration

  - [ ] 1.1 Initialize Next.js project with TypeScript
  - [ ] 1.2 Install and configure Tailwind CSS
  - [ ] 1.3 Set up shadcn/ui with Zinc theme
  - [ ] 1.4 Configure Prettier for code formatting
  - [ ] 1.5 Configure ESLint for TypeScript
  - [ ] 1.6 Set up Next.js for static export
  - [ ] 1.7 Configure RTL support in layout

- [ ] 2.0 Core Infrastructure and Data Layer

  - [ ] 2.1 Create recipe markdown file structure and sample recipes
  - [ ] 2.2 Implement recipe parsing utilities (YAML frontmatter + markdown)
  - [ ] 2.3 Create recipe data loading functions
  - [ ] 2.4 Implement session storage utilities for ingredient checkboxes
  - [ ] 2.5 Add TypeScript interfaces for recipe data structure

- [ ] 3.0 UI Components and Layout

  - [ ] 3.1 Create root layout with RTL support and Zinc theme
  - [ ] 3.2 Build search bar component with real-time input
  - [ ] 3.3 Create recipe card component for search results
  - [ ] 3.4 Build ingredient list component with checkboxes
  - [ ] 3.5 Implement responsive design for mobile, tablet, desktop

- [ ] 4.0 Search Functionality

  - [ ] 4.1 Install and configure Fuse.js
  - [ ] 4.2 Implement search logic for Hebrew text
  - [ ] 4.3 Create search results page with card layout
  - [ ] 4.4 Add "no results" message handling
  - [ ] 4.5 Implement real-time search with debouncing

- [ ] 5.0 Recipe Pages and Content Display

  - [ ] 5.1 Create dynamic recipe page with [slug] routing
  - [ ] 5.2 Implement recipe content rendering with RTL support
  - [ ] 5.3 Add ingredient checklist with session storage persistence
  - [ ] 5.4 Create custom 404 page for invalid recipe URLs
  - [ ] 5.5 Implement homepage with search bar and 6 recent recipes

- [ ] 6.0 Deployment and Polish
  - [ ] 6.1 Set up GitHub Actions workflow for auto-deploy
  - [ ] 6.2 Configure GitHub Pages deployment
  - [ ] 6.3 Test responsive design across devices
  - [ ] 6.4 Optimize performance and loading times
  - [ ] 6.5 Final testing and bug fixes
