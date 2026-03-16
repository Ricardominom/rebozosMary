/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        magenta: {
          DEFAULT: '#da1e7a',
          deep: '#a3145b',
          light: '#f5d0e6',
          pale: '#fdf0f8',
        },
        negro: '#1a0a12',
        hueso: '#fdf8fb',
        algodon: '#f7edf4',
        dorado: '#c4843c',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        dm: ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        btn: '2px',
      },
      boxShadow: {
        warm: '0 4px 24px 0 rgba(218,30,122,0.10)',
        'warm-md': '0 8px 32px 0 rgba(218,30,122,0.15)',
      },
      transitionTimingFunction: {
        'curtain': 'cubic-bezier(0.76,0,0.24,1)',
      },
      transitionDuration: {
        '700': '700ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}
