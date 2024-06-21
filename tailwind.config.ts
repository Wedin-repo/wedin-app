import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
        '3xl': '2000px',
      },
    },
    extend: {
      colors: {
        primaryTextColor: '#1A1A1A',
        primaryBackgroundColor: '#444444',
        primaryTitleColor: '#464646',
        primaryBorderColor: '#E0E0E0',
        secondaryTextColor: '#595959',
        secondaryBackgroundColor: '#E7E7E7',
        secondaryTitleColor: '#1C1C1C',
        secondaryBorderColor: '#B4B4B4',
        tertiaryTextColor: '#696969',
        borderColor: '#E0E0E0',
        Gray100: '#F3F4F6',
        Gray200: '#C3C3C3',
        Gray300: '#D1D5DB',
        Gray600: '#F2F2F2',
        Zinc400: '#A1A1AA',
        Neutral700: '#404040',
        Slate800: '#1E293B',
        Slate900: '#0F172A',
        Primary300: '#4A4A4A',
        Primary400: '#2E2E2E',
        Primary700: '#343434',
        Secondary400: '#797979',
      },
      width: {
        '128': '32rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
