import type { ThemeClasses, ThemeComponent } from '../../composables/theme'
import type { ImageProps } from './Image.vue'

type InternalClasses = 'wrapper'

interface InternalTheme extends ThemeComponent<ImageProps, InternalClasses> {}
export interface ImageTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<ImageProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: '',
  },
}

export default theme
