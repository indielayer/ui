import type { TableHeaderTheme } from '../TableHeader.vue'

const theme: TableHeaderTheme = {
  classes: {
    th: ({ props }) => {
      const classes = ['relative p-2.5 font-medium']

      if (props.sortable) classes.push('cursor-pointer hover:text-secondary-800 dark:hover:text-secondary-300 transition-colors duration-150 ease-in-out')

      return classes
    },

    header: ({ props }) => {
      const classes = ['flex items-center gap-1 select-none']

      if (props.textAlign === 'left') classes.push('justify-start')
      else if (props.textAlign === 'right') {
        if (props.sortable) classes.push('flex-row-reverse')
        else classes.push('justify-end')
      } else if (props.textAlign === 'center') classes.push('justify-center')

      return classes
    },

    sortIcon: ({ props }) => {
      const classes = ['stroke-2 w-3 h-3']

      return classes
    },
  },
}

export default theme
