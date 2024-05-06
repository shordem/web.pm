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
        info: 'hsl(212, 86%, 64%)',
        danger: 'hsl(0, 100%, 74%)',
        success: 'hsl(154, 59%, 51%)',
        warning: 'hsl(43, 100%, 51%)',
      },
    },
  },
  plugins: [],
};
