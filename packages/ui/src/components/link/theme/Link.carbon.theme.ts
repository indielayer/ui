import type { LinkTheme } from '../Link.vue'

const theme: LinkTheme = {
  classes: {
    wrapper: 'transition duration-300 ease-in-out cursor-pointer inline-flex text-sm',
  },

  styles: ({ colors, props, css }) => {
    const color = colors.getPalette(props.color || 'gray')

    return css.variables({
      text: props.color ? color[600] : '',
      hover: {
        text: !props.shadow ? color[700] : '',
      },
      shadow: color[100],
      dark: {
        text: props.color ? color[400] : '',
        hover: {
          text: color[300],
        },
        shadow: color[900],
      },
    })
  },
}

export default theme
