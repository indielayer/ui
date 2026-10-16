import type { TableRowTheme } from '../TableRow.vue'

const theme: TableRowTheme = {
  classes: {
    row: ({ props }) => {
      const classes = []

      if (props.selected && props.singleSelect) {
        classes.push('shadow-[inset_2px_0] shadow-primary-500 bg-secondary-100 dark:bg-secondary-600/50')
      }

      if (props.striped) {
        classes.push('even:bg-secondary-100 dark:even:bg-secondary-700/50')
      } else {
        classes.push('border-b border-secondary-200 dark:border-secondary-700')
      }

      if (props.pointer) {
        classes.push('cursor-pointer')
        if (!props.selected) classes.push('hover:bg-secondary-100/50 dark:hover:bg-secondary-700/70')
      }

      return classes
    },
  },
}

export default theme
