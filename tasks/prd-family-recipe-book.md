# Product Requirements Document: Family Recipe Book Website

## Introduction/Overview

A minimalist, publicly accessible family recipe book website that preserves and makes family recipes easily accessible. The site will be built with Next.js, deployed on GitHub Pages, and feature Hebrew RTL content with real-time search functionality. The primary use case is having recipes open on tablets while cooking.

## Goals

1. Create a publicly accessible, free-to-host recipe website
2. Provide fast, real-time search across recipe titles, tags, and ingredients
3. Display recipes in a clean, minimalist Hebrew RTL interface
4. Enable easy recipe browsing and ingredient checking
5. Maintain simple content management through markdown files
6. Ensure responsive design for mobile, tablet, and desktop use

## User Stories

1. **As a user**, I can search for recipes by title, tags, or ingredients so that I can quickly find what I'm looking for
2. **As a user**, I can view a list of required ingredients and check off the ones I have so that I can plan my shopping
3. **As a user**, I can view recipes in Hebrew RTL format so that I can read them comfortably
4. **As a user**, I can browse recent recipes on the homepage so that I can discover new recipes
5. **As a user**, I can access the website on my tablet while cooking so that I can follow recipes hands-free

## Functional Requirements

1. **Homepage**: Display search bar and 6 most recent recipes
2. **Search Page**: Real-time search results displayed as small cards
3. **Recipe Page**: Display full recipe content in Hebrew RTL format
4. **Search Functionality**: Real-time search across Hebrew text in titles, tags, and ingredients
5. **Ingredient Checking**: Simple checkbox list with session storage persistence
6. **Responsive Design**: Mobile, tablet, and desktop compatibility
7. **404 Handling**: Custom 404 page for invalid recipe URLs
8. **No Results**: Display appropriate message when search returns no results
9. **Content Management**: Manual markdown file creation with YAML frontmatter
10. **URL Structure**: English-only URLs using manual slug from frontmatter

## Non-Goals (Out of Scope)

- User authentication or user accounts
- Recipe ratings or social features
- Recipe categories or filtering
- Recipe scaling functionality
- Dark mode support
- Accessibility features
- Recipe images
- Print functionality
- Most visited recipes tracking
- Emojis or icons (minimalist design)
- Navigation bar (may be added later)

## Design Considerations

- **Theme**: shadcn with Zinc color palette (black, white, gray)
- **Layout**: RTL for all content areas
- **Typography**: Clean, readable Hebrew fonts
- **Search Results**: Small cards layout
- **Minimalist**: No unnecessary visual elements, focus on content
- **Responsive**: Mobile-first approach with tablet and desktop optimization

## Technical Considerations

- **Framework**: Next.js with TypeScript
- **Search**: Fuse.js for fuzzy search functionality
- **Deployment**: GitHub Pages with GitHub Actions auto-deploy
- **Content**: Markdown files with YAML frontmatter
- **Storage**: No backend server, static site generation
- **State Management**: Session storage for ingredient checkboxes
- **File Structure**: `/recipes/` directory for markdown files

## Success Metrics

1. **Performance**: Page load time under 2 seconds
2. **Search**: Search results appear within 500ms of typing
3. **Usability**: Recipes are easily readable on tablet devices
4. **Maintenance**: Easy to add new recipes via markdown files
5. **Accessibility**: Site is publicly accessible and functional

## Open Questions

1. Should we implement any analytics to track recipe popularity?
2. Do we need any SEO optimization for public discoverability?
3. Should we add any meta tags for social sharing?

## Future Enhancements (TODOs)

- Navigation bar
- Dark mode support
- Recipe categories
- Social features (favorites, ratings)
- Recipe scaling
- Accessibility improvements
- Most visited recipes tracking
- Print functionality
- Recipe images support
- Analytics integration
