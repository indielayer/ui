import type { SliderTheme } from '../Slider.vue'

const theme: SliderTheme = {
  classes: {
    wrapper: ({ props }) => {
      const classes = []

      if (props.disabled) classes.push('cursor-not-allowed')

      return classes
    },
    input: 'w-[calc(100%+0.65rem)] -ml-1 h-5 disabled:cursor-not-allowed',
    track: 'h-1.5 top-1/2 -translate-y-1/2 bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden',
    progress: 'h-full bg-[color:var(--x-slider-bg)]',
    mark: 'absolute top-0 py-0 border-0 bg-transparent leading-none disabled:cursor-not-allowed disabled:opacity-60',
    markLabel: 'text-xs leading-4 text-secondary-500 dark:text-secondary-400 whitespace-nowrap select-none cursor-pointer hover:text-secondary-700 dark:hover:text-secondary-200',
    valueTooltip: 'bg-secondary-700 shadow-md rounded-md px-2 py-1 text-white text-xs font-medium w-max max-w-sm leading-none',
  },

  styles: ({ props, colors, css }) => {
    const color = colors.getPalette(props.color)

    return css.variables({
      bg: color[500],
    })
  },
}

export default theme
