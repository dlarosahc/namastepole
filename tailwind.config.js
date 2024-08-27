/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'custom-rgb': 'rgb(140, 95, 161)', // Define el color con su nombre personalizado
      },
    },
  },
  plugins: [],
}

