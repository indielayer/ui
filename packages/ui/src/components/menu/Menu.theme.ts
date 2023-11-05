import type { ThemeClasses, ThemeComponent } from '../../composables/theme'
import type { MenuProps } from './Menu.vue'

type InternalClasses = 'wrapper'

interface InternalTheme extends ThemeComponent<MenuProps, InternalClasses> {}
export interface MenuTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<MenuProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: '',
  },
}

export default theme
