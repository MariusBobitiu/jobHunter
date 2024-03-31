/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        averia: ["Averia Serif Libre", "serif"],
      },
      colors: {
        primary: {
          light: "#FCFFFF",
          DEFAULT: "#F5F5F5",
          dark: "#D4DFE1",
        },
        secondary: {
          light: "#161A1D",
          DEFAULT: "#090A0C",
          dark: "#070708",
        },
        accent: {
          light: "#E32629",
          DEFAULT: "#D91C1F",
          dark: "#B5171A",
        },
        primaryDark: {
          light: "#161A1D",
          DEFAULT: "#090A0C",
          dark: "#070708",
        },
        secondaryDark: {
          light: "#F5F5F5",
          DEFAULT: "#E0E0E0",
          dark: "#BDBDBD",
        },
        accentDark: {
          light: "#D91C1F",
          DEFAULT: "#BA181B",
          dark: "#A21517",
        },
      },
      screens: {
        xsm: "320px",
        lg: "1440px",
      },
    },
  },
  plugins: [],
};
