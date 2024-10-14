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
        softpink: '#FFF6F6', // Custom light pink color added here correctly
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      kanit: ['Kanit', 'sans-serif'], // Adding Kanit font
    },    
    lineHeight: {
      'custom': '38.73px', // Custom line-height
    },
      },
  plugins: [],
};