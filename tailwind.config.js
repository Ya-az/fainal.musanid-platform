/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'musanid-dark': '#1E3A8A',
        'musanid-light': '#38BDF8',
      },
      fontFamily: {
        'tajawal': ['Tajawal', 'sans-serif'],
        'cairo': ['Cairo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
