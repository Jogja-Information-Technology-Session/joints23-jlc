/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scale: {
        flip: '-1',
      },
      colors: {
        "primary-dark": '#223144',
        "primary-blue": "#0072ED"
      }
    },
  },
  plugins: [],
};

module.exports = config;
