import type { LabelTheme } from '../Label.vue'

const theme: LabelTheme = {
  classes: {
    wrapper: ({ props }) => {
      const classes  = ['block relative align-bottom focus:outline-none']

      if (props.isInsideForm) classes.push('mb-5')
      if (props.block) classes.push('w-full')

      return classes
    },

    label: ({ props }) => {
      const classes = 'flex items-center gap-2 font-medium text-secondary-800 dark:text-secondary-200 mb-1'

      if (props.size === 'xs') return classes + ' text-xs'
      else if (props.size === 'sm') return classes + ' text-sm'
      else if (props.size === 'lg') return classes + ' text-lg'
      else if (props.size === 'xl') return classes + ' text-xl'

      return classes
    },
  },
}

export default theme
