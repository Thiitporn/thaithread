/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit", "sans-serif"], 
      },
    },
  },
  plugins: [require("daisyui")], 
};
