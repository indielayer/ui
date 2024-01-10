function getColorVar(color, level) {
  if (level) return `rgb(var(--${color}-color-${level}))`

  return `rgb(var(--${color}-color))`
}

function getColorVarPallete(color) {
  return {
    50: getColorVar(color, 50),
    100: getColorVar(color, 100),
    200: getColorVar(color, 200),
    300: getColorVar(color, 300),
    400: getColorVar(color, 400),
    500: getColorVar(color, 500),
    600: getColorVar(color, 600),
    700: getColorVar(color, 700),
    800: getColorVar(color, 800),
    900: getColorVar(color, 900),
    950: getColorVar(color, 950),
  }
}

module.exports = () => ({
  theme: {
    extend: {
      colors: {
        primary: getColorVarPallete('primary'),
        secondary: getColorVarPallete('secondary'),
        success: getColorVarPallete('success'),
        warning: getColorVarPallete('warning'),
        error: getColorVarPallete('error'),
      },
      borderColor: getColorVar('border'),
      fontFamily: {
        sans: 'var(--font-family-sans)',
        mono: 'var(--font-family-mono)',
      },
    },
  },
})
