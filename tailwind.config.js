/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        mosk: {
          orange: '#DF5A14',
          grey: '#7F7F7F',
          dark: '#1A1A1A',
          secondary: '#333333'
        }
      }
    },
  },
  plugins: [],
};