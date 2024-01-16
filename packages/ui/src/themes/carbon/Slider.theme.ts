import type { SliderTheme } from '../../components/slider'

const theme: SliderTheme = {
  classes: {
    wrapper: 'inline-block align-bottom text-left focus:outline-none',

    label: 'text-xs text-gray-500 dark:text-gray-200 mb-1',

    drag: 'w-[16px] h-[16px] -mt-[11px] -ml-[8px] rounded-full bg-gray-900',
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
