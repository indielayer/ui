import type { ThemeParams } from '../../composables/theme'

export default {
  classes: {
    wrapper: ({ props, data }: ThemeParams) => {
      const classes: any[] = ['relative !flex items-center whitespace-nowrap px-3']

      classes.push({
        'font-medium': data.isActive,
        'cursor-pointer': !props.disabled && !props.inactive,

        // size
        'py-1 text-xs': props.size === 'xs',
        'py-2 text-sm': props.size === 'sm',
        'py-1.5': !props.size || !['xs', 'sm', 'lg', 'xl'].includes(props.size),
        'py-3': props.size === 'lg',
        'py-4 text-lg': props.size === 'xl',

        'rounded': props.rounded,
      })

      return classes
    },
  },

  styles: ({ colors, props, css, data }: ThemeParams) => {
    const color = colors.getPalette(props.color || 'gray')
    const gray = colors.getPalette('gray')

    if (props.disabled) return css.variables({
      text: gray[300],
      dark: {
        text: gray[600],
      },
    })

    if (props.filled) {
      if (data.isActive) {
        return css.variables({
          bg: props.selected ? color[100] : color[50],
          text: color[500],
          hover: {
            bg: props.selected ? color[100] : color[50],
            text: color[500],
          },
          dark: {
            bg: props.selected ? color[800] : color[700],
            text: color[100],
            hover: {
              bg: props.selected ? color[800] : color[700],
              text: color[100],
            },
          },
        })
      }

      return css.variables({
        bg: props.selected ? gray[50] : 'transparent',
        text: gray[800],
        hover: {
          bg: gray[50],
          text: gray[900],
        },
        dark: {
          bg: props.selected ? gray[800] : 'transparent',
          text: gray[200],
          hover: {
            bg: gray[800],
            text: gray[100],
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
      text: gray[800],
      hover: {
        text: gray[900],
        border: gray[300],
      },
      dark: {
        text: gray[300],
        hover: {
          text: gray[200],
          border: gray[800],
        },
      },
    })
  },
}
