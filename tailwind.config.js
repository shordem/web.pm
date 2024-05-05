/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Josefin Sans", "sans-serif"],
      },
      colors: {
        vlg: "hsl(0, 0%, 98%)",
        primary: 'hsl(0, 0%, 10%)',
      },
    },
  },
  plugins: [],
};
