/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:
    {
      colors: {
        myorange: {
          50: '#FFCC70',
        },
      }
    },
  },
  plugins: [],
}