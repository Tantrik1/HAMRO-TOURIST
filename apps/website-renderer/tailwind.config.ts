import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/theme-adventure-bold/src/**/*.{ts,tsx}',
    '../../packages/theme-serene-journey/src/**/*.{ts,tsx}',
    '../../packages/theme-heritage-classic/src/**/*.{ts,tsx}',
    '../../packages/ui-components/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'ht-violet': '#7C3AED',
        'ht-coral': '#F97316',
        'ht-cyan': '#06B6D4',
        'ht-lime': '#84CC16',
        'ht-rose': '#F43F5E',
        'ht-ink': '#0A0A0F',
        'ht-surface': '#111118',
        'ht-surface2': '#1A1A24',
        'ht-border': '#2A2A3A',
        'ht-text': '#F1F0FF',
        'ht-soft': '#9B9BB8',
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
        'grad-warm': 'linear-gradient(135deg, #F97316 0%, #F43F5E 100%)',
        'grad-cool': 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
        'grad-surface': 'linear-gradient(145deg, #1A1A24 0%, #111118 100%)',
      },
      boxShadow: {
        'glow-violet': '0 0 40px rgba(124, 58, 237, 0.35)',
        'glow-coral': '0 0 40px rgba(249, 115, 22, 0.35)',
        'glow-cyan': '0 0 40px rgba(6, 182, 212, 0.35)',
        card: '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.6)',
      },
      borderRadius: {
        xl2: '20px',
        xl3: '32px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
