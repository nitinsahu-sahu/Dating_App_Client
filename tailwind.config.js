/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#1476ff",
        'secondary': "#f3f5ff",
        'light': "#f9faff",
        'denger': "red",
        'success': "#00FF00",
        'peach': "#FFECE2",
        'pink': "#FFE6E6",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
