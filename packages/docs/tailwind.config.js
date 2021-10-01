const indielayer = require('@indielayer/ui/tailwind.preset')

module.exports = {
  mode: 'jit',
  purge: [
    'node_modules/@indielayer/ui/src/**/*.vue',
    './src/**/*.vue',
  ],
  darkMode: 'class',
  presets: [
    indielayer,
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
