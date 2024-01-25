import type { AlertTheme } from '../Alert.vue'

const theme: AlertTheme = {
  classes: {
    wrapper: 'flex items-center space-x-2 px-4 py-3 border border-l-4 text-sm',
  },
  styles: ({ props, colors, css }) => {
    const gray = colors.getPalette('gray')
    const color = colors.getPalette(props.color)
    const vars = []

    if (props.glow) vars.push(css.get('glow', colors.getColorOpacity(color[500], 0.5)))

    if (props.color) {
      if (props.light) {
        vars.push(css.variables({
          bg: color[50],
          text: gray[900],
          icon: color[600],
          border: props.outlined ? color[600] : color[50],
          dark: {
            bg: gray[800],
            text: gray[100],
            icon: color[600],
            border: props.outlined ? color[500] : color[200],
          },
        }))
      } else {
        vars.push(css.variables({
          bg: props.outlined ? 'transparent' : color[600],
          text: props.outlined ? color[600] : color[50],
          icon: props.outlined ? color[600] : color[50],
          border: color[600],
          dark: {
            border: color[400],
            text: props.outlined ? color[400] : color[50],
          },
        }))
      }

      return vars
    }

    vars.push(css.variables({
      bg: 'transparent',
      text: color[500],
      border: color[300],
      dark: {
        bg: 'transparent',
        text: color[300],
        border: color[500],
      },
    }))

    return vars
  },
}

export default theme
