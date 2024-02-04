import type { LabelTheme } from '../Label.vue'

const theme: LabelTheme = {
  classes: {
    wrapper: ({ props }) => {
      const classes  = ['block relative align-bottom focus:outline-none']

      if (props.isInsideForm) classes.push('mb-8')
      if (props.block) classes.push('w-full')

      return classes
    },

    label: 'text-xs text-secondary-500 dark:text-secondary-200 mb-2',
  },
}

export default theme
