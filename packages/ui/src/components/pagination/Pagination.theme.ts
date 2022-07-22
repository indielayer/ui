import type { ThemeParams } from '../../composables/theme'

export default {
  classes: {
    wrapper: ({ props }: ThemeParams) => {
      if (props.variant === 'simple') return 'flex items-center space-x-2'
      else if (props.variant === 'dots') return 'flex space-x-6'

      return 'flex items-center' // quick variant
    },

    dots: ({ props }: ThemeParams) => {
      if (props.size === 'xs') return 'h-2 w-2'
      else if (props.size === 'sm') return 'h-3 w-3'
      else if (props.size === 'lg') return 'h-4 w-4'
      else if (props.size === 'xl') return 'h-5 w-5'

      return 'h-3 w-3'
    },
  },

  styles: ({ props, css, colors }: ThemeParams) => {
    const color = colors.getPalette('primary')

    return css.get('bg', color[500])
  },
}
