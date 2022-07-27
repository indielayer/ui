const colors = require('tailwindcss/colors')
const indielayer = require('@indielayer/ui/tailwind.preset')

module.exports = {
  content: [
    '../ui/lib/**/*',
    './src/**/*.vue',
    './src/theme.ts',
  ],
  darkMode: 'class',
  presets: [
    indielayer(),
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
        secondary: colors.slate,
        success: colors.green,
        warning: colors.yellow,
        error: colors.red,
      },
    },
  },
}
