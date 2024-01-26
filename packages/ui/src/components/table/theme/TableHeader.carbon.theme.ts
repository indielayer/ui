import type { TableHeaderTheme } from '../TableHeader.vue'

const theme: TableHeaderTheme = {
  classes: {
    th: ({ props }) => {
      const classes = ['relative py-3.5 font-semibold text-sm px-3 bg-gray-200 dark:bg-gray-700 select-none']

      if (props.sortable) classes.push('cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-150 ease-in-out pr-6')

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
