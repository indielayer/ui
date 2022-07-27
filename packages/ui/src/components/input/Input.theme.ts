import type { ThemeParams } from '../../composables/theme'

export default {
  classes: {
    wrapper: 'inline-block align-bottom text-left',

    label: ({ props }: ThemeParams) => {
      const classes = 'font-medium text-gray-800 dark:text-gray-200 mb-1'

      if (props.size === 'xs') return classes + ' text-xs'
      else if (props.size === 'sm') return classes + ' text-sm'
      else if (props.size === 'lg') return classes + ' text-lg'
      else if (props.size === 'xl') return classes + ' text-xl'

      return classes // + ' text-sm'
    },

    input: ({ props, data }: ThemeParams) => {
      const classes = ['appearance-none block w-full placeholder-gray-400 dark:placeholder-gray-500 outline-transparent outline outline-2 outline-offset-[-1px] transition-all duration-150 ease-in-out border-gray-300 dark:border-gray-700 border shadow-sm rounded-md']

      if (!data.errorInternal && !props.disabled) classes.push('hover:border-gray-400 dark:hover:border-gray-500')

      if (props.size === 'xs') classes.push('px-2 py-1 text-xs')
      else if (props.size === 'sm') classes.push('px-2 py-2 text-sm')
      else if (props.size === 'lg') classes.push('px-4 py-3 text-lg')
      else if (props.size === 'xl') classes.push('px-5 py-4 text-xl')
      else classes.push('px-3 py-2')

      classes.push(props.disabled
        ? 'bg-gray-100 dark:bg-gray-900 text-gray-500 cursor-not-allowed'
        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200')

      return classes
    },

    icon: 'text-gray-600 dark:text-gray-300 absolute my-auto inset-y-0',
  },

  styles: ({ colors, props, css }: ThemeParams) => {
    const color = colors.getPalette(props.color)

    return css.get('border', color[400])
  },
}
