# Family Recipe Book - Project Rules & Guidelines

## Project Overview

A minimalist, publicly accessible family recipe book website with Hebrew RTL content, built with Next.js, shadcn/ui, and deployed on GitHub Pages.

## Core Principles

- **Minimalist Design**: Clean, uncluttered interface with focus on content
- **Hebrew RTL Support**: All content and UI elements support right-to-left layout
- **Static Site**: No backend server, everything works client-side
- **Accessibility**: Public access, responsive design for all devices
- **Performance**: Fast loading, optimized for tablets while cooking

## Design Rules

### Color Scheme

- **Primary Theme**: shadcn/ui with Zinc color palette
- **Colors**: Black, white, gray variations only
- **No bright colors**: Keep it neutral and clean

### Typography

- **Hebrew Fonts**: Clean, readable Hebrew fonts
- **RTL Layout**: All text and components support right-to-left
- **Font Sizes**: Consistent hierarchy, readable on tablets

### Layout

- **Responsive**: Mobile-first approach, tablet and desktop optimized
- **Spacing**: Generous whitespace, clean separation between sections
- **Grid System**: Use Tailwind CSS grid for consistent layouts

## Code Standards

### File Structure

- **Components**: `/components/` directory with clear naming
- **Pages**: `/app/` directory following Next.js 13+ app router
- **Utilities**: `/lib/` directory for shared functions
- **Recipes**: `/recipes/` directory for markdown files

### Naming Conventions

- **Components**: PascalCase (e.g., `RecipeCard.tsx`)
- **Files**: kebab-case for pages, PascalCase for components
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE

### TypeScript

- **Strict Mode**: Always use strict TypeScript
- **Interfaces**: Define clear interfaces for all data structures
- **Types**: Use proper typing, avoid `any`

### CSS/Styling

- **Tailwind CSS**: Use Tailwind classes, avoid custom CSS
- **Component-level**: Styles should be component-specific
- **RTL Support**: Always consider RTL layout in styling

## Content Rules

### Recipe Format

- **Markdown Files**: All recipes as `.md` files with YAML frontmatter
- **Required Fields**: title (Hebrew), slug (English), tags, ingredients, instructions
- **Optional Fields**: content (for future use)
- **Encoding**: UTF-8 for Hebrew text

### Hebrew Content

- **RTL Direction**: All Hebrew text with `dir="rtl"`
- **Proper Encoding**: Ensure Hebrew characters display correctly
- **Consistent Terminology**: Use consistent Hebrew terms throughout

## Functionality Rules

### Search

- **Real-time**: Search should be fast and responsive
- **Hebrew Support**: Full Hebrew text search capability
- **Fuzzy Search**: Use Fuse.js for flexible matching
- **History**: Save search history in localStorage

### Storage

- **Session Storage**: For temporary data (ingredient checkboxes)
- **Local Storage**: For persistent user preferences
- **No Backend**: All data stored client-side

### Navigation

- **Simple Structure**: Homepage, search results, recipe pages
- **Breadcrumbs**: Clear navigation back to homepage
- **URL Structure**: Clean, English-only URLs

## Performance Rules

### Loading

- **Static Generation**: Use Next.js static export
- **Optimized Images**: Compress and optimize any future images
- **Minimal Dependencies**: Keep bundle size small

### Caching

- **Browser Caching**: Leverage browser caching for static assets
- **Search History**: Cache search results appropriately

## Accessibility Rules

### Basic Accessibility

- **Keyboard Navigation**: All interactive elements keyboard accessible
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Ensure sufficient contrast ratios

### RTL Accessibility

- **Proper Direction**: Correct RTL layout for screen readers
- **Navigation**: Logical tab order in RTL context

## Deployment Rules

### GitHub Pages

- **Static Export**: Configure for static site generation
- **Auto-deploy**: Use GitHub Actions for automatic deployment
- **Branch Strategy**: Deploy from main branch

### Build Process

- **Type Checking**: Ensure TypeScript compilation passes
- **Linting**: ESLint and Prettier for code quality
- **Testing**: Build should pass before deployment

## Future Considerations

### Scalability

- **Recipe Management**: Easy to add new recipes via markdown
- **Performance**: Site should remain fast as recipe count grows
- **Maintenance**: Minimal maintenance required

### Feature Additions

- **Icons**: Only add if they improve UX, keep minimal
- **Animations**: Subtle transitions only, no distracting effects
- **Social Features**: Consider carefully, maintain simplicity

## Code Review Checklist

Before committing code:

- [ ] TypeScript compilation passes
- [ ] ESLint passes with no errors
- [ ] Prettier formatting applied
- [ ] RTL layout tested
- [ ] Responsive design tested
- [ ] No console errors
- [ ] Build process completes successfully
- [ ] **ALWAYS ask for approval before committing**
- [ ] **Show implementation summary to user before requesting commit approval**
- [ ] **Only run npm build after major tasks, not sub-tasks**

## Maintenance Rules

### Regular Tasks

- **Dependency Updates**: Keep dependencies up to date
- **Performance Monitoring**: Monitor page load times
- **Content Updates**: Regular recipe additions and updates

### Documentation

- **README**: Keep project README updated
- **Comments**: Add comments for complex logic
- **Changelog**: Document significant changes

---

_This document should be updated as the project evolves and new patterns emerge._

