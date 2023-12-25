import type { ThemeClasses, ThemeComponent } from '../../composables/useTheme'
import type { ScrollProps } from './Scroll.vue'

type InternalClasses = 'wrapper'

interface InternalTheme extends ThemeComponent<ScrollProps, InternalClasses> {}
export interface ScrollTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<ScrollProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: '',
  },
}

export default theme
