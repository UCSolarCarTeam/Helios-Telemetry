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
      // TO DO: replace the usage of keyframes from global.css with the following tailwind keyframes
      keyframes: {
        circle: {
          "0%": { transform: "rotate(0deg) translateX(1.5in)" },
          "100%": { transform: "rotate(360deg) translateX(1.5in)" },
        },
        driveOffScreen: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(90deg) translateY(-100vh)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
