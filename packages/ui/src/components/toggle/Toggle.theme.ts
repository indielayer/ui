import type { ThemeClasses, ThemeComponent } from '../../composables/theme'
import type { ToggleProps } from './Toggle.vue'

type InternalClasses = 'wrapper' | 'label' | 'buttonWrapper' | 'button'

interface InternalTheme extends ThemeComponent<ToggleProps, InternalClasses> {}
export interface ToggleTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<ToggleProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: '',

    label: ({ props }) => {
      const c = 'font-medium text-gray-800 dark:text-gray-200'

      if (props.size === 'xs') return c + ' text-xs'
      else if (props.size === 'sm') return c + ' text-sm'
      else if (props.size === 'lg') return c + ' text-lg'
      else if (props.size === 'xl') return c + ' text-xl'

      return c + ' text-sm'
    },

    buttonWrapper: ({ props }) => {
      let c = 'relative shrink-0'

      if (props.size === 'sm' || props.size === 'xs') c += ' w-6'
      else if (props.size === 'lg') c += ' w-10'
      else if (props.size === 'xl') c += ' w-12'
      else c += ' w-8'

      return c
    },

    button: ({ props }) => {
      let c = 'rounded-full shadow transform transition duration-150 shrink-0'

      if (props.size === 'sm' || props.size === 'xs') c += ' h-3 w-3'
      else if (props.size === 'lg') c += ' h-5 w-5'
      else if (props.size === 'xl') c += ' h-6 w-6'
      else c += ' h-4 w-4'

      return c
    },
  },

  styles: ({ colors, props, css }) => {
    const color = colors.getPalette(props.color)

    return css.variables({
      bg: color[500],
      dark: {
        bg: color[600],
      },
    })
  },
}

export default theme
