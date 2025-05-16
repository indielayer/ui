import type { TableHeaderTheme } from '../TableHeader.vue'

const theme: TableHeaderTheme = {
  classes: {
    th: ({ props }) => {
      const classes = ['relative p-2.5 font-medium']

      if (props.sortable) classes.push('cursor-pointer hover:text-secondary-800 dark:hover:text-secondary-300 transition-colors duration-150 ease-in-out')

      if (props.textAlign === 'left') classes.push('text-left')
      if (props.textAlign === 'right') classes.push('text-right')
      if (props.textAlign === 'center') classes.push('text-center')
      if (props.textAlign === 'justify') classes.push('text-justify')

      return classes
    },

    sortIcon: ({ props }) => {
      const classes = ['stroke-2 w-3 h-3']

      return classes
    },
  },
}

export default theme
