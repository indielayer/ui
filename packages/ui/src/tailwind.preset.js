const { borderRadius } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.slate,
        success: colors.green,
        warning: colors.yellow,
        error: colors.red,
      },
      borderRadius: {
        button: borderRadius.md,
        form: borderRadius.md,
      },
      backgroundImage: {
        'dark-image': 'linear-gradient(rgba(0, 0, 0, 0.15) 0 0)',
        'darker-image': 'linear-gradient(rgba(0, 0, 0, 0.30) 0 0)',
      },
    },
  },
}
