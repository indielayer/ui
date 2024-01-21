import type { TextareaTheme } from '../Textarea.vue'

const theme: TextareaTheme = {
  classes: {
    wrapper: '',

    input: ({ props, data }) => {
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
}

export default theme
