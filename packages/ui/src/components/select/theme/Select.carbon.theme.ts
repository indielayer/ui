import { type SelectTheme } from '../Select.vue'

const theme: SelectTheme = {
  classes: {
    wrapper: '',

    box: ({ props, data }) => {
      const classes = ['w-full border-b text-sm px-4 border-gray-300 dark:border-gray-700 pr-8 outline-transparent outline outline-2 outline-offset-[-1px] transition-all duration-150 ease-in-out']

      if (!data.errorInternal && !props.disabled) classes.push('hover:border-gray-400 dark:hover:border-gray-500')

      if (props.size === 'xs' || props.size === 'sm') classes.push('py-1.5')
      else if (props.size === 'lg' || props.size === 'xl') classes.push('py-3.5')
      else classes.push('py-2.5')

      if (props.disabled) {
        classes.push('bg-gray-100 dark:bg-gray-900 text-gray-300 cursor-not-allowed')
      } else if (props.readonly) {
        classes.push('bg-white dark:bg-gray-900 text-gray-700')
      } else {
        classes.push('bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200')
      }

      if (data.errorInternal) {
        classes.push('border-red-500 dark:border-red-400 group-focus:outline-red-500')
      } else if (!props.disabled) {
        classes.push('group-focus:outline-[color:var(--x-select-border)]')
      }

      return classes
    },

    content: 'py-1 max-h-72 overflow-scroll',

    iconWrapper: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2',

    icon: ({ props }) => {
      const classes = ['h-5 w-5']

      if (props.disabled) classes.push('text-gray-300 dark:text-gray-500')
      else classes.push('text-gray-500 dark:text-gray-400')

      return classes
    },
  },

  styles: ({ colors, css }) => {
    const color = colors.getPalette('primary')

    return css.get('border', color[500])
  },
}

export default theme
