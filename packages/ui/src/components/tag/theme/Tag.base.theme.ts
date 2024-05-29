import type { TagTheme } from '../Tag.vue'

const theme: TagTheme = {
  classes: {
    wrapper: ({ props }) => {
      let c = 'inline-flex leading-tight max-w-full'

      if (props.size === 'xs') c += ' px-2 py-0.5 text-xs'
      else if (props.size === 'sm') c += ' px-2 py-0.5 text-sm'
      else if (props.size === 'lg') c += ' px-4 py-2 text-lg'
      else if (props.size === 'xl') c += ' px-5 py-3 text-xl'
      else c += ' px-3 py-1.5'

      return c
    },
  },

  styles: ({ colors, props, css }) => {
    const color = colors.getPalette(props.color)

    return css.variables({
      bg: color[200],
      text: color[800],
      border: color[800],
      dark: {
        bg: color[800],
        border: color[400],
        text: props.outlined ? color[200] : color[100],
      },
    })
  },
}

export default theme
