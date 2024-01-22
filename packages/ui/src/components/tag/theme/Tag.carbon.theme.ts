import type { TagTheme } from '../Tag.vue'

const theme: TagTheme = {
  classes: {
    wrapper: ({ props }) => {
      let c = 'inline-flex items-center leading-none max-w-full '

      if (props.size === 'xs' || props.size === 'sm') c += ' px-2 py-1 text-xs'
      else if (props.size === 'lg') c += ' px-4 py-3'
      else if (props.size === 'xl') c += ' px-5 py-5 text-lg'
      else c += ' px-3 py-2 text-sm'

      return c
    },

    loadingWrapper: 'absolute inset-0 flex items-center justify-center z-40 bg-gray-300 dark:bg-gray-600 rounded opacity-50',
  },

  styles: ({ colors, props, css }) => {
    const color = colors.getPalette(props.color)

    return css.variables({
      bg: color[200],
      text: color[800],
      border: color[800],
      dark: {
        bg: color[700],
        text: props.outlined ? color[200] : color[800],
      },
    })
  },
}

export default theme
