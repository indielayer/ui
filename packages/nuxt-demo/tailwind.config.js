const colors = require('tailwindcss/colors')
const indielayer = require('@indielayer/ui/tailwind.preset')

module.exports = {
  content: [
    './index.html',
    './app.vue',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/@indielayer/ui/src/**/*',
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
