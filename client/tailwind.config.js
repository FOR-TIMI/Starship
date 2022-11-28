module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      "starship-purple": "#740561"
    },
    extend: {
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: ['class', '[data-mode="dark"]'],
}
