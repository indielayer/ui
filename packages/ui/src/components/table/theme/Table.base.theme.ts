import type { TableTheme } from '../Table.vue'

const theme: TableTheme = {
  classes: {
    wrapper: ({ props }) => {
      const c = ['w-full relative']

      if (props.scrollable) c.push('overflow-x-scroll sm:overflow-x-auto whitespace-wrap sm:whitespace-normal block sm:table')

      if (props.stickyHeader) c.push('relative')

      if (props.fixed) c.push('table-fixed')

      return c
    },

    loadingWrapper: 'absolute inset-0 flex items-center justify-center z-40 bg-gray-300 dark:bg-gray-600 rounded opacity-50',
  },
}

export default theme
