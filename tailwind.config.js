/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans"],
      },
      backgroundImage: {
        default: "url('/assets/img/background-game.jpg')",
      },
    },
  },
  plugins: [],
};
