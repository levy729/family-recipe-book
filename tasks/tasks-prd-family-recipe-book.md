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
- `app/recipe/[slug]/page.tsx` - Dynamic recipe page
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
- `components/tags.tsx` - Shared tags component, now a client component for clickable tags
- `app/layout.tsx` - Root layout, removed justify-center from main tag

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- All styles will be component-level using Tailwind CSS classes, no global.css except for basic resets and RTL support.
- The recipe page crash was fixed by making the Tags component a client component.

## Tasks

- [x] 1.0 Project Setup and Configuration

  - [x] 1.1 Initialize Next.js project with TypeScript
  - [x] 1.2 Install and configure Tailwind CSS
  - [x] 1.3 Set up shadcn/ui with Zinc theme
  - [x] 1.4 Configure Prettier for code formatting
  - [x] 1.5 Configure ESLint for TypeScript
  - [x] 1.6 Set up Next.js for static export
  - [x] 1.7 Configure RTL support in layout

- [x] 2.0 Core Infrastructure and Data Layer

  - [x] 2.1 Create recipe markdown file structure and sample recipes
  - [x] 2.2 Implement recipe parsing utilities (YAML frontmatter + markdown)
  - [x] 2.3 Create recipe data loading functions
  - [x] 2.4 Implement session storage utilities for ingredient checkboxes
  - [x] 2.5 Add TypeScript interfaces for recipe data structure

- [x] 3.0 UI Components and Layout

  - [x] 3.1 Create root layout with RTL support and Zinc theme
  - [x] 3.2 Build search bar component with real-time input
  - [x] 3.3 Create recipe card component for search results
  - [x] 3.4 Build ingredient list component with checkboxes
  - [x] 3.5 Implement responsive design for mobile, tablet, desktop

- [x] 4.0 Search Functionality

  - [x] 4.1 Install and configure Fuse.js
  - [x] 4.2 Implement search logic for Hebrew text
  - [x] 4.3 Create search results page with card layout
  - [x] 4.4 Add "no results" message handling
  - [x] 4.5 Implement real-time search with debouncing

- [x] 5.0 Recipe Pages and Content Display

  - [x] 5.1 Create dynamic recipe page with [slug] routing
  - [x] 5.2 Implement recipe content rendering with RTL support
  - [x] 5.3 Add ingredient checklist with session storage persistence
  - [x] 5.4 Create custom 404 page for invalid recipe URLs
  - [x] 5.5 Implement homepage with search bar and 6 recent recipes

- [x] 6.0 Enhanced Search & Navigation

  - [x] 6.1 Live search on homepage (real-time results as you type)
  - [x] 6.2 Clickable tags that navigate to search results
  - [x] 6.3 Search history/suggestions dropdown
  - [x] 6.4 Add search box to search results page

- [ ] 7.0 Ingredient Management

  - [x] 7.1 Add "Clear All" and "Select All" buttons for ingredient checkboxes (interchangeable based on state)
  - [x] 7.2 Copy ingredient list to clipboard or share via Web Share API
  - [x] 7.3 Save ingredient state across browser sessions (localStorage)

- [x] 8.0 Recipe Instructions & Progress

  - [x] 8.1 Auto-number instructions with larger font numbers
  - [x] 8.2 Track progress of instructions (clickable steps with visual feedback)
  - [x] 8.3 Simplified instruction progress (temporary, resets on page reload)

- [ ] 9.0 UI/UX Enhancements

  - [x] 9.1 Font size controls with persistent localStorage
  - [x] 9.2 Redesign recipe page back button (arrow on left side)
  - [x] 9.3 Make tags clickable on recipe pages
  - [x] 9.4 Remove border radius from elements with backgrounds
  - [x] 9.5 Redesign tag styles (suggest new design)
  - [x] 9.6 Add borders/lines to recipe page for better UI separation
  - [x] 9.7 Add minimalist icons (plan and get approval first - consider Font Awesome vs other options)
  - [x] 9.8 Smooth transitions and micro-interactions
    - [x] 9.8.1 Enhanced recipe card hover animations (subtle scale effect)
    - [x] 9.8.2 Add font size controls to all pages (not just recipe page)
    - [x] 9.8.3 Add back to home page button on all pages (except homepage)
    - [x] 9.8.4 Enhanced search bar focus animations
    - [x] 9.8.5 Staggered animations for search results
    - [x] 9.8.6 Enhanced tag hover animations
    - [x] 9.8.7 Enhanced ingredient checkbox animations
    - [x] 9.8.8 Enhanced instruction step animations
    - [x] 9.8.9 Make search box bigger
  - [ ] 9.9 Cooking time display

- [x] 10.0 Social & Sharing

  - [x] 10.1 Web Share API integration for recipe pages
  - [x] 10.2 Copy recipe link to clipboard (covered by Web Share API fallback)

- [ ] 11.0 Project Configuration

  - [x] 11.1 Create rules file for persistent project rules and guidelines
  - [ ] 11.2 Document coding standards and conventions

- [ ] 12.0 Deployment and Polish

  - [ ] 12.1 Set up GitHub Actions workflow for auto-deploy
  - [ ] 12.2 Configure GitHub Pages deployment
  - [ ] 12.3 Test responsive design across devices
  - [ ] 12.4 Optimize performance and loading times
  - [ ] 12.5 Final testing and bug fixes

## Future Enhancements (TODOs)

- Recipe ingredient quantity scaling (2x, 3x servings)
- Recipe difficulty indicators
- Recipe favorites/bookmarking
- Social media sharing buttons
- Recipe categories/filtering
- Most viewed recipes tracking
- Recipe search by cooking time
- Lazy loading for recipe images
- Keyboard accessibility improvements
- Screen reader support
- PWA capabilities (offline support)

## Code Review Checklist

Before committing code:
- [ ] TypeScript compilation passes
- [ ] ESLint passes with no errors
- [ ] Prettier formatting applied
- [ ] RTL layout tested
- [ ] Responsive design tested
- [ ] No console errors
- [ ] Build process completes successfully
- [ ] Ask for approval before committing
