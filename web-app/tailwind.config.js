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
        'text-gray': '#3A3A3A',
        'text-gray-dark': '#D2D2D2',
        'background-gray': '#D2D2D2',
        'background-gray-dark': '#212121'
      }
    },
    width: {
      'battery': 'calc(98%)',
      'terminal': 'calc(2%)'
    }
  },
  plugins: []
}
