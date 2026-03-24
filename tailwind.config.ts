import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f8fb',
          100: '#e6edf5',
          200: '#cfdeee',
          300: '#aac5e1',
          400: '#7ca4cf',
          500: '#567fb8',
          600: '#3f6397',
          700: '#345078',
          800: '#2f4464',
          900: '#2d3c55'
        },
        ink: '#111827',
        canvas: '#f8fafc',
        accent: '#b6915f'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['"Playfair Display"', 'serif']
      },
      boxShadow: {
        soft: '0 10px 35px rgba(10, 20, 30, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
