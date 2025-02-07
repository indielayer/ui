import type { TableHeadTheme } from '../TableHead.vue'

const theme: TableHeadTheme = {
  classes: {
    thead: ({ props }) => {
      const classes = ['align-bottom bg-secondary-50 dark:bg-secondary-700']

      if (props.stickyHeader) classes.push('sticky top-0 z-10')

      return classes
    },
    row: 'text-sm text-secondary-700 dark:text-secondary-200 border-b',
  },
}

export default theme
