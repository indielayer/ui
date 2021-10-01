const { borderRadius } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  // purge: [
  //   './**/*.vue',
  // ],
  darkMode: 'class',
  variants: {},
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.blueGray,
        success: colors.green,
        warning: colors.orange,
        error: colors.red,

        transparent: 'transparent',
        current: 'currentColor',

        // black: '#000',
        // white: '#fff',

        // blue: colors.lightBlue,
        // gray: colors.gray,
        // green: colors.green,
        // indigo: colors.indigo,
        // orange: colors.orange,
        // pink: colors.pink,
        // purple: colors.purple,
        // red: colors.rose,
        // teal: colors.teal,
        // yellow: colors.amber,
      },
      borderRadius: {
        button: borderRadius.md,
        form: borderRadius.md,
      },
      transitionTimingFunction: {
        'in-fudi': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'out-fudi': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-fudi': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [
    ({ addBase, config }) => {
      addBase({
        html: {
          color: config('theme.colors.gray.900'),
          backgroundColor: config('theme.colors.gray.50'),
        },
        'html.dark': {
          color: config('theme.colors.gray.50'),
          backgroundColor: config('theme.colors.gray.900'),
        },
      })
    },
  ],
}
