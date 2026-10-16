import type { IconTheme } from '../Icon.vue'

const theme: IconTheme = {
  classes: {
    wrapper: ({ props }) => {
      const classes = 'inline shrink-0'

      if (props.size === 'xs') return classes + ' h-4 w-4'
      else if (props.size === 'sm') return classes + ' h-4.5 w-4.5'
      else if (props.size === 'lg') return classes + ' h-5.5 w-5.5'
      else if (props.size === 'xl') return classes + ' h-5.5 w-5.5'

      return classes + ' h-5 w-5'
    },
  },
}

export default theme
