import type { ThemeParams } from '../../composables/theme'

export default {
  classes: {
    wrapper: ({ props }: ThemeParams) => {
      const classes = 'inline'

      if (props.size === 'xs') return classes + ' h-3 w-3'
      else if (props.size === 'sm') return classes + ' h-4 w-4'
      else if (props.size === 'lg') return classes + ' h-6 w-6'
      else if (props.size === 'xl') return classes + ' h-9 w-9'

      return classes + ' h-5 w-5'
    },
  },
}
