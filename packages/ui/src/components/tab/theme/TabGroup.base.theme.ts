import type { TabGroupTheme } from '../TabGroup.vue'

const theme: TabGroupTheme = {
  classes: {
    wrapper: '',

    scroller: ({ props }) => {
      const c = ['']

      if (!props.fullWidth) c.push('!w-fit')
      if (props.variant === 'block') c.push('rounded-md')
      if (props.variant === 'block' && !props.ghost) c.push('bg-secondary-100 dark:bg-secondary-800 p-1')

      return c
    },

    list: ({ props }) => {
      const c = ['flex min-w-full w-fit']

      if (props.variant === 'line') c.push('border-b border-secondary-200 dark:border-secondary-700')
      if (props.variant === 'line' && !props.grow) c.push('space-x-8')
      if (props.variant === 'block') c.push('z-[1]')
      if (props.align === 'center') c.push('justify-center')
      if (props.align === 'right') c.push('justify-end')

      return c
    },

    tracker: ({ props }) => {
      const c = ['absolute transition-all duration-150']

      if (props.variant === 'line') c.push('h-[2px] -mt-[2px] bg-[color:var(--x-tab-group-text)] dark:bg-[color:var(--x-tab-group-dark-text)]')

      if (props.variant === 'block') c.push('rounded-md h-full top-0 bg-[color:var(--x-tab-group-bg)] dark:bg-[color:var(--x-tab-group-dark-bg)]')

      return c
    },
  },

  styles: ({ props, colors, css }) => {
    const secondary = colors.getPalette('secondary')
    const color = colors.getPalette(props.color)

    return css.variables({
      text: color[600],
      bg: props.ghost ? color[50] : '#fff',
      dark: {
        text: color[400],
        bg: props.ghost ? color[900] : secondary[700],
      },
    })
  },
}

export default theme
