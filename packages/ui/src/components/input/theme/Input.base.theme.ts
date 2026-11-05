import type { InputTheme } from '../Input.vue'
import { inputGroupRadiusClasses } from '../../../common/inputGroupRadius'

const theme: InputTheme = {
  classes: {
    wrapper: '',

    input: ({ props, data }) => {
      const classes = ['appearance-none block w-full leading-none placeholder-secondary-400 dark:placeholder-secondary-300/70 outline-transparent outline outline-2 outline-offset-[-1px] transition-all duration-150 ease-in-out border-secondary-300 dark:border-secondary-600 border']

      // Per-segment shadow bleeds into joined siblings — keep elevation only when standalone
      if (!data.isInsideInputGroup) classes.push('rounded-lg', 'shadow-xs')
      else classes.push(...inputGroupRadiusClasses(data.inputGroupPosition))

      if (!data.errorInternal && !props.disabled) classes.push('hover:border-secondary-400 dark:hover:border-secondary-500')

      // size @ 14px root: xs 26 / sm 30 / md 34 / lg 38 / xl 42
      if (props.size === 'xs') classes.push('h-[calc(26/14*1rem)] px-2')
      else if (props.size === 'sm') classes.push('h-[calc(30/14*1rem)] px-2')
      else if (props.size === 'lg') classes.push('h-[calc(38/14*1rem)] px-3')
      else if (props.size === 'xl') classes.push('h-12 px-4')
      else classes.push('h-[calc(34/14*1rem)] px-3')

      const darkBg = data.isInsideCard ? 'dark:bg-secondary-700' : 'dark:bg-secondary-800'

      classes.push(props.disabled
        ? 'bg-secondary-100 dark:bg-secondary-900 text-secondary-400 dark:text-secondary-600 cursor-not-allowed'
        : `bg-white ${darkBg} text-secondary-700 dark:text-secondary-50`)

      return classes
    },

    icon: 'text-secondary-600 dark:text-secondary-300 absolute my-auto inset-y-0',
    adornment: 'absolute inset-y-0 z-10 flex items-center gap-1.5 pointer-events-none',
    adornmentStart: 'left-0 pl-3',
    adornmentEnd: 'right-0 pr-3',
    adornmentIcon: 'shrink-0 text-secondary-600 dark:text-secondary-400 pointer-events-auto',
    adornmentSlot: 'shrink-0 pointer-events-auto text-secondary-600 dark:text-secondary-300 text-sm',
  },

  styles: ({ colors, props, css }) => {
    const color = colors.getPalette(props.color)

    return css.get('border', color[400])
  },
}

export default theme
