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
      animation: {
        driveOffScreen: "driveOffScreen 1s ease-in-out forwards",
        driveInScreen: "driveInScreen 1s ease-in-out forwards",
        circle: "circle 3s ease-in-out infinite",
      },
      keyframes: {
        circle: {
          "0%": { transform: "rotate(0deg) translateX(1.5in)" },
          // "0%": { transform: "rotate(180deg) translateX(1.5in)" },
          // "25%": { transform: "rotate(270deg) translateX(1.5in)" },
          // "50%": { transform: "rotate(270deg) translateX(1.5in)" },
          // "75%": { transform: "rotate(270deg) translateX(1.5in)" },
          "100%": { transform: "rotate(360deg) translateX(1.5in)" },
        },

        driveOffScreen: {
          "0%": { transform: "translateX(0vh)" },
          "100%": { transform: "translateX(100vh)" },
        },
        driveInScreen: {
          "0%": { transform: "translateX(-100vh)" },
          "100%": { transform: "translateX(0vh)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
