import type { TabTheme } from '../Tab.vue'

const theme: TabTheme = {
  classes: {
    wrapper: ({ props, data }) => {
      const c = ['py-2 transition-colors duration-150 ease-in-out whitespace-nowrap text-center']

      if (data.variant === 'block') c.push('px-8')

      if (props.size === 'xs') c.push('text-xs')
      else if (props.size === 'sm') c.push('text-sm')
      else if (props.size === 'lg') c.push('text-lg')
      else if (props.size === 'xl') c.push('text-xl')

      return c
    },

    content: 'flex items-center justify-center',

    label: 'font-medium',

    icon: 'mr-1.5',

    tabpanel: 'py-2',
  },
}

export default theme
