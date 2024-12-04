/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
      },
      colors: {
        primary: "#F83758",
        blue: "#4392F9",
        pink: "#FD6E87",
      },
    },
  },
  plugins: [],
};
