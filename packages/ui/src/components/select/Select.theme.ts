import type { ThemeParams } from '../../composables/theme'

export default {
  classes: {
    wrapper: 'inline-block align-bottom text-left focus:outline-none',

    label: ({ props }: ThemeParams) => {
      let c = 'font-medium text-gray-800 dark:text-gray-200 mb-1'

      if (props.size === 'xs') c += ' text-xs'
      else if (props.size === 'sm') c += ' text-sm'
      else if (props.size === 'lg') c += ' text-lg'
      else if (props.size === 'xl') c += ' text-xl'

      return c
    },

    box: ({ props, data }: ThemeParams) => {
      let c = 'w-full border border-gray-300 dark:border-gray-700 pr-8 outline-transparent outline outline-2 outline-offset-[-1px] transition-all duration-150 ease-in-out rounded-md shadow-sm'

      if (!data.errorInternal && !props.disabled) c += ' hover:border-gray-400 dark:hover:border-gray-500'

      if (props.size === 'xs') c += ' px-2 py-1 text-xs'
      else if (props.size === 'sm') c += ' px-2 py-2 text-sm'
      else if (props.size === 'lg') c += ' px-4 py-3 text-lg'
      else if (props.size === 'xl') c += ' px-5 py-4 text-xl'
      else c += ' px-3 py-2'

      c += props.disabled
        ? ' bg-gray-100 dark:bg-gray-900 text-gray-500 cursor-not-allowed'
        : ' bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200'

      return c
    },

    content: 'py-1 max-h-72 overflow-scroll',

    iconWrapper: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2',

    icon: ({ props }: ThemeParams) => {
      if (props.size === 'sm' || props.size === 'xs') return 'h-3 w-3'
      else if (props.size === 'lg') return 'h-6 w-6'
      else if (props.size === 'xl') return 'h-7 w-7'

      return 'h-5 w-5'
    },
  },

  styles: ({ props, colors, css }: ThemeParams) => {
    const color = colors.getPalette('primary')

    return css.get('border', color[500])
  },
}
