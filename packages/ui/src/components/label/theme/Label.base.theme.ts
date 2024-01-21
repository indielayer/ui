import type { LabelTheme } from '../Label.vue'

const theme: LabelTheme = {
  classes: {
    wrapper: ({ props }) => {
      const classes  = ['block relative align-bottom focus:outline-none']

      if (props.isInsideForm) classes.push('mb-3')
      if (props.block) classes.push('w-full')

      return classes
    },

    label: ({ props }) => {
      const classes = 'font-medium text-gray-800 dark:text-gray-200 mb-1'

      if (props.size === 'xs') return classes + ' text-xs'
      else if (props.size === 'sm') return classes + ' text-sm'
      else if (props.size === 'lg') return classes + ' text-lg'
      else if (props.size === 'xl') return classes + ' text-xl'

      return classes
    },
  },
}

export default theme
