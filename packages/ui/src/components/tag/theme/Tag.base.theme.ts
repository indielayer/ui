import type { TagTheme } from '../Tag.vue'

const theme: TagTheme = {
  classes: {
    wrapper: ({ props }) => {
      const c = ['inline-flex leading-tight max-w-full']

      if (props.size === 'xs') c.push('px-2 py-0.5 text-xs')
      else if (props.size === 'sm') c.push(' px-2 py-0.5 text-sm')
      else if (props.size === 'lg') c.push(' px-4 py-2 text-lg')
      else if (props.size === 'xl') c.push(' px-5 py-3 text-xl')
      else c.push(' px-3 py-1.5')

      if (props.outlined) {
        c.push('border-[color:var(--x-tag-border)] dark:border-[color:var(--x-tag-dark-border)]')
      }

      if (props.filled || !props.outlined) {
        if (props.filled) c.push('bg-[color:var(--x-tag-bg)] dark:bg-[color:var(--x-tag-dark-bg)]')
      }

      if (props.rounded) c.push('rounded-full')
      else c.push('rounded-md')

      return c
    },
  },

  styles: ({ colors, props, css }) => {
    const color = colors.getPalette(props.color)

    return css.variables({
      bg: color[100],
      text: color[800],
      border: color[700],
      dark: {
        bg: color[600],
        border: color[500],
        text: color[100],
      },
    })
  },
}

export default theme
