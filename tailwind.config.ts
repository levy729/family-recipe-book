import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': ['calc(0.75rem * var(--font-size-scale))', { lineHeight: '1rem' }],
        'sm': ['calc(0.875rem * var(--font-size-scale))', { lineHeight: '1.25rem' }],
        'base': ['calc(1rem * var(--font-size-scale))', { lineHeight: '1.5rem' }],
        'lg': ['calc(1.125rem * var(--font-size-scale))', { lineHeight: '1.75rem' }],
        'xl': ['calc(1.25rem * var(--font-size-scale))', { lineHeight: '1.75rem' }],
        '2xl': ['calc(1.5rem * var(--font-size-scale))', { lineHeight: '2rem' }],
        '3xl': ['calc(1.875rem * var(--font-size-scale))', { lineHeight: '2.25rem' }],
        '4xl': ['calc(2.25rem * var(--font-size-scale))', { lineHeight: '2.5rem' }],
        '5xl': ['calc(3rem * var(--font-size-scale))', { lineHeight: '1' }],
        '6xl': ['calc(3.75rem * var(--font-size-scale))', { lineHeight: '1' }],
      },
      colors: {
        zinc: {
          '50': '#fafafa',
          '100': '#f4f4f5',
          '200': '#e4e4e7',
          '300': '#d4d4d8',
          '400': '#a1a1aa',
          '500': '#71717a',
          '600': '#52525b',
          '700': '#3f3f46',
          '800': '#27272a',
          '900': '#18181b',
          '950': '#09090b',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
