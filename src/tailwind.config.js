/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3BB77E',
          dark: '#2D8A5E',
          light: '#DEF9EC',
        },
        secondary: '#F74B81',
        warning: '#FDC040',
        dark: '#253D4E',
        gray: {
          DEFAULT: '#7E7E7E',
          light: '#F7F8FA',
          border: '#E5E5E5',
        }
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.12)',
        primary: '0 4px 12px rgba(59, 183, 126, 0.3)',
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      }
    },
  },
  plugins: [],
}