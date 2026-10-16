import type { TextareaTheme } from '../Textarea.vue'
import { inputGroupRadiusClasses } from '../../../common/inputGroupRadius'

const theme: TextareaTheme = {
  classes: {
    wrapper: '',

    input: ({ props, data }) => {
      const classes = ['appearance-none block w-full leading-snug placeholder-secondary-400 dark:placeholder-secondary-500 outline-transparent outline outline-2 outline-offset-[-1px] transition duration-150 ease-in-out border-secondary-300 dark:border-secondary-700 border']

      // Per-segment shadow bleeds into joined siblings — keep elevation only when standalone
      if (!data.isInsideInputGroup) classes.push('rounded-lg', 'shadow-xs')
      else classes.push(...inputGroupRadiusClasses(data.inputGroupPosition))

      if (!props.resizable) classes.push('resize-none')
      if (!data.errorInternal && !props.disabled) classes.push('hover:border-secondary-400 dark:hover:border-secondary-500')

      // size @ 14px root: xs 26 / sm 30 / md 34 / lg 38 / xl 42 (matches Input; rows=1 / adjustToText start height)
      if (props.size === 'xs') classes.push('px-2 py-1 min-h-[calc(26/14*1rem)]')
      else if (props.size === 'sm') classes.push('px-2 py-1.5 min-h-[calc(30/14*1rem)]')
      else if (props.size === 'lg') classes.push('px-3 py-2 min-h-[calc(38/14*1rem)]')
      else if (props.size === 'xl') classes.push('px-4 py-2.5 min-h-12')
      else classes.push('px-3 py-2 min-h-[calc(34/14*1rem)]')

      classes.push(props.disabled
        ? 'bg-secondary-100 dark:bg-secondary-700 text-secondary-400 dark:text-secondary-600 cursor-not-allowed'
        : 'bg-white dark:bg-secondary-700/40 text-secondary-700 dark:text-secondary-200')

      return classes
    },

    icon: 'text-secondary-600 dark:text-secondary-300 absolute my-auto inset-y-0',
    adornment: 'absolute z-10 flex items-start gap-1.5 pointer-events-none',
    adornmentStart: ({ props }) => {
      const top = props.size === 'xs' ? 'top-1' : props.size === 'sm' ? 'top-1.5' : props.size === 'xl' ? 'top-2.5' : 'top-3'

      return `left-0 pl-2 ${top}`
    },
    adornmentEnd: ({ props }) => {
      const top = props.size === 'xs' ? 'top-2' : props.size === 'sm' ? 'top-2.5' : props.size === 'xl' ? 'top-4' : 'top-3'

      return `right-0 pr-2 ${top}`
    },
    adornmentIcon: 'shrink-0 text-secondary-600 dark:text-secondary-400 pointer-events-auto',
    adornmentSlot: 'shrink-0 pointer-events-auto text-secondary-600 dark:text-secondary-300 text-sm',
  },
}

export default theme
