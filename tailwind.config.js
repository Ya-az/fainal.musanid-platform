/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./src/views/**/*.ejs",
    "./src/assets/**/*.{css,js}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'musanid-dark': '#1E3A8A',
        'musanid-light': '#38BDF8',
        'dark-bg': '#121826',
        'dark-card': '#1F2A40',
        'dark-text': '#E0E2E7',
      },
      fontFamily: {
        'tajawal': ['Tajawal', 'sans-serif'],
        'cairo': ['Cairo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
