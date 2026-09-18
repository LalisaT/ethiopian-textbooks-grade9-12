/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ethiopia: {
          green: '#009A44',
          yellow: '#FED100',
          red: '#EF2B2D',
          blue: '#0F47AF',
          darkGreen: '#006d30',
          darkYellow: '#c7a300',
          darkRed: '#ba1b1c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Ethiopic', 'system-ui', '-apple-system', 'sans-serif'],
        ethiopic: ['Noto Sans Ethiopic', 'Abyssinica SIL', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
