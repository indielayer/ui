import type { InputTheme } from '../Input.vue'

const theme: InputTheme = {
  classes: {
    wrapper: '',

    input: ({ props, data }) => {
      const classes = ['appearance-none block w-full placeholder-secondary-400 dark:placeholder-secondary-500 outline-transparent outline outline-2 outline-offset-[-1px] transition-all duration-150 ease-in-out border-secondary-300 dark:border-secondary-700 border-b text-sm px-4']

      if (!data.errorInternal && !props.disabled) classes.push('hover:border-secondary-400 dark:hover:border-secondary-500')

      if (props.size === 'xs' || props.size === 'sm') classes.push('py-1.5')
      else if (props.size === 'lg' || props.size === 'xl') classes.push('py-3.5')
      else classes.push('py-2.5')

      if (props.disabled) {
        classes.push('bg-secondary-100 dark:bg-secondary-900 text-secondary-300 cursor-not-allowed')
      } else if (props.readonly) {
        classes.push('bg-white dark:bg-secondary-900 text-secondary-700')
      } else {
        classes.push('bg-secondary-50 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-200')
      }

      return classes
    },

    icon: 'text-secondary-600 dark:text-secondary-300 absolute my-auto inset-y-0',
  },

  styles: ({ colors, props, css }) => {
    const color = colors.getPalette(props.color)

    return css.get('border', color[400])
  },
}

export default theme
