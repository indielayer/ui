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
  if (size === 'lg') return 'text-lg min-h-10'
  if (size === 'xl') return 'text-xl min-h-11'

  return 'text-sm min-h-7'
}

const theme: TabTheme = {
  classes: {
    wrapper: ({ props, data }) => {
      const c = ['transition-colors duration-150 ease-in-out whitespace-nowrap text-center']

      if (data.variant === 'line') c.push('py-2')
      if (data.variant === 'block') c.push('py-1 px-8')

      if (data.variant === 'compact') {
        if (data.showLabel) c.push('px-2.5')
        c.push(compactSizeClasses(props.size, !data.showLabel))
      } else if (props.size === 'xs') c.push('text-xs')
      else if (props.size === 'sm') c.push('text-sm')
      else if (props.size === 'lg') c.push('text-lg')
      else if (props.size === 'xl') c.push('text-xl')

      return c
    },

    content: 'flex items-center justify-center',

    label: 'font-medium',

    icon: ({ data }) => (data.showLabel ? 'mr-1.5' : ''),

    tabpanel: 'py-2',
  },
}

export default theme
