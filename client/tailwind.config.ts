import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.6rem",
      },
      colors: {
        primary: "#9C0534",
        green: "#01650B",
        "green-dark": "#00ae00",
      },
      textColor: {
        light: "#3A3A3A",
        dark: "#D2D2D2",
        helios: "#B94A6C",
        pink: "#9C0534",
        gray: "#807D7D",
      },
      backgroundColor: {
        light: "#D2D2D2",
        dark: "#212121",
        helios: "#B94A6C",
        "helios-compliment": "#963A56",
      },
      borderColor: {
        helios: "#B94A6C",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        "::-webkit-scrollbar": {
          width: "3px",
          height: "4px",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "#B94A6C",
        },
        "::-webkit-scrollbar-track": {
          backgroundColor: "#D2D2D2",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
export default config;
