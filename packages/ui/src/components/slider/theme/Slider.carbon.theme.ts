import type { SliderTheme } from '../Slider.vue'

const theme: SliderTheme = {
  classes: {
    wrapper: '',

    drag: 'w-[16px] h-[16px] -mt-[11px] -ml-[8px] rounded-full bg-gray-900 dark:bg-gray-100',
  },

  styles: ({ props, colors, css }) => {
    const primary = colors.getPalette('primary')
    const color = colors.getPalette(props.color)

    return css.variables({
      bg: color[500],
      border: primary[500],
    })
  },
}

export default theme
