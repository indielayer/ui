import type { MenuItemTheme } from '../MenuItem.vue'

const theme: MenuItemTheme = {
  classes: {
    wrapper: ({ props, data }) => {
      const classes = ['relative !flex items-center whitespace-nowrap px-3 min-h-[2rem]']

      if (!props.disabled) classes.push('cursor-pointer')
      if (data.isActive) classes.push('font-medium')
      if (props.rounded) classes.push('rounded')

      if (props.size === 'xs') classes.push('py-1 text-xs')
      else if (props.size === 'sm') classes.push('py-1.5 text-sm')
      else if (props.size === 'lg') classes.push('py-3')
      else if (props.size === 'xl') classes.push('py-4 text-lg')
      else classes.push('py-1.5')

      return classes
    },
  },

  styles: ({ colors, props, css, data }) => {
    const color = colors.getPalette(props.color || 'gray')
    const secondary = colors.getPalette('secondary')

    if (props.disabled) return css.variables({
      text: secondary[300],
      dark: {
        text: secondary[600],
      },
    })

    if (props.filled) {
      if (data.isActive) {
        return css.variables({
          bg: props.selected ? color[100] : color[200],
          text: color[800],
          hover: {
            bg: props.selected ? color[200] : color[200],
            text: color[800],
          },
          dark: {
            bg: props.selected ? color[700] : color[700],
            text: color[100],
            hover: {
              bg: props.selected ? color[700] : color[700],
              text: color[100],
            },
          },
        })
      }

      return css.variables({
        bg: props.selected ? secondary[100] : 'transparent',
        text: secondary[800],
        hover: {
          bg: secondary[100],
          text: secondary[900],
        },
        dark: {
          bg: props.selected ? secondary[800] : 'transparent',
          text: secondary[200],
          hover: {
            bg: secondary[600],
            text: secondary[100],
          },
        },
      })
    }

    if (data.isActive) {
      return css.variables({
        text: color[500],
        hover: {
          text: color[500],
          border: color[500],
        },
        dark: {
          text: color[500],
          hover: {
            text: color[500],
            border: color[500],
          },
        },
      })
    }

    return css.variables({
      text: secondary[800],
      hover: {
        text: secondary[900],
        border: secondary[300],
      },
      dark: {
        text: secondary[300],
        hover: {
          text: secondary[200],
          border: secondary[800],
        },
      },
    })
  },
}

export default theme
