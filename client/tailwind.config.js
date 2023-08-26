/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite_react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Work Sans", "sans-serif"],
      display: ["Bricolage Grotesque", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
