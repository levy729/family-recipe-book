# Analytics & SEO Integration - Task List

Based on PRD: `prd-analytics-seo-integration.md`

## Relevant Files

- `lib/analytics.ts` - Analytics configuration and tracking functions
- `lib/analytics.test.ts` - Unit tests for analytics functions
- `lib/seo.ts` - SEO utilities and structured data generation
- `lib/seo.test.ts` - Unit tests for SEO utilities
- `app/sitemap.ts` - Dynamic sitemap generation
- `app/sitemap.test.ts` - Unit tests for sitemap generation
- `public/robots.txt` - Search engine crawling instructions
- `components/analytics-provider.tsx` - Analytics context provider
- `components/analytics-provider.test.tsx` - Unit tests for analytics provider
- `app/layout.tsx` - Add analytics and SEO meta tags
- `app/recipe/[slug]/page.tsx` - Add recipe-specific SEO
- `app/recipes/page.tsx` - Add recipes page SEO
- `app/search/page.tsx` - Add search page SEO
- `next.config.js` - Add analytics configuration
- `package.json` - Add analytics dependencies
- `.env.example` - Example environment variables
- `.github/workflows/deploy.yml` - Update deployment with analytics setup
- `types/gtag.d.ts` - TypeScript definitions for Google Analytics gtag

### Notes

- Unit tests should typically be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- Analytics will only be active in production environment
- All secrets must be stored in GitHub Secrets, not in the repository
- SEO features must work with static site generation for GitHub Pages

## Tasks

- [ ] 1.0 Google Analytics 4 Setup and Configuration

  - [x] 1.1 Install Google Analytics dependencies (gtag, @types/gtag)
  - [ ] 1.2 Create analytics configuration file (lib/analytics.ts)
  - [ ] 1.3 Set up environment variables for GA4 Measurement ID
  - [ ] 1.4 Create analytics provider component for React context
  - [ ] 1.5 Configure production-only analytics activation
  - [ ] 1.6 Add analytics script to app layout
  - [ ] 1.7 Test analytics configuration in development mode
  - [ ] 1.8 Write unit tests for analytics configuration

- [ ] 2.0 SEO Foundation Implementation

  - [ ] 2.1 Create SEO utilities file (lib/seo.ts) for meta tag generation
  - [ ] 2.2 Implement basic meta tags (title, description, keywords)
  - [ ] 2.3 Add Open Graph tags (og:title, og:description, og:image)
  - [ ] 2.4 Update app layout with default SEO meta tags
  - [ ] 2.5 Add recipe-specific SEO to recipe pages
  - [ ] 2.6 Add SEO meta tags to recipes discovery page
  - [ ] 2.7 Add SEO meta tags to search page
  - [ ] 2.8 Test SEO meta tags with browser developer tools
  - [ ] 2.9 Write unit tests for SEO utilities

- [ ] 3.0 Analytics Tracking and Custom Events

  - [ ] 3.1 Implement page view tracking for all routes
  - [ ] 3.2 Add custom event tracking for recipe views
  - [ ] 3.3 Add custom event tracking for search queries
  - [ ] 3.4 Add custom event tracking for ingredient interactions
  - [ ] 3.5 Implement device and browser tracking
  - [ ] 3.6 Add popular recipe tracking functionality
  - [ ] 3.7 Test custom events in development mode
  - [ ] 3.8 Write unit tests for analytics tracking functions
  - [ ] 3.9 Validate analytics data collection in production

- [ ] 4.0 Sitemap and Search Engine Optimization

  - [ ] 4.1 Create dynamic sitemap generation (app/sitemap.ts)
  - [ ] 4.2 Generate XML sitemap with all recipe pages
  - [ ] 4.3 Add sitemap to robots.txt file
  - [ ] 4.4 Implement structured data (JSON-LD) for recipes
  - [ ] 4.5 Add recipe schema markup to recipe pages
  - [ ] 4.6 Test sitemap generation and accessibility
  - [ ] 4.7 Validate structured data with Google's testing tools
  - [ ] 4.8 Write unit tests for sitemap generation
  - [ ] 4.9 Test SEO features with static site generation

- [ ] 5.0 Security and Deployment Configuration
  - [ ] 5.1 Set up GitHub Secrets for GA4 Measurement ID
  - [ ] 5.2 Update deployment workflow to inject analytics ID
  - [ ] 5.3 Create .env.example file with required variables
  - [ ] 5.4 Configure Next.js for analytics integration
  - [ ] 5.5 Test security by ensuring no secrets in build output
  - [ ] 5.6 Validate production-only analytics activation
  - [ ] 5.7 Test deployment with analytics enabled
  - [ ] 5.8 Document analytics setup for future maintenance
  - [ ] 5.9 Create security checklist validation script
