import type { LabelTheme } from '../Label.vue'

import BaseTheme from './Label.base.theme'

const theme: LabelTheme = {
  classes: {
    wrapper: ({ props }) => {
      const classes  = ['block relative align-bottom focus:outline-none']

      if (props.isInsideForm) classes.push('mb-8')
      if (props.block) classes.push('w-full')

      return classes
    },

    label: 'text-xs text-gray-500 dark:text-gray-200 mb-2',
  },
}

export default theme
