/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        "primary": "#D2D2D2",
        "primary-dark": "#323232",
        "primary-text": "#9C0534",
        "primary-text-dark": "#FFFFFF",
      }
    }
  },
  plugins: []
}
