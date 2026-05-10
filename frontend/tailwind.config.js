/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#d1fae5', 
          DEFAULT: '#1b5e48', // professional legal green
          dark: '#0f4c3a', // dark emerald for headers/footers
          accent: '#c0a062', // subtle gold accent for legal theme
        },
        secondary: {
          DEFAULT: '#0d9488',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
