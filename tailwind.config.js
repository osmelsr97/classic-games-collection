/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans"],
      },
      backgroundImage: {
        default: "url('./src/assets/img/background-game.jpg')",
        snake: "url('./src/assets/img/snake.jpg')",
      },
    },
  },
  plugins: [],
};
