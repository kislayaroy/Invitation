/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--color-background-primary)',
        'bg-secondary': 'var(--color-background-secondary)',
        'primary-accent': 'var(--color-primary-accent)',
        'secondary-accent': 'var(--color-secondary-accent)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'borders-dividers': 'var(--color-borders-dividers)',
      },
      fontFamily: {
        headings: ['Great Vibes', 'cursive'],
        body: ['Cormorant Garamond', 'serif'],
        devanagari: ['Noto Serif Devanagari', 'serif'],
      },
      boxShadow: {
        soft: '0 15px 40px -10px rgba(0,0,0,0.08)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
