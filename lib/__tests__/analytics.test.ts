import {
  isAnalyticsEnabled,
  getAnalyticsStatus,
  trackEvent,
  trackRecipeView,
  trackSearch,
  trackIngredientInteraction,
} from '../analytics';

// Mock environment variables
const originalEnv = process.env;

describe('Analytics Configuration', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('isAnalyticsEnabled', () => {
    it('should return false in development environment', async () => {
      (process.env as any).NODE_ENV = 'development';
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-ABC123DEF4';
      const { isAnalyticsEnabled } = await import('../analytics');
      expect(isAnalyticsEnabled()).toBe(false);
    });
    it('should return false without GA4 ID', async () => {
      (process.env as any).NODE_ENV = 'production';
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = undefined;
      const { isAnalyticsEnabled } = await import('../analytics');
      expect(isAnalyticsEnabled()).toBe(false);
    });
    it('should return false with invalid GA4 ID format', async () => {
      (process.env as any).NODE_ENV = 'production';
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'INVALID-ID';
      const { isAnalyticsEnabled } = await import('../analytics');
      expect(isAnalyticsEnabled()).toBe(false);
    });
    it('should return true in production with valid GA4 ID', async () => {
      (process.env as any).NODE_ENV = 'production';
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-ABC123DEF4';
      const { isAnalyticsEnabled } = await import('../analytics');
      expect(isAnalyticsEnabled()).toBe(true);
    });
  });

  describe('getAnalyticsStatus', () => {
    it('should return correct status in development', async () => {
      (process.env as any).NODE_ENV = 'development';
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-ABC123DEF4';
      const { getAnalyticsStatus } = await import('../analytics');
      const status = getAnalyticsStatus();
      expect(status).toEqual({
        enabled: false,
        environment: 'development',
        hasGA4Id: true,
        ga4IdValid: true,
      });
    });
    it('should return correct status in production with valid ID', async () => {
      (process.env as any).NODE_ENV = 'production';
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-ABC123DEF4';
      const { getAnalyticsStatus } = await import('../analytics');
      const status = getAnalyticsStatus();
      expect(status).toEqual({
        enabled: true,
        environment: 'production',
        hasGA4Id: true,
        ga4IdValid: true,
      });
    });
    it('should return correct status with invalid GA4 ID', async () => {
      (process.env as any).NODE_ENV = 'production';
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'INVALID-ID';
      const { getAnalyticsStatus } = await import('../analytics');
      const status = getAnalyticsStatus();
      expect(status).toEqual({
        enabled: false,
        environment: 'production',
        hasGA4Id: true,
        ga4IdValid: false,
      });
    });
  });

  describe('Tracking Functions', () => {
    it('should not track events in development', async () => {
      (process.env as any).NODE_ENV = 'development';
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-ABC123DEF4';
      const { trackEvent } = await import('../analytics');
      global.window.gtag = jest.fn();
      trackEvent('test_action', 'test_category', 'test_label', 1);
      expect(global.window.gtag).not.toHaveBeenCalled();
    });
    it('should track recipe view correctly', async () => {
      (process.env as any).NODE_ENV = 'production';
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-ABC123DEF4';
      const { trackRecipeView } = await import('../analytics');
      global.window.gtag = jest.fn();
      trackRecipeView('test-recipe', 'Test Recipe');
      expect(global.window.gtag).toHaveBeenCalledWith('event', 'recipe_view', {
        event_category: 'recipes',
        event_label: 'Test Recipe',
        value: undefined,
      });
    });
    it('should track search correctly', async () => {
      (process.env as any).NODE_ENV = 'production';
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-ABC123DEF4';
      const { trackSearch } = await import('../analytics');
      global.window.gtag = jest.fn();
      trackSearch('chicken', 5);
      expect(global.window.gtag).toHaveBeenCalledWith('event', 'search', {
        event_category: 'engagement',
        event_label: 'chicken',
        value: 5,
      });
    });
    it('should track ingredient interactions correctly', async () => {
      (process.env as any).NODE_ENV = 'production';
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-ABC123DEF4';
      const { trackIngredientInteraction } = await import('../analytics');
      global.window.gtag = jest.fn();
      trackIngredientInteraction('select_all', 'test-recipe');
      expect(global.window.gtag).toHaveBeenCalledWith('event', 'select_all', {
        event_category: 'ingredients',
        event_label: 'test-recipe',
        value: undefined,
      });
    });
  });
});
