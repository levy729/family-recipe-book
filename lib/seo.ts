// SEO Utilities for Family Recipe Book
// This file provides SEO meta tag generation, structured data, and optimization functions

import { Recipe } from './recipes';

// SEO Meta Tags Interface
export interface SEOMetaTags {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  robots?: string;
}

// Default SEO configuration
const DEFAULT_SEO = {
  title: 'Family Recipe Book',
  description:
    'A collection of traditional family recipes with Hebrew RTL support',
  keywords: 'family recipes, Hebrew recipes, traditional cooking, RTL recipes',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  robots: 'index, follow',
} as const;

// Generate basic meta tags
export const generateBasicMetaTags = (
  title?: string,
  description?: string,
  keywords?: string
): SEOMetaTags => {
  return {
    title: title || DEFAULT_SEO.title,
    description: description || DEFAULT_SEO.description,
    keywords: keywords || DEFAULT_SEO.keywords,
    ogTitle: title || DEFAULT_SEO.title,
    ogDescription: description || DEFAULT_SEO.description,
    ogType: DEFAULT_SEO.ogType,
    twitterCard: DEFAULT_SEO.twitterCard,
    twitterTitle: title || DEFAULT_SEO.title,
    twitterDescription: description || DEFAULT_SEO.description,
    robots: DEFAULT_SEO.robots,
  };
};

// Generate recipe-specific meta tags
export const generateRecipeMetaTags = (recipe: Recipe): SEOMetaTags => {
  const title = `${recipe.title} - Family Recipe Book`;
  const description =
    recipe.description ||
    `Learn how to make ${recipe.title}, a traditional family recipe.`;
  const keywords = recipe.tags?.join(', ') || DEFAULT_SEO.keywords;

  return {
    title,
    description:
      description.length > 160
        ? description.substring(0, 157) + '...'
        : description,
    keywords,
    ogTitle: title,
    ogDescription: description,
    ogType: 'article',
    ogImage: `/api/og/recipe/${recipe.slug}`, // Future: Open Graph image generation
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: `/api/og/recipe/${recipe.slug}`, // Future: Twitter image generation
    canonical: `https://yourdomain.com/recipe/${recipe.slug}`,
    robots: 'index, follow',
  };
};

// Generate search page meta tags
export const generateSearchMetaTags = (query?: string): SEOMetaTags => {
  const title = query
    ? `Search Results for "${query}" - Family Recipe Book`
    : 'Search Recipes - Family Recipe Book';
  const description = query
    ? `Find recipes matching "${query}" in our family recipe collection.`
    : 'Search through our collection of traditional family recipes.';

  return {
    title,
    description,
    keywords: DEFAULT_SEO.keywords,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: title,
    twitterDescription: description,
    robots: 'noindex, follow', // Search pages shouldn't be indexed
  };
};

// Generate recipes listing page meta tags
export const generateRecipesMetaTags = (): SEOMetaTags => {
  const title = 'All Recipes - Family Recipe Book';
  const description =
    'Browse our complete collection of traditional family recipes with Hebrew RTL support.';

  return {
    title,
    description,
    keywords: DEFAULT_SEO.keywords,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    robots: 'index, follow',
  };
};

// Generate structured data (JSON-LD) for recipes
export const generateRecipeStructuredData = (recipe: Recipe): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    author: {
      '@type': 'Organization',
      name: 'Family Recipe Book',
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    image: `/api/og/recipe/${recipe.slug}`, // Future: Recipe image
    recipeCategory: 'Main Course',
    recipeCuisine: 'Traditional',
    prepTime: 'PT30M', // Placeholder - could be extracted from recipe
    cookTime: 'PT60M', // Placeholder - could be extracted from recipe
    totalTime: 'PT90M', // Placeholder - could be extracted from recipe
    recipeYield: '4 servings', // Placeholder - could be extracted from recipe
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions
      .split('\n')
      .filter(Boolean)
      .map((instruction: string, index: number) => ({
        '@type': 'HowToStep',
        position: index + 1,
        text: instruction,
      })),
    keywords: recipe.tags?.join(', '),
    inLanguage: 'he',
  };
};

// Generate website structured data
export const generateWebsiteStructuredData = (): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Family Recipe Book',
    description: DEFAULT_SEO.description,
    url: 'https://yourdomain.com',
    inLanguage: 'he',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://yourdomain.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
};

// Generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (
  breadcrumbs: Array<{ name: string; url: string }>
): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
};

// SEO utility functions
export const seo = {
  generateBasicMetaTags,
  generateRecipeMetaTags,
  generateSearchMetaTags,
  generateRecipesMetaTags,
  generateRecipeStructuredData,
  generateWebsiteStructuredData,
  generateBreadcrumbStructuredData,
};

export default seo;
