import type { ThemeClasses, ThemeComponent } from '../../composables/useTheme'
import type { IconProps } from './Icon.vue'

type InternalClasses = 'wrapper'

interface InternalTheme extends ThemeComponent<IconProps, InternalClasses> {}
export interface IconTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<IconProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: ({ props }) => {
      const classes = 'inline'

      if (props.size === 'xs') return classes + ' h-3 w-3'
      else if (props.size === 'sm') return classes + ' h-4 w-4'
      else if (props.size === 'lg') return classes + ' h-6 w-6'
      else if (props.size === 'xl') return classes + ' h-9 w-9'

      return classes + ' h-5 w-5'
    },
  },
}

export default theme
