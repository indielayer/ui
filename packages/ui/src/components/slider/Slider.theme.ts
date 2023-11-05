import type { ThemeClasses, ThemeComponent } from '../../composables/theme'
import type { SliderProps } from './Slider.vue'

type InternalClasses = 'wrapper' | 'label' | 'drag'

interface InternalTheme extends ThemeComponent<SliderProps, InternalClasses> {}
export interface SliderTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<SliderProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: 'inline-block align-bottom text-left focus:outline-none',

    label: ({ props }) => {
      let c = 'font-medium text-gray-800 dark:text-gray-200 mb-1'

      if (props.size === 'xs') c += ' text-xs'
      else if (props.size === 'sm') c += ' text-sm'
      else if (props.size === 'lg') c += ' text-lg'
      else if (props.size === 'xl') c += ' text-xl'

      return c
    },

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
