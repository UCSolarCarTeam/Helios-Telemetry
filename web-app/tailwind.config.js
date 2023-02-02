/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#D2D2D2',
        'primary-dark': '#1E1E1E',
        'primary-text': '#FFFFFF',
        'primary-text-dark': '#000000',
      }
    },
  },
  plugins: [],
}
