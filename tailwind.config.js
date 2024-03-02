/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#1476ff",
        'secondary': "#f3f5ff",
        'light': "#f9faff",
        'denger': "red",
        'green': "#00FF00",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
