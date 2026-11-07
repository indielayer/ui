import type { TabGroupTheme } from '../TabGroup.vue'
import { secondaryCssPalette } from '../../../common/secondaryTokens'

const theme: TabGroupTheme = {
  classes: {
    wrapper: '',

    scroller: ({ props }) => {
      const c = ['']

      if (!props.fullWidth || props.variant === 'compact') c.push('!w-fit')
      if (props.variant === 'block' || props.variant === 'compact') c.push('rounded-lg')

      if (props.variant === 'block' && !props.ghost) c.push('bg-secondary-100 dark:bg-secondary-800')

      if (props.variant === 'compact' && !props.ghost) {
        c.push('bg-secondary-100 dark:bg-secondary-600/40')
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
      if (props.variant === 'line' && !props.grow) c.push('space-x-1.5')
      if (props.variant === 'block' || props.variant === 'compact') c.push('z-[1] space-x-1')
      if (props.align === 'center') c.push('justify-center')
      if (props.align === 'right') c.push('justify-end')

      return c
    },

    tracker: ({ props }) => {
      const c = ['absolute transition-all duration-150']

      if (props.variant === 'line') {
        // Indicator follows `color` (e.g. primary); falls back to secondary when unset
        c.push('h-[2px] -mt-[2px] bg-[color:var(--x-tab-group-indicator)] dark:bg-[color:var(--x-tab-group-dark-indicator)]')
      }

      if (props.variant === 'block' || props.variant === 'compact') {
        // inset-y-1 matches clip `p-1`; left/width are set from the active tab’s rect
        c.push('rounded-md inset-y-1 bg-[color:var(--x-tab-group-bg)] dark:bg-[color:var(--x-tab-group-dark-bg)] shadow-xs')
      }

      return c
    },
  },

  styles: ({ props, colors, css }) => {
    const secondary = secondaryCssPalette
    const primary = colors.getPalette('primary')
    const color = props.color ? colors.getPalette(props.color) : null
    const compactGhost = props.variant === 'compact' && props.ghost
    const line = props.variant === 'line'
    // Selected text (light): color, else primary on line only / secondary otherwise
    // Selected text (dark): white (ghost compact keeps secondary)
    const selectedText = compactGhost
      ? secondary[900]
      : color ? color[600] : line ? primary[600] : secondary[900]
    const selectedTextDark = compactGhost ? secondary[100] : 'white'

    return css.variables({
      text: selectedText,
      indicator: color ? color[500] : primary[500],
      bg: compactGhost ? '#fff' : props.ghost ? secondary[100] : '#fff',
      dark: {
        text: selectedTextDark,
        indicator: color ? color[500] : primary[500],
        bg: secondary[600],
      },
    })
  },
}

export default theme
