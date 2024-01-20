import type { InputTheme } from '../../components/input'

const theme: InputTheme = {
  classes: {
    wrapper: '',

    input: ({ props, data }) => {
      const classes = ['appearance-none block w-full placeholder-gray-400 dark:placeholder-gray-500 outline-transparent outline outline-2 outline-offset-[-1px] transition-all duration-150 ease-in-out border-gray-300 dark:border-gray-700 border-b text-sm px-4']

      if (!data.errorInternal && !props.disabled) classes.push('hover:border-gray-400 dark:hover:border-gray-500')

      if (props.size === 'xs' || props.size === 'sm') classes.push('py-1.5')
      else if (props.size === 'lg' || props.size === 'xl') classes.push('py-3.5')
      else classes.push('py-2.5')

      if (props.disabled) {
        classes.push('bg-gray-100 dark:bg-gray-900 text-gray-300 cursor-not-allowed')
      } else if (props.readonly) {
        classes.push('bg-white dark:bg-gray-900 text-gray-700')
      } else {
        classes.push('bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200')
      }

      return classes
    },

    icon: 'text-gray-600 dark:text-gray-300 absolute my-auto inset-y-0',
  },

  styles: ({ colors, props, css }) => {
    const color = colors.getPalette(props.color)

    return css.get('border', color[400])
  },
}

export default theme
