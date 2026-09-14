/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fbeaf2",
          100: "#f3c6dd",
          200: "#e089b0",
          300: "#c85f92",
          400: "#a52d6c",
          500: "#851c50",
          600: "#6e1743",
          700: "#571236",
          800: "#400d28",
          900: "#2c0a1c",
        },
        accent: {
          DEFAULT: "#02a265",
          dark: "#028a56",
          light: "#e4f7ee",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 3px rgba(43,10,25,0.08), 0 1px 2px rgba(43,10,25,0.06)",
      },
    },
  },
  plugins: [],
};
