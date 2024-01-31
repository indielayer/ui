import type { TabTheme } from '../Tab.vue'

const theme: TabTheme = {
  classes: {
    wrapper: ({ props, data }) => {
      const c = ['py-2 transition-colors duration-150 ease-in-out whitespace-nowrap text-left']

      if (data.variant === 'block') c.push('px-4')
      else c.push('px-4')

      if (props.size === 'lg') c.push('text-lg')
      else if (props.size === 'xl') c.push('text-xl')
      else c.push('text-sm')

      return c
    },

    content: 'flex items-center justify-start',

    label: ({ data }) => {
      const c = ['']

      if (data.selected) c.push('font-medium')

      return c
    },

    icon: 'mr-1.5',

    tabpanel: 'py-4',
  },
}

export default theme
