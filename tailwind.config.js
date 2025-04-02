/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1E90FF",
        background: "#0a0a0a",
        foreground: "#e0e0e0",
      },
    },
  },
  plugins: [],
};
