import type { TableHeadTheme } from '../TableHead.vue'

const theme: TableHeadTheme = {
  classes: {
    thead: ({ props }) => {
      const classes = ['align-bottom']

      if (props.stickyHeader) classes.push('sticky top-0 z-10')

      return classes
    },
    row: 'text-secondary-900 dark:text-secondary-50',
  },
}

export default theme
