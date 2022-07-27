import type { ThemeParams } from '../../composables/theme'

export default {
  classes: {
    wrapper: 'inline-block align-bottom text-left',
    // wrapper: ({ props, data }: ThemeParams) => {
    //   let c = 'inline-flex items-center leading-none whitespace-nowrap'

    //   if (props.size === 'xs') c += ' px-2 py-1 text-xs'
    //   else if (props.size === 'sm') c += ' px-2 py-1 text-sm'
    //   else if (props.size === 'lg') c += ' px-4 py-3 text-lg'
    //   else if (props.size === 'xl') c += ' px-6 py-6 text-xl'
    //   else c += ' px-3 py-2'

    //   return c
    // },

    // loadingWrapper: 'absolute inset-0 flex items-center justify-center z-40 bg-gray-300 dark:bg-gray-600 rounded opacity-50',

    label: ({ props }: ThemeParams) => {
      const classes = 'font-medium text-gray-800 dark:text-gray-200 mb-1'

      if (props.size === 'xs') return classes + ' text-xs'
      else if (props.size === 'sm') return classes + ' text-sm'
      else if (props.size === 'lg') return classes + ' text-lg'
      else if (props.size === 'xl') return classes + ' text-xl'

      return classes //+ ' text-sm'
    },

    input: ({ props, data }: ThemeParams) => {
      const classes = ['resize-none appearance-none block w-full placeholder-gray-400 dark:placeholder-gray-500 outline-transparent outline outline-2 outline-offset-[-1px] transition duration-150 ease-in-out border-gray-300 dark:border-gray-700 border shadow-sm rounded-md']

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
  },

  styles: ({ colors, props, css }: ThemeParams) => {
    const color = colors.getPalette(props.color)

    return css.variables({
      bg: color[100],
      text: color[800],
      border: color[800],
      dark: {
        text: props.outlined ? color[200] : color[800],
      },
    })
  },
}
