import type { MenuItemTheme } from '../MenuItem.vue'

const theme: MenuItemTheme = {
  classes: {
    wrapper: ({ props, data }) => {
      const classes = ['relative !flex items-center px-3']

      if (props.description) classes.push('whitespace-normal py-2')
      else classes.push('whitespace-nowrap')

      if (!props.disabled) classes.push('cursor-pointer')
      if (data.isActive) classes.push('font-medium')
      if (props.rounded) classes.push('rounded-lg')

      if (props.size === 'xs') classes.push('min-h-7 text-xs')
      else if (props.size === 'sm') classes.push('min-h-8 text-sm')
      else if (props.size === 'lg') classes.push('min-h-[42px]')
      else if (props.size === 'xl') classes.push('min-h-[46px] text-base')
      else classes.push('min-h-9')

      return classes
    },

    description: ({ data }) => {
      const classes = ['block mt-0.5 text-xs font-normal whitespace-normal text-secondary-500 dark:text-secondary-400']

      if (data.isActive) classes.push('text-secondary-600 dark:text-secondary-300')

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
          bg: props.selected ? color[100] : props.checkbox ? 'transparent' : color[200],
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
        bg: props.selected ? color[100] : 'transparent',
        text: color[700],
        hover: {
          bg: color[100],
          text: color[900],
        },
        dark: {
          bg: props.selected ? color[800] : 'transparent',
          text: color[200],
          hover: {
            bg: color[600],
            text: color[100],
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
