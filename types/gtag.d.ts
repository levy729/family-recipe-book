declare global {
  interface Window {
    dataLayer: any[];
    gtag: (
      command: 'config' | 'event' | 'set' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}

export {};
