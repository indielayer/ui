import type { ThemeClasses, ThemeComponent } from '../../composables/theme'
import type { PaginationProps } from './Pagination.vue'

type InternalClasses = 'wrapper' | 'dots'

interface InternalTheme extends ThemeComponent<PaginationProps, InternalClasses> {}
export interface PaginationTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<PaginationProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: ({ props }) => {
      if (props.variant === 'simple') return 'flex items-center space-x-2'
      else if (props.variant === 'dots') return 'flex space-x-6'

      return 'flex items-center' // quick variant
    },

    dots: ({ props }) => {
      if (props.size === 'xs') return 'h-2 w-2'
      else if (props.size === 'sm') return 'h-3 w-3'
      else if (props.size === 'lg') return 'h-4 w-4'
      else if (props.size === 'xl') return 'h-5 w-5'

      return 'h-3 w-3'
    },
  },

  styles: ({ props, css, colors }) => {
    const color = colors.getPalette('primary')

    return css.get('bg', color[500])
  },
}

export default theme
