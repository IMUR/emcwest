/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F0F1A',
        secondary: '#1A1A2E',
        accent: '#4A4E69',
        highlight: '#7B61FF',
        'card-bg': 'rgba(30, 30, 60, 0.25)'
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Arial', 'sans-serif']
      },
      transitionTimingFunction: {
        'cubic-bezier-1': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        'cubic-bezier-2': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }
    }
  },
  plugins: []
}; 