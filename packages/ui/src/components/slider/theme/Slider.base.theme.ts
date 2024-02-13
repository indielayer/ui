import type { SliderTheme } from '../Slider.vue'

const theme: SliderTheme = {
  classes: {
    wrapper: ({ props }) => {
      const classes = []

      if (props.disabled) classes.push('cursor-not-allowed')

      return classes
    },
    input: 'w-[calc(100%+0.65rem)] -ml-1 disabled:cursor-not-allowed',
    track: 'h-1.5 bg-secondary-200 dark:bg-secondary-700 rounded-md overflow-hidden',
    progress: 'h-full bg-[color:var(--x-slider-bg)]',
  },

  styles: ({ props, colors, css }) => {
    const color = colors.getPalette(props.color)

    return css.variables({
      bg: color[400],
    })
  },
}

export default theme
