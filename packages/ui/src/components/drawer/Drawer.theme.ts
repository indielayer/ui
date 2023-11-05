import type { ThemeClasses, ThemeComponent } from '../../composables/theme'
import type { DrawerProps } from './Drawer.vue'

type InternalClasses = 'wrapper' | 'backdrop'

interface InternalTheme extends ThemeComponent<DrawerProps, InternalClasses> {}
export interface DrawerTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<DrawerProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: 'flex flex-col max-h-full bg-white dark:bg-gray-800',

    backdrop: 'duration-150 ease-in-out',
  },
}

export default theme
