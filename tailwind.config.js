/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        contained:"#5A5FE0",
      }
    },
  },
  plugins: ["@tailwindcss/forms", "tailwindcss-rtl", "tailwind-scrollbar"],
};
