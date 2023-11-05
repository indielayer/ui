import type { ThemeClasses, ThemeComponent } from '../../composables/theme'
import type { ContainerProps } from './Container.vue'

type InternalClasses = 'wrapper'

interface InternalTheme extends ThemeComponent<ContainerProps, InternalClasses> {}
export interface ContainerTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<ContainerProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: 'max-w-screen-2xl mx-auto px-4 md:px-8',
  },
}

export default theme
