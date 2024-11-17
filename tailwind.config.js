/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "serif"], 
      },
      colors: {
        primary: "#00D991", 
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
};
