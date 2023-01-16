/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        "page-bg": '#f0efed',
        "queens-blue": '#002452',
        "queens-red": '#b90e31',
        "queens-yellow": '#fabd0f',

      },
    },
  },
  plugins: [],
}