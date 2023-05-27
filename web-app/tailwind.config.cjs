/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.6rem'
      },
      colors: {
        'primary': '#9C0534',
        'green': '#01650B',
        'green-dark': '#00ae00',

      },
      textColor: {
        'light': '#3A3A3A',
        'dark': '#D2D2D2',
        'helios': '#B94A6C',
        'pink': '#9C0534',
        'gray': '#807D7D'
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
