/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        lovestory: {
          200: "#FA97BF",
          500: "#F875AA", // Default shade
          600: "#BA5880",
          700: "#7C3B55",
        },
      },
    },
  },
  plugins: [],
};

