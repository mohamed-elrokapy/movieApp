/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Neutral, slightly warm greys replace Tailwind's blue-tinted gray
        // so the older pages (which use gray-*) match the new surfaces.
        gray: {
          50: "#f6f5f3",
          100: "#ebe9e6",
          200: "#d6d3ce",
          300: "#b9b5ae",
          400: "#9a958c",
          500: "#78746c",
          600: "#57534d",
          700: "#3a3834",
          800: "#242320",
          900: "#171614",
          950: "#0d0d0c",
        },
        ink: "#0b0b0a",
        surface: "#151412",
        line: "#2a2825",
        // Brass, the single accent colour.
        accent: {
          DEFAULT: "#e6b04f",
          soft: "#f0cd8a",
          strong: "#c98f26",
          ink: "#1a1306",
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
        display: ['"Fraunces Variable"', "Georgia", "serif"],
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};
