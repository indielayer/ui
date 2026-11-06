import type { TabGroupTheme } from '../TabGroup.vue'

const theme: TabGroupTheme = {
  classes: {
    wrapper: '',

    scroller: ({ props }) => {
      const c = ['']

      if (!props.fullWidth || props.variant === 'compact') c.push('!w-fit')
      if (props.variant === 'block') c.push('')
      if (props.variant === 'block' && !props.ghost) c.push('bg-secondary-200 dark:bg-secondary-800')
      // if (props.variant === 'compact' && props.ghost) {
      //   c.push('bg-secondary-50 dark:bg-secondary-950 border border-secondary-200 dark:border-secondary-700')
      if (props.variant === 'compact' && !props.ghost) {
        c.push('bg-secondary-200 dark:bg-secondary-800')
      }

      return c
    },

    clip: '',

    list: ({ props }) => {
      const c = ['flex min-w-full w-fit']

      if (props.variant === 'line') c.push('border-b border-secondary-200 dark:border-secondary-700')
      if (props.variant === 'line' && !props.grow) c.push('')
      if (props.variant === 'block') c.push('z-[1] py-1.5')
      if (props.variant === 'compact') c.push('z-[1] py-0.5')
      if (props.align === 'center') c.push('justify-center')
      if (props.align === 'right') c.push('justify-end')

      return c
    },

    tracker: ({ props }) => {
      const c = ['absolute transition-all duration-150']

      if (props.variant === 'line') c.push('h-[2px] -mt-[2px] bg-[color:var(--x-tab-group-text)] dark:bg-[color:var(--x-tab-group-dark-text)]')

      if (props.variant === 'block' || props.variant === 'compact') {
        c.push('border-t-2 border-solid border-[color:var(--x-tab-group-text)] dark:border-[color:var(--x-tab-group-dark-text)] h-full top-0 bg-secondary-100 dark:bg-secondary-700')
      }

      return c
    },
  },

  styles: ({ props, colors, css }) => {
    const gray = colors.getPalette('gray')
    const secondary = colors.getPalette('secondary')
    const primary = colors.getPalette('primary')
    const color = props.color ? colors.getPalette(props.color) : null
    const compactGhost = props.variant === 'compact' && props.ghost
    const line = props.variant === 'line'
    // Selected text (light): color, else primary on line only / secondary otherwise
    // Selected text (dark): white (ghost compact keeps secondary)
    const selectedText = compactGhost
      ? secondary[900]
      : color ? color[600] : line ? primary[600] : secondary[900]
    const selectedTextDark = compactGhost ? secondary[50] : 'white'
    const surface = color || primary

    return css.variables({
      text: selectedText,
      bg: compactGhost ? '#fff' : props.ghost ? surface[50] : '#fff',
      dark: {
        text: selectedTextDark,
        bg: compactGhost ? secondary[600] : props.ghost ? surface[900] : gray[700],
      },
    })
  },
}

export default theme
