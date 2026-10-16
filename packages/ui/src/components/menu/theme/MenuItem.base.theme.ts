import type { MenuItemTheme } from '../MenuItem.vue'

const theme: MenuItemTheme = {
  classes: {
    wrapper: ({ props, data }) => {
      const classes = ['relative !flex items-center px-3 w-full min-w-0 max-w-full']

      if (props.description) classes.push('whitespace-normal py-2')
      else classes.push('whitespace-nowrap')

      if (!props.disabled) classes.push('cursor-pointer')
      // Keyboard highlight (`selected`) or route/model active
      if (data.isActive || props.selected) classes.push('font-medium')
      if (props.rounded) classes.push('rounded-lg')

      // size @ 14px root: xs 26 / sm 30 / md 34 / lg 38 / xl 42
      if (props.size === 'xs') classes.push('min-h-[calc(26/14*1rem)] text-xs')
      else if (props.size === 'sm') classes.push('min-h-[calc(30/14*1rem)] text-sm')
      else if (props.size === 'lg') classes.push('min-h-[calc(38/14*1rem)]')
      else if (props.size === 'xl') classes.push('min-h-12 text-base')
      else classes.push('min-h-[calc(34/14*1rem)]')

      return classes
    },

    description: ({ props, data }) => {
      const classes = ['block mt-0.5 text-xs font-normal whitespace-normal break-words text-secondary-500 dark:text-secondary-400']

      if (data.isActive || props.selected) classes.push('text-secondary-600 dark:text-secondary-300')

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
      // `selected` = keyboard/pointer highlight; `isActive` = checked/route active
      const highlighted = Boolean(props.selected || data.isActive)

      if (highlighted) {
        // Checked (isActive) always tinted; keyboard `selected` uses a stronger fill
        const keyboard = Boolean(props.selected)

        return css.variables({
          bg: keyboard ? color[200] : color[100],
          text: color[800],
          hover: {
            bg: color[200],
            text: color[800],
          },
          dark: {
            bg: keyboard ? color[700] : color[700],
            text: color[100],
            hover: {
              bg: color[700],
              text: color[100],
            },
          },
        })
      }

      return css.variables({
        bg: 'transparent',
        text: color[700],
        hover: {
          bg: color[100],
          text: color[900],
        },
        dark: {
          bg: 'transparent',
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
