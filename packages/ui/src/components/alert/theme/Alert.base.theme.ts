import type { AlertTheme } from '../Alert.vue'

const theme: AlertTheme = {
  classes: {
    wrapper: 'flex items-center rounded-xl space-x-4 px-4 py-2.5 border',
  },
  styles: ({ props, colors, css }) => {
    const color = colors.getPalette(props.color)
    const vars = []

    if (props.glow) vars.push(css.get('glow', colors.getColorOpacity(color[500], 0.35)))

    if (props.color) {
      if (props.light) {
        vars.push(css.variables({
          bg: color[50],
          text: color[600],
          icon: color[600],
          border: props.outlined ? color[600] : color[50],
          dark: {
            // Soft tinted surface — avoid pastel color[200] washes on dark backgrounds
            bg: colors.getColorOpacity(color[500], 0.12),
            text: color[200],
            icon: color[300],
            border: props.outlined
              ? colors.getColorOpacity(color[400], 0.45)
              : colors.getColorOpacity(color[500], 0.28),
          },
        }))
      } else {
        vars.push(css.variables({
          bg: props.outlined ? 'transparent' : color[600],
          text: props.outlined ? color[600] : color[50],
          icon: props.outlined ? color[600] : color[50],
          border: color[600],
          dark: {
            bg: props.outlined ? 'transparent' : colors.getColorOpacity(color[500], 0.2),
            border: colors.getColorOpacity(color[400], 0.4),
            text: props.outlined ? color[300] : color[100],
            icon: props.outlined ? color[300] : color[100],
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
        bg: colors.getColorOpacity(color[500], 0.08),
        text: color[300],
        border: colors.getColorOpacity(color[400], 0.35),
      },
    }))

    return vars
  },
}

export default theme
