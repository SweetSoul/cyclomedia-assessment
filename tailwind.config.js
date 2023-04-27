/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "josefin-sans": ["--font-josefin-sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
