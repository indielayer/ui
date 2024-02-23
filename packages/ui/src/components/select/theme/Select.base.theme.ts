import type { SelectTheme } from '../Select.vue'

const theme: SelectTheme = {
  classes: {
    wrapper: '',

    box: ({ props, data }) => {
      const classes = ['w-full border border-secondary-300 dark:border-secondary-700 pr-8 outline-transparent outline outline-2 outline-offset-[-1px] transition-all duration-150 ease-in-out rounded-md shadow-sm']

      if (!data.errorInternal && !props.disabled) classes.push('hover:border-secondary-400 dark:hover:border-secondary-500')

      if (props.size === 'xs') classes.push('px-2 py-1 text-xs')
      else if (props.size === 'sm') classes.push('px-2 py-1.5 text-sm')
      else if (props.size === 'lg') classes.push('px-4 py-3 text-lg')
      else if (props.size === 'xl') classes.push('px-5 py-4 text-xl')
      else classes.push('px-3 py-2')

      if (props.disabled) classes.push('bg-secondary-100 dark:bg-secondary-700 text-secondary-400 dark:text-secondary-600 cursor-not-allowed')
      else classes.push('bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-200')

      if (data.errorInternal) {
        classes.push('border-error-500 dark:border-error-400 group-focus:outline-error-500')
      } else if (!props.disabled) {
        classes.push('group-focus:outline-[color:var(--x-select-border)]')
      }

      return classes
    },

    content: 'p-1 max-h-72 overflow-y-auto',

    iconWrapper: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2',

    icon: ({ props }) => {
      const classes = ['']

      if (props.size === 'sm' || props.size === 'xs') classes.push('h-3 w-3')
      else if (props.size === 'lg') classes.push('h-6 w-6')
      else if (props.size === 'xl') classes.push('h-7 w-7')
      else classes.push('h-5 w-5')

      if (props.disabled) classes.push('text-secondary-300 dark:text-secondary-500')
      else classes.push('text-secondary-500 dark:text-secondary-400')

      return classes
    },
  },

  styles: ({ colors, css }) => {
    const color = colors.getPalette('primary')

    return css.get('border', color[500])
  },
}

export default theme
