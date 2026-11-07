import type { SelectTheme } from '../Select.vue'
import { inputGroupRadiusClasses } from '../../../common/inputGroupRadius'

const theme: SelectTheme = {
  classes: {
    // Raise above adjacent InputGroup siblings so the open outline isn't covered
    wrapper: ({ data }) => (data.isPopoverOpen ? 'z-10' : ''),

    box: ({ props, data }) => {
      // Avoid leading-none + overflow:hidden — that clips descenders (g, y, p).
      // Horizontal ellipsis lives on the selected-label span in Select.vue.
      const classes = ['w-full flex items-center border border-secondary-300 dark:border-secondary-600 outline-transparent outline outline-2 outline-offset-[-1px] transition-all duration-150 ease-in-out']

      // Per-segment shadow bleeds into joined siblings — keep elevation only when standalone
      if (!data.isInsideInputGroup) classes.push('rounded-lg', 'shadow-xs')
      else classes.push(...inputGroupRadiusClasses(data.inputGroupPosition))

      if (!data.errorInternal && !props.disabled) classes.push('hover:border-secondary-400 dark:hover:border-secondary-500')

      // size @ 14px root: xs 26 / sm 30 / md 34 / lg 38 / xl 42
      if (props.size === 'xs') classes.push('min-h-[calc(26/14*1rem)] px-2 text-xs')
      else if (props.size === 'sm') classes.push('min-h-[calc(30/14*1rem)] px-2 text-sm')
      else if (props.size === 'lg') classes.push('min-h-[calc(38/14*1rem)] px-4')
      else if (props.size === 'xl') classes.push('min-h-12 px-5 text-base')
      else classes.push('min-h-[calc(34/14*1rem)] px-3')

      // Vertical padding so wrapped tags don't sit flush against the border
      if (props.multiple || props.multipleCheckbox) classes.push('py-1')

      const darkBg = data.isInsideCard ? 'dark:bg-secondary-700' : 'dark:bg-secondary-800'

      if (props.disabled) classes.push('bg-secondary-100 dark:bg-secondary-900 text-secondary-400 dark:text-secondary-600 cursor-not-allowed')
      else classes.push(`bg-white ${darkBg} text-secondary-700 dark:text-secondary-50`)

      if (data.errorInternal) {
        classes.push('border-error-500 dark:border-error-400 group-focus:outline-error-500')
        if (data.isPopoverOpen) classes.push('outline-error-500!')
      } else if (!props.disabled) {
        classes.push('group-focus:outline-[color:var(--x-select-border)]')
        if (data.isPopoverOpen) classes.push('outline-[color:var(--x-select-border)]!')
      }

      if (props.clearable) {
        classes.push('pr-14')
      } else {
        classes.push('pr-8')
      }

      return classes
    },

    // Match XTag size="xs" (px-2 py-1 text-sm)
    truncateCounter: 'shrink-0 inline-flex items-center self-center cursor-pointer hover:bg-secondary-200 dark:hover:bg-secondary-600 bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-100 rounded-lg px-2 py-0.5 text-sm leading-tight',

    content: 'p-1 overflow-hidden',

    search: 'p-1 mb-0.5',

    // min-w-[280px]: readable options when the trigger is narrow (e.g. "All").
    // Pair with auto-size="min" so the popper can grow past a short trigger.
    contentBody: 'overflow-y-auto overflow-x-hidden max-h-64 w-full min-w-[280px]',

    iconWrapper: 'absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none',

    clearButton: 'absolute top-1/2 -translate-y-1/2 right-5 flex items-center p-2',

    icon: ({ props }) => {
      const classes = []

      if (props.size === 'sm' || props.size === 'xs') classes.push('h-3 w-3')
      else if (props.size === 'lg' || props.size === 'xl') classes.push('h-5 w-5')
      else classes.push('h-4 w-4')

      if (props.disabled) classes.push('text-secondary-300 dark:text-secondary-500')
      else classes.push('text-secondary-500 dark:text-secondary-400')

      return classes
    },
  },

  styles: ({ colors, css }) => {
    const color = colors.getPalette('primary')

    // Match Input/Textarea focus ring (primary-400)
    return css.get('border', color[400])
  },
}

export default theme
