const plugin = require('tailwindcss/plugin') // import Tailwind's 'plugin' function

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.tab-shadow': { 
          'box-shadow': 'inset 0px -2px 4px 0px rgb(0 0 0 / 0.05);'
        },
        'input:invalid.validateinput': {
          'border': '1px solid red;'
        },
        'input ~ span': {
          'display': 'none;',
        },        
        'input:invalid ~ .validatemessage': {
          'display': 'block;',
          'color': 'red;'
        }
      })
    }),
  ]
}