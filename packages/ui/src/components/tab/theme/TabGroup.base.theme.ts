import type { TabGroupTheme } from '../TabGroup.vue'

const theme: TabGroupTheme = {
  classes: {
    wrapper: '',

    scroller: ({ props }) => {
      const c = ['']

      if (!props.fullWidth || props.variant === 'compact') c.push('!w-fit')
      if (props.variant === 'block' || props.variant === 'compact') c.push('rounded-lg')
      if (props.variant === 'block' && !props.ghost) c.push('bg-secondary-200/80 dark:bg-secondary-800 p-1')
      if (props.variant === 'compact' && !props.ghost) c.push('bg-secondary-200/80 dark:bg-secondary-800 p-1')

      return c
    },

    list: ({ props }) => {
      const c = ['flex min-w-full w-fit']

      if (props.variant === 'line') c.push('border-b border-secondary-200 dark:border-secondary-700')
      if (props.variant === 'line' && !props.grow) c.push('space-x-8')
      if (props.variant === 'block' || props.variant === 'compact') c.push('z-[1] space-x-1')
      if (props.align === 'center') c.push('justify-center')
      if (props.align === 'right') c.push('justify-end')

      return c
    },

    tracker: ({ props }) => {
      const c = ['absolute transition-all duration-150']

      if (props.variant === 'line') c.push('h-[2px] -mt-[2px] bg-[color:var(--x-tab-group-text)] dark:bg-[color:var(--x-tab-group-dark-text)]')

      if (props.variant === 'block' || props.variant === 'compact') {
        c.push('rounded-md h-full top-0 bg-[color:var(--x-tab-group-bg)] dark:bg-[color:var(--x-tab-group-dark-bg)]')
      }

      return c
    },
  },

  styles: ({ props, colors, css }) => {
    const secondary = colors.getPalette('secondary')
    const color = colors.getPalette(props.color)

    return css.variables({
      text: color[700],
      bg: props.ghost ? color[100] : '#fff',
      dark: {
        text: color[300],
        bg: props.ghost ? secondary[700] : secondary[700],
      },
    })
  },
}

export default theme
