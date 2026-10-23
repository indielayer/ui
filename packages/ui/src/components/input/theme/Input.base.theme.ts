import type { InputTheme } from '../Input.vue'
import { inputGroupRadiusClasses } from '../../../common/inputGroupRadius'

const theme: InputTheme = {
  classes: {
    wrapper: '',

    input: ({ props, data }) => {
      const classes = ['appearance-none block w-full placeholder-secondary-400 dark:placeholder-secondary-500 outline-transparent outline outline-2 outline-offset-[-1px] transition-all duration-150 ease-in-out border-secondary-300 dark:border-secondary-700 border shadow-xs']

      if (!data.isInsideInputGroup) classes.push('rounded-lg')
      else classes.push(...inputGroupRadiusClasses(data.inputGroupPosition))

      if (!data.errorInternal && !props.disabled) classes.push('hover:border-secondary-400 dark:hover:border-secondary-500')

      if (props.size === 'xs') classes.push('h-7 px-2 text-xs')
      else if (props.size === 'sm') classes.push('h-8 px-2 text-sm')
      else if (props.size === 'lg') classes.push('h-[42px] px-3')
      else if (props.size === 'xl') classes.push('h-[46px] px-4 text-base')
      else classes.push('h-9 px-3')

      classes.push(props.disabled
        ? 'bg-secondary-100 dark:bg-secondary-700 text-secondary-400 dark:text-secondary-600 cursor-not-allowed'
        : 'bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-200')

      return classes
    },

    icon: 'text-secondary-600 dark:text-secondary-300 absolute my-auto inset-y-0',
    adornment: 'absolute inset-y-0 z-10 flex items-center gap-1.5 pointer-events-none',
    adornmentStart: 'left-0 pl-3',
    adornmentEnd: 'right-0 pr-3',
    adornmentIcon: 'shrink-0 text-secondary-600 dark:text-secondary-300 pointer-events-auto',
    adornmentSlot: 'shrink-0 pointer-events-auto text-secondary-600 dark:text-secondary-300 text-sm',
  },

  styles: ({ colors, props, css }) => {
    const color = colors.getPalette(props.color)

    return css.get('border', color[400])
  },
}

export default theme
