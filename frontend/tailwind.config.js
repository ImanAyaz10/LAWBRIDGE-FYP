/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#d1fae5', // emerald-100
          DEFAULT: '#059669', // emerald-600
          dark: '#064e3b', // emerald-950
        },
        secondary: {
          DEFAULT: '#0d9488', // teal-600
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
