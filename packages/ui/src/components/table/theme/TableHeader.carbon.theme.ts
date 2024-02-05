import type { TableHeaderTheme } from '../TableHeader.vue'

const theme: TableHeaderTheme = {
  classes: {
    th: ({ props }) => {
      const classes = ['relative py-3.5 font-semibold text-sm px-3 bg-secondary-200 dark:bg-secondary-700 select-none']

      if (props.sortable) classes.push('cursor-pointer hover:bg-secondary-300 dark:hover:bg-secondary-600 transition-colors duration-150 ease-in-out pr-5')

      if (props.stickyHeader) classes.push('sticky top-0')

      if (props.textAlign === 'left') classes.push('text-left')
      if (props.textAlign === 'right') classes.push('text-right')
      if (props.textAlign === 'center') classes.push('text-center')
      if (props.textAlign === 'justify') classes.push('text-justify')

      return classes
    },

    sortIcon: ({ props }) => {
      const classes = ['absolute stroke-2 w-4 h-4 top-4 right-2']

      return classes
    },
  },
}

export default theme
