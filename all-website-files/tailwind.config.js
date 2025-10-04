/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./frontend/public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'musanid-dark': '#6D28D9',
        'musanid-light': '#A78BFA',
      },
      fontFamily: {
        'tajawal': ['Tajawal', 'sans-serif'],
        'cairo': ['Cairo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}