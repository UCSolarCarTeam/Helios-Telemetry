/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#9C0534',
        'green': '#01650B',
        'green-dark': '#00ae00',

      },
      textColor: {
        'light': '#3A3A3A',
        'dark': '#D2D2D2',
        'helios': '#B94A6C'
      },
      backgroundColor: {
        'light': '#D2D2D2',
        'dark': '#212121',
        'helios': '#B94A6C',
        'helios-compliment': '#963A56',
      },
      borderColor: {
        'helios': '#B94A6C',
      }
    }
  },
  plugins: []
}