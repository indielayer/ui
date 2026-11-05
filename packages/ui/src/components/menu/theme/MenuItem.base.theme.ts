import type { MenuItemTheme } from '../MenuItem.vue'
import { secondaryCssPalette } from '../../../common/secondaryTokens'

const theme: MenuItemTheme = {
  classes: {
    wrapper: ({ props, data }) => {
      const classes = ['relative !flex items-center px-3 w-full min-w-0 max-w-full']

      if (props.description) classes.push('whitespace-normal py-2')
      else classes.push('whitespace-nowrap')

      if (!props.disabled) classes.push('cursor-pointer')
      // Keyboard highlight (`selected`) or route/model active
      if (data.isActive || props.selected) classes.push('font-medium')
      if (props.rounded) classes.push('rounded-lg')

      // size @ 14px root: xs 26 / sm 30 / md 34 / lg 38 / xl 42
      if (props.size === 'xs') classes.push('min-h-[calc(26/14*1rem)] text-xs')
      else if (props.size === 'sm') classes.push('min-h-[calc(30/14*1rem)] text-sm')
      else if (props.size === 'lg') classes.push('min-h-[calc(38/14*1rem)]')
      else if (props.size === 'xl') classes.push('min-h-12 text-base')
      else classes.push('min-h-[calc(34/14*1rem)]')

      return classes
    },

    description: ({ props, data }) => {
      const classes = ['block mt-0.5 text-xs font-normal whitespace-normal break-words text-secondary-500 dark:text-secondary-400']

      if (data.isActive || props.selected) classes.push('text-secondary-600 dark:text-secondary-300')

      return classes
    },
  },

  styles: ({ colors, props, css, data }) => {
    const secondary = secondaryCssPalette
    const isSecondary = !props.color || props.color === 'secondary'
    // Default color is secondary — use CSS tokens so html.dark overrides apply
    const color = isSecondary
      ? secondary
      : colors.getPalette(props.color)
    // Soft wash for chromatic dark hover (mirrors light color[100]); secondary stays solid
    const darkAccentHoverBg = isSecondary
      ? color[600]
      : colors.getColorOpacity(color[500], 0.28)

    if (props.disabled) return css.variables({
      text: secondary[300],
      dark: {
        text: secondary[600],
      },
    })

    if (props.filled) {
      // `selected` = keyboard/pointer highlight; `isActive` = checked/route active
      const highlighted = Boolean(props.selected || data.isActive)

      if (highlighted) {
        // Checked (isActive) always tinted; keyboard `selected` uses a stronger fill
        const keyboard = Boolean(props.selected)
        const darkHighlightBg = isSecondary
          ? color[700]
          : colors.getColorOpacity(color[500], keyboard ? 0.4 : 0.28)

        return css.variables({
          bg: keyboard ? color[200] : color[100],
          text: color[800],
          hover: {
            bg: color[200],
            text: color[800],
          },
          dark: {
            bg: darkHighlightBg,
            text: color[100],
            hover: {
              bg: darkHighlightBg,
              text: color[100],
            },
          },
        })
      }

      return css.variables({
        bg: 'transparent',
        text: color[700],
        hover: {
          bg: color[100],
          text: color[900],
        },
        dark: {
          bg: 'transparent',
          text: isSecondary ? color[200] : color[400],
          hover: {
            bg: darkAccentHoverBg,
            text: isSecondary ? color[100] : color[200],
          },
        },
      })
    }

    if (data.isActive) {
      return css.variables({
        text: color[500],
        hover: {
          text: color[500],
          border: color[500],
        },
        dark: {
          text: color[500],
          hover: {
            text: color[500],
            border: color[500],
          },
        },
      })
    }

    return css.variables({
      text: secondary[800],
      hover: {
        text: secondary[900],
        border: secondary[300],
      },
      dark: {
        text: secondary[300],
        hover: {
          text: secondary[200],
          border: secondary[800],
        },
      },
    })
  },
}

export default theme
