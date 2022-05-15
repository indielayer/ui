const colors = require('tailwindcss/colors')

module.exports = (useDark = true) => ({
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
        secondary: colors.slate,
        success: colors.green,
        warning: colors.yellow,
        error: colors.red,
      },
      borderColor: colors.gray[100],
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'ui-sans-serif',
          'system-ui',
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
  plugins: useDark ? [
    ({ addBase, config }) => {
      addBase({
        html: {
          color: config('theme.colors.gray.900'),
          backgroundColor: 'white',
        },
        'html.dark': {
          color: config('theme.colors.gray.100'),
          backgroundColor: config('theme.colors.gray.900'),
        },
        '*, ::before, ::after': {
          borderColor: colors.gray[200],
        },
        '.dark *, .dark ::before, .dark ::after': {
          borderColor: colors.slate[700],
        },
      })
    },
  ] : [],
})
