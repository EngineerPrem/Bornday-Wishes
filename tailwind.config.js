/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables class-based dark mode
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: "#FF5733",
          text: "#D32F2F",
          border: "#FF3B1D",
        },
        green: {
          DEFAULT: "#28A745",
          text: "#1C7C1A",
          border: "#218838",
        },
        orange: {
          DEFAULT: "#FFA500",
          text: "#E67E22",
          border: "#FF8C00",
        },
      },
    },
  },
  plugins: [],
};








// const { color } = require('framer-motion');

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx}", // For Next.js App Router
//     "./pages/**/*.{js,ts,jsx,tsx}", // For Next.js Pages Router
//     "./components/**/*.{js,ts,jsx,tsx}", // For custom components
//   ],
//   theme: {
//     extend: {
//       color:{
//         primary: "#1e3a8a", // Custom primary color
//         secondary: "#9333ea", // Custom secondary color
//         background: "#9a27dO", // Custom background color
//       },
//       fontFamily: {
//         custom: [" 'Poppins' ", "sans-serif"],
//       },
//       spacing:{
//         '128': '32rem',
//         "144": "36rem",
//       },
//       borderRadius: {
//         xl: "1.5rem", // Custom border-radius
//       },
//     },
//   },
//   darkMode: 'class', 
//   plugins: [],
// };


