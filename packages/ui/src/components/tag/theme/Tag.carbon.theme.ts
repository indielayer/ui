import type { TagTheme } from '../Tag.vue'

const theme: TagTheme = {
  classes: {
    wrapper: ({ props }) => {
      let c = 'inline-flex items-center leading-none max-w-full '

      if (props.size === 'xs' || props.size === 'sm') c += ' px-2 py-0.5 text-xs'
      else if (props.size === 'lg') c += ' px-4 py-3'
      else if (props.size === 'xl') c += ' px-5 py-5 text-lg'
      else c += ' px-3 py-1 text-sm'

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
