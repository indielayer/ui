import type { LabelTheme } from '../Label.vue'

const theme: LabelTheme = {
  classes: {
    wrapper: ({ props }) => {
      const classes  = ['block relative align-bottom focus:outline-hidden']

      if (props.isInsideForm) classes.push('mb-5')
      if (props.block) classes.push('w-full')

      return classes
    },

    label: ({ props }) => {
      const classes = ['flex items-center gap-2 font-medium text-secondary-800 dark:text-secondary-200 mb-1']

      if (props.size === 'xs') classes.push('text-xs')
      else if (props.size === 'sm') classes.push('text-sm')
      else if (props.size === 'lg') classes.push('text-lg')
      else if (props.size === 'xl') classes.push('text-xl')

      if (props.required) classes.push('[&_span]:after:content-["*"] [&_span]:after:ml-0.5 [&_span]:after:text-error-500')

      return classes
    },
  },
}

export default theme
