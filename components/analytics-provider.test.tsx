import { render, screen } from '@testing-library/react';
import { AnalyticsProvider } from './analytics-provider';

// Mock the analytics module with complete object structure
jest.mock('../lib/analytics', () => ({
  isAnalyticsEnabled: jest.fn(),
  getAnalyticsStatus: jest.fn(),
  initializeAnalytics: jest.fn(),
  analytics: {
    initialize: jest.fn(),
    pageView: jest.fn(),
    event: jest.fn(),
    recipeView: jest.fn(),
    search: jest.fn(),
    ingredientInteraction: jest.fn(),
    popularRecipe: jest.fn(),
    deviceInfo: jest.fn(),
    isEnabled: jest.fn(),
    getStatus: jest.fn(),
  },
}));

describe('AnalyticsProvider', () => {
  const mockAnalytics = require('../lib/analytics');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children without analytics in development', () => {
    mockAnalytics.isAnalyticsEnabled.mockReturnValue(false);
    mockAnalytics.getAnalyticsStatus.mockReturnValue({
      enabled: false,
      environment: 'development',
      hasGA4Id: false,
      ga4IdValid: false,
    });

    render(
      <AnalyticsProvider>
        <div data-testid="test-child">Test Content</div>
      </AnalyticsProvider>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(mockAnalytics.initializeAnalytics).not.toHaveBeenCalled();
  });

  it('should initialize analytics in production', () => {
    mockAnalytics.isAnalyticsEnabled.mockReturnValue(true);
    mockAnalytics.getAnalyticsStatus.mockReturnValue({
      enabled: true,
      environment: 'production',
      hasGA4Id: true,
      ga4IdValid: true,
    });

    render(
      <AnalyticsProvider>
        <div data-testid="test-child">Test Content</div>
      </AnalyticsProvider>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(mockAnalytics.analytics.initialize).toHaveBeenCalledTimes(1);
  });

  it('should handle analytics initialization errors gracefully', () => {
    mockAnalytics.isAnalyticsEnabled.mockReturnValue(true);
    mockAnalytics.getAnalyticsStatus.mockReturnValue({
      enabled: true,
      environment: 'production',
      hasGA4Id: true,
      ga4IdValid: true,
    });
    mockAnalytics.initializeAnalytics.mockImplementation(() => {
      throw new Error('Analytics initialization failed');
    });

    // Should not throw an error
    expect(() => {
      render(
        <AnalyticsProvider>
          <div data-testid="test-child">Test Content</div>
        </AnalyticsProvider>
      );
    }).not.toThrow();

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('should provide analytics context to children', () => {
    mockAnalytics.isAnalyticsEnabled.mockReturnValue(false);
    mockAnalytics.getAnalyticsStatus.mockReturnValue({
      enabled: false,
      environment: 'development',
      hasGA4Id: false,
      ga4IdValid: false,
    });

    const TestComponent = () => {
      return (
        <AnalyticsProvider>
          <div data-testid="test-child">Test Content</div>
        </AnalyticsProvider>
      );
    };

    render(<TestComponent />);
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });
});
