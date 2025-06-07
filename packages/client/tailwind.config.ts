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
      screens: {
        custom: { min: "1280px", max: "1311px" },
      },
      fontSize: {
        xxs: "0.6rem",
      },
      colors: {
        primary: "#9C0534",
        secondary: "#B94A6C",
        green: "#01650B",
        "green-dark": "#00ae00",
        sand: "#BFBFBF",
        arsenic: "#3A3A3A",
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
        darkergrey: "#141414",
        lightergrey: "#242423",
        slate: "#E9ECEF",
      },
      borderColor: {
        helios: "#B94A6C",
      },
      textDecorationColor: {
        helios: "#B94A6C",
      },
      accentColor: {
        helios: "#B94A6C",
      },
      animation: {
        driveOffScreen: "driveOffScreen 1s ease-in forwards",
        driveInScreen: "driveInScreen 1s ease-out forwards",
        circle: "circle 2s ease-in-out infinite",
        bump: "bump 1s ease-in-out infinite",
      },
      keyframes: {
        circle: {
          "0%": { transform: "rotate(-90deg) translateX(1.5in)" },
          "100%": { transform: "rotate(270deg) translateX(1.5in)" },
        },
        bump: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
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
        ".dark ::-webkit-scrollbar-track": {
          backgroundColor: "#3A3A3A",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
export default config;
