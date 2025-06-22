'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { analytics, isAnalyticsEnabled } from '@/lib/analytics';

// Analytics context interface
interface AnalyticsContextType {
  isEnabled: boolean;
  trackPageView: (url: string, title?: string) => void;
  trackEvent: (
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => void;
  trackRecipeView: (recipeSlug: string, recipeTitle: string) => void;
  trackSearch: (query: string, resultCount: number) => void;
  trackIngredientInteraction: (
    action: 'select_all' | 'clear_all' | 'copy_ingredients',
    recipeSlug: string
  ) => void;
  trackPopularRecipe: (recipeSlug: string, recipeTitle: string) => void;
  trackDeviceInfo: () => void;
  getStatus: () => {
    enabled: boolean;
    environment: string;
    hasGA4Id: boolean;
    ga4IdValid: boolean;
  };
}

// Create analytics context
const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined
);

// Analytics provider props
interface AnalyticsProviderProps {
  children: ReactNode;
}

// Analytics provider component
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [isEnabled, setIsEnabled] = React.useState(false);

  // Initialize analytics on mount
  useEffect(() => {
    const enabled = isAnalyticsEnabled();
    setIsEnabled(enabled);

    if (enabled) {
      analytics.initialize();
      // Track initial page view
      analytics.pageView(window.location.pathname, document.title);
      // Track device info
      analytics.deviceInfo();
    }
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (!isEnabled) return;

    const handleRouteChange = () => {
      analytics.pageView(window.location.pathname, document.title);
    };

    // Listen for popstate events (browser back/forward)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [isEnabled]);

  // Context value
  const contextValue: AnalyticsContextType = {
    isEnabled,
    trackPageView: analytics.pageView,
    trackEvent: analytics.event,
    trackRecipeView: analytics.recipeView,
    trackSearch: analytics.search,
    trackIngredientInteraction: analytics.ingredientInteraction,
    trackPopularRecipe: analytics.popularRecipe,
    trackDeviceInfo: analytics.deviceInfo,
    getStatus: analytics.getStatus,
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
}

// Hook to use analytics context
export function useAnalytics(): AnalyticsContextType {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}

// Hook to check if analytics is enabled
export function useAnalyticsEnabled(): boolean {
  const context = useContext(AnalyticsContext);
  return context?.isEnabled || false;
}

export default AnalyticsProvider;
