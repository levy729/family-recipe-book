// Google Analytics 4 Configuration and Tracking Functions
// This file provides analytics tracking with privacy-first approach and production-only activation

// GA4 Measurement ID - will be injected from environment variables
// Format: G-XXXXXXXXXX (e.g., G-ABC123DEF4)
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Validate GA4 Measurement ID format
const isValidGA4Id = (id: string | undefined): boolean => {
  if (!id) return false;
  // GA4 Measurement ID format: G-XXXXXXXXXX (10 alphanumeric characters after G-)
  return /^G-[A-Z0-9]{10}$/.test(id);
};

// Check if analytics should be enabled (production only)
export const isAnalyticsEnabled = (): boolean => {
  return (
    process.env.NODE_ENV === 'production' && isValidGA4Id(GA_MEASUREMENT_ID)
  );
};

// Get analytics status for debugging
export const getAnalyticsStatus = (): {
  enabled: boolean;
  environment: string;
  hasGA4Id: boolean;
  ga4IdValid: boolean;
} => {
  return {
    enabled: isAnalyticsEnabled(),
    environment: process.env.NODE_ENV || 'development',
    hasGA4Id: !!GA_MEASUREMENT_ID,
    ga4IdValid: isValidGA4Id(GA_MEASUREMENT_ID),
  };
};

// Initialize Google Analytics
export const initializeAnalytics = (): void => {
  if (!isAnalyticsEnabled() || !GA_MEASUREMENT_ID) {
    console.log('Analytics disabled:', getAnalyticsStatus());
    return;
  }

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  // Configure GA4
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    // Privacy-focused configuration
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  console.log('Analytics initialized with GA4 ID:', GA_MEASUREMENT_ID);
};

// Track page views
export const trackPageView = (url: string, title?: string): void => {
  if (
    !isAnalyticsEnabled() ||
    typeof window === 'undefined' ||
    !GA_MEASUREMENT_ID
  )
    return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title || document.title,
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (
    !isAnalyticsEnabled() ||
    typeof window === 'undefined' ||
    !GA_MEASUREMENT_ID
  )
    return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track recipe views
export const trackRecipeView = (
  recipeSlug: string,
  recipeTitle: string
): void => {
  trackEvent('recipe_view', 'recipes', recipeTitle);
};

// Track search queries
export const trackSearch = (query: string, resultCount: number): void => {
  trackEvent('search', 'engagement', query, resultCount);
};

// Track ingredient interactions
export const trackIngredientInteraction = (
  action: 'select_all' | 'clear_all' | 'copy_ingredients',
  recipeSlug: string
): void => {
  trackEvent(action, 'ingredients', recipeSlug);
};

// Track popular recipes (for analytics insights)
export const trackPopularRecipe = (
  recipeSlug: string,
  recipeTitle: string
): void => {
  trackEvent('popular_recipe_view', 'recipes', recipeTitle);
};

// Track device and browser information
export const trackDeviceInfo = (): void => {
  if (!isAnalyticsEnabled() || typeof window === 'undefined') return;

  const userAgent = navigator.userAgent;
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(
    userAgent
  );

  let deviceType = 'desktop';
  if (isTablet) deviceType = 'tablet';
  else if (isMobile) deviceType = 'mobile';

  trackEvent('device_info', 'system', deviceType);
};

// Analytics utility functions
export const analytics = {
  initialize: initializeAnalytics,
  pageView: trackPageView,
  event: trackEvent,
  recipeView: trackRecipeView,
  search: trackSearch,
  ingredientInteraction: trackIngredientInteraction,
  popularRecipe: trackPopularRecipe,
  deviceInfo: trackDeviceInfo,
  isEnabled: isAnalyticsEnabled,
  getStatus: getAnalyticsStatus,
};

export default analytics;
