import type { TabTheme } from '../Tab.vue'

const compactSizeClasses = (size: string | undefined, iconOnly: boolean) => {
  if (iconOnly) {
    // Explicit h/w so width cannot collapse under flex/`w-full` conflicts.
    if (size === 'xs') return 'h-6 w-6'
    if (size === 'sm') return 'h-7 w-7'
    if (size === 'lg') return 'h-10 w-10'
    if (size === 'xl') return 'h-11 w-11'

    return 'h-7 w-7'
  }

  if (size === 'xs') return 'text-xs min-h-6'
  if (size === 'sm') return 'text-sm min-h-7'
  if (size === 'lg') return 'min-h-10'
  if (size === 'xl') return 'text-base min-h-11'

  return 'text-sm min-h-7'
}

const theme: TabTheme = {
  classes: {
    wrapper: ({ props, data }) => {
      const c = ['transition-colors duration-150 ease-in-out whitespace-nowrap text-center']
      const hasAccent = !!(props.color || data.color)

      if (data.variant === 'line') c.push('py-2')
      if (data.variant === 'block') c.push('py-1 px-8')

      if (data.variant === 'compact') {
        if (data.showLabel) c.push('px-2.5')
        c.push(compactSizeClasses(props.size, !data.showLabel))
        if (data.ghost && !props.color) c.push('text-secondary-800 dark:text-secondary-100')
      } else if (props.size === 'xs') c.push('text-xs')
      else if (props.size === 'sm') c.push('text-sm')
      else if (props.size === 'xl') c.push('text-base')

      if (!data.selected && !hasAccent) {
        c.push('text-secondary-700 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-200')
      }

      return c
    },

    content: ({ data, props }) => {
      const c = ['flex items-center justify-center']
      const hasAccent = !!(props.color || data.color)

      // Accent tabs still dim inactive via opacity
      if (!data.selected && hasAccent) c.push('opacity-75')

      return c
    },

    label: ({ data }) => (data.selected ? '' : ''),

    icon: ({ data }) => (data.showLabel ? 'mr-1.5' : ''),

    tabpanel: 'py-2',
  },

  styles: ({ props, colors, css }) => {
    if (!props.color) return []

    const color = colors.getPalette(props.color)

    return css.variables({
      text: color[600],
      dark: {
        text: color[400],
      },
    })
  },
}

export default theme
