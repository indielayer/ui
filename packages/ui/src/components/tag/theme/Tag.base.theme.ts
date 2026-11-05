import type { TagTheme } from '../Tag.vue'
import { secondaryCssPalette } from '../../../common/secondaryTokens'

const theme: TagTheme = {
  classes: {
    wrapper: ({ props }) => {
      const c = ['inline-flex leading-tight max-w-full']

      if (props.size === 'xs') c.push('px-2.5 py-0.5 text-xs')
      else if (props.size === 'sm') c.push(' px-2.5 py-0.5 text-sm')
      else if (props.size === 'lg') c.push(' px-4 py-1')
      else if (props.size === 'xl') c.push(' px-5 py-1.5 text-base')
      else c.push(' px-3 py-[3px] text-sm')

      if (props.outlined) {
        c.push('border-[color:var(--x-tag-border)] dark:border-[color:var(--x-tag-dark-border)]')
      }

      if (props.filled || !props.outlined) {
        if (props.filled) c.push('bg-[color:var(--x-tag-bg)]/50 dark:bg-[color:var(--x-tag-dark-bg)]')
      }

      if (props.rounded) c.push('rounded-full')
      else c.push('rounded-lg')

      return c
    },
  },

  styles: ({ colors, props, css }) => {
    const color = !props.color || props.color === 'secondary'
      ? secondaryCssPalette
      : colors.getPalette(props.color)

    return css.variables({
      bg: color[100],
      text: color[800],
      border: secondaryCssPalette[200],
      dark: {
        bg: props.color === 'secondary' ? secondaryCssPalette[600] : color[900],
        border: color[700],
        text: color[200],
      },
    })
  },
}

export default theme
