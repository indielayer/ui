import type { TableRowTheme } from '../TableRow.vue'

const theme: TableRowTheme = {
  classes: {
    row: ({ props }) => {
      const classes = []

      if (props.striped) {
        classes.push('even:bg-secondary-50 dark:even:bg-secondary-700')
      } else {
        classes.push('border-b border-secondary-200 dark:border-secondary-700')
      }

      if (props.pointer) classes.push('hover:bg-secondary-50 dark:hover:bg-secondary-700 cursor-pointer')

      return classes
    },
  },
}

export default theme
