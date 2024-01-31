import type { TableRowTheme } from '../TableRow.vue'

const theme: TableRowTheme = {
  classes: {
    row: ({ props }) => {
      const classes = []

      if (props.striped) {
        classes.push('odd:bg-gray-50 dark:odd:bg-gray-800')
      } else {
        classes.push('border-b border-gray-200 dark:border-gray-700')
      }

      if (props.pointer) classes.push('hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer')

      return classes
    },
  },
}

export default theme
