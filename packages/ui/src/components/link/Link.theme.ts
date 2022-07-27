import type { ThemeParams } from '../../composables/theme'

export default {
  classes: {
    wrapper: 'transition duration-300 ease-in-out cursor-pointer inline-flex',
  },

  styles: ({ colors, props, css }: ThemeParams) => {
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
