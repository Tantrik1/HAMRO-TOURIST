import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui-components/src/**/*.{ts,tsx}', '../../packages/builder-blocks/src/**/*.{ts,tsx}'],
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
      animation: {
        'gradient-x': 'gradient-x 6s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 'box-shadow': '0 0 20px rgba(124, 58, 237, 0.3)' },
          '50%': { 'box-shadow': '0 0 60px rgba(124, 58, 237, 0.7)' },
        },
        'slide-up': {
          from: { transform: 'translateY(12px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
