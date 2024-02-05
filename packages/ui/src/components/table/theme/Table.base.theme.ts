import type { TableTheme } from '../Table.vue'

const theme: TableTheme = {
  classes: {
    wrapper: 'w-full h-full overflow-x-auto',

    table: ({ props }) => {
      const classes = ['w-full relative']

      if (props.scrollable) classes.push('overflow-x-scroll sm:overflow-x-auto whitespace-wrap sm:whitespace-normal')

      if (props.stickyHeader) classes.push('relative')

      if (props.fixed) classes.push('md:table-fixed')

      return classes
    },

    loadingWrapper: 'absolute inset-0 flex items-center justify-center z-40 bg-secondary-300 dark:bg-secondary-600 rounded opacity-30',
  },
}

export default theme
