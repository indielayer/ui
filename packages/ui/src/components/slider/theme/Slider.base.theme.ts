import type { SliderTheme } from '../Slider.vue'

const theme: SliderTheme = {
  classes: {
    wrapper: '',

    drag: 'w-[20px] h-[20px] -mt-[13px] -ml-[10px] rounded-full bg-white border shadow-sm',
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
