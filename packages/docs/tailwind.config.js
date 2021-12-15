const indielayer = require('@indielayer/ui/tailwind.preset')

module.exports = {
  mode: 'jit',
  content: [
    '../ui/src/**/*.vue',
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
  plugins: [
    ({ addBase, config }) => {
      addBase({
        html: {
          color: config('theme.colors.gray.900'),
          backgroundColor: config('theme.colors.gray.50'),
        },
        'html.dark': {
          color: config('theme.colors.gray.100'),
          backgroundColor: config('theme.colors.gray.900'),
        },
      })
    },
  ],
}
