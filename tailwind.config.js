/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter var', 'sans-serif'],
        opensans: ["Open Sans", "sans-serif"]
      },
      boxShadow: {
        card: '0 0 1px 0 rgba(189, 192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)',
        cardhover: '0 0 1px 0 rgba(189, 192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)'
      },
      screens: {
        xs: '480px',
      },
      colors: {
        "deep-blue": "#010026",
        blue: "#2CBCE9",
        red: "#DC4492",
        yellow: "#FDCC49",
        grey: "#ededed",
        "my-purple": "#6c567b",
        "dark-grey": "#757575",
        "opaque-black": "rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
}