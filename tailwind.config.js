/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Josefin Sans", "sans-serif"],
      },
      colors: {
        'bg-accent': '#262626',
        primary: '#4caf50',
        secondary: '#ffa500',
        info: '#3498db',
        danger: '#e74c3c',
        success: '#2ecc71',
        warning: '#f39c12',
      },
    },
  },
  plugins: [],
};
