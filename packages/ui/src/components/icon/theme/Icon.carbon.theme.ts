import type { IconTheme } from '../Icon.vue'

const theme: IconTheme = {
  classes: {
    wrapper: ({ props }) => {
      const classes = 'inline shrink-0'

      if (props.size === 'xs') return classes + ' h-3 w-3'
      else if (props.size === 'lg') return classes + ' h-5 w-5'
      else if (props.size === 'xl') return classes + ' h-8 w-8'

      return classes + ' h-4 w-4'
    },
  },
}

export default theme
