import type { TableHeaderTheme } from '../TableHeader.vue'

const theme: TableHeaderTheme = {
  classes: {
    th: ({ props }) => {
      const classes = ['relative py-3 font-semibold text-xs px-3']

      if (props.sortable) classes.push('cursor-pointer hover:text-secondary-800 dark:hover:text-secondary-300 transition-colors duration-150 ease-in-out')

      if (props.stickyHeader) classes.push('sticky top-0')

      if (props.textAlign === 'left') classes.push('text-left')
      if (props.textAlign === 'right') classes.push('text-right')
      if (props.textAlign === 'center') classes.push('text-center')
      if (props.textAlign === 'justify') classes.push('text-justify')

      return classes
    },

    sortIcon: ({ props }) => {
      const classes = ['absolute stroke-2 w-3 h-3 top-3.5 right-0.5']

      return classes
    },
  },
}

export default theme
