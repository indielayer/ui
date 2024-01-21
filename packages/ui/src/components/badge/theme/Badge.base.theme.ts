import type { BadgeTheme } from '../Badge.vue'

const theme: BadgeTheme = {
  classes: {
    wrapper: 'inline-block',
  },

  styles({ props, colors, css }) {
    const color = colors.getPalette(props.color)

    return css.get('bg', color[500])
  },
}

export default theme
