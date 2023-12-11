/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        // contained:"#5A5FE0",
        contained:"#9F9685",
        "darkModeColor":"#313B3E",
        "primary":"#C5B279",
        "secondary":"#9F9685",
        "primaryText":'#1d1d1d',
        "secondaryText":"#967860"
      },
      screens:{
        "3xl":'1940px'
      }
    },
  },
  plugins: ["@tailwindcss/forms", "tailwindcss-rtl", "tailwind-scrollbar"],
};
