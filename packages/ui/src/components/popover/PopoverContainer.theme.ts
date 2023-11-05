import type { ThemeClasses, ThemeComponent } from '../../composables/theme'
import type { PopoverContainerProps } from './PopoverContainer.vue'

type InternalClasses = 'wrapper'

interface InternalTheme extends ThemeComponent<PopoverContainerProps, InternalClasses> {}
export interface PopoverContainerTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<PopoverContainerProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: 'block w-full bg-white dark:bg-gray-700 shadow-lg rounded-md border  border-gray-200 dark:border-gray-800',
  },
}

export default theme
