import type { AvatarTheme } from '../Avatar.vue'

const theme: AvatarTheme = {
  classes: {
    wrapper({ props, data }) {
      const classes = ['relative inline-flex items-center justify-center overflow-hidden align-middle box-content font-medium']

      // radius
      classes.push(props.rounded ? 'rounded-full' : 'rounded-lg')

      // Skip border when an image fills the avatar so the palette bg does not
      // show as a 1px ring in the border box. Keep border for outlined / fallbacks.
      if (!data.source || props.outlined) classes.push('border')

      // size @ 14px root: xs 26 / sm 30 / md 34 / lg 38 / xl 42 — match Button
      if (props.size === 'xs') classes.push('h-[calc(26/14*1rem)] w-[calc(26/14*1rem)] text-xs')
      else if (props.size === 'sm') classes.push('h-[calc(30/14*1rem)] w-[calc(30/14*1rem)] text-sm')
      else if (props.size === 'lg') classes.push('h-[calc(38/14*1rem)] w-[calc(38/14*1rem)] text-lg')
      else if (props.size === 'xl') classes.push('h-12 w-12 text-xl')
      else classes.push('h-[calc(34/14*1rem)] w-[calc(34/14*1rem)]')

      return classes
    },
  },

  styles({ props, colors, css }) {
    const color = colors.getPalette(props.color)

    return css.variables({
      bg: color[100],
      text: color[500],
      border: props.outlined ? color[600] : 'transparent',
      dark: {
        bg: color[950],
        text: color[300],
      },
    })
  },
}

export default theme
