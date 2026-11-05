import type { CardTheme } from '../Card.vue'

const theme: CardTheme = {
  classes: {
    wrapper: ({ props }) => {
      const classes = ['bg-white dark:bg-secondary-800 overflow-hidden rounded-xl']

      if (!props.flat) {
        classes.push('border border-secondary-200 dark:border-secondary-600/70 shadow-sm dark:shadow-none')
      }

      return classes
    },
  },
}

export default theme
