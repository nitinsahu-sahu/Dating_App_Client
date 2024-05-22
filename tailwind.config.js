/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '700px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        'black': '#000000',
        'primary': "#1476ff",
        'secondary': "#f3f5ff",
        'light': "#f9faff",
        'denger': "red",
        'success': "#00FF00",
        'peach': "#FFECE2",
        'pink': "#FFE6E6",
        'leafgreen': "#1A2421",
        'fb-btn': '#1877f2'
      },
      padding: {
        '38': '9.2rem',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
