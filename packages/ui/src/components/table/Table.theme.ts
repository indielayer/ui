import type { ThemeClasses, ThemeComponent } from '../../composables/useTheme'
import type { TableProps } from './Table.vue'

type InternalClasses = 'wrapper' | 'loadingWrapper'

interface InternalTheme extends ThemeComponent<TableProps, InternalClasses> {}
export interface TableTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<TableProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: ({ props, data }) => {
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
