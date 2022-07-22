import type { ThemeParams } from '../../composables/theme'

export default {
  classes: {
    wrapper: 'inline-block align-bottom text-left focus:outline-none',

    label: ({ props }: ThemeParams) => {
      let c = 'font-medium text-gray-800 dark:text-gray-200 mb-1'

      if (props.size === 'xs') c += ' text-xs'
      else if (props.size === 'sm') c += ' text-sm'
      else if (props.size === 'lg') c += ' text-lg'
      else if (props.size === 'xl') c += ' text-xl'

      return c
    },

    drag: 'w-[20px] h-[20px] -mt-[13px] -ml-[10px] rounded-full bg-white border shadow-sm',
  },

  styles: ({ props, colors, css }: ThemeParams) => {
    const primary = colors.getPalette('primary')
    const color = colors.getPalette(props.color)

    return css.variables({
      bg: color[500],
      border: primary[500],
    })
  },
}
