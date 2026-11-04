import type { TabGroupTheme } from '../TabGroup.vue'

const theme: TabGroupTheme = {
  classes: {
    wrapper: '',

    scroller: ({ props }) => {
      const c = ['']

      if (!props.fullWidth || props.variant === 'compact') c.push('!w-fit')
      if (props.variant === 'block' || props.variant === 'compact') c.push('rounded-lg')

      if (props.variant === 'block' && !props.ghost) c.push('bg-secondary-100 dark:bg-secondary-800')

      if (props.variant === 'compact' && !props.ghost) {
        c.push('bg-secondary-100 dark:bg-secondary-900/40')
      }

      return c
    },

    // Inset padding inside the overflow clip so the tracker (and its shadow) isn’t flush-clipped.
    clip: ({ props }) => {
      if (props.variant === 'block' || props.variant === 'compact') return 'p-1'

      return ''
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
        // inset-y-1 matches clip `p-1`; left/width are set from the active tab’s rect
        c.push('rounded-md inset-y-1 bg-[color:var(--x-tab-group-bg)] dark:bg-[color:var(--x-tab-group-dark-bg)] shadow-sm')
      }

      return c
    },
  },

  styles: ({ props, colors, css }) => {
    const secondary = colors.getPalette('secondary')
    const color = colors.getPalette(props.color)
    const compactGhost = props.variant === 'compact' && props.ghost

    return css.variables({
      text: compactGhost ? secondary[900] : props.color ? color[600] : secondary[900],
      bg: compactGhost ? '#fff' : props.ghost ? secondary[100] : '#fff',
      dark: {
        text: compactGhost ? secondary[100] : props.color ? color[300] : '#fff',
        bg: secondary[700],
      },
    })
  },
}

export default theme
