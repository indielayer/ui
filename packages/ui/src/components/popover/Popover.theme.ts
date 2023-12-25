import type { ThemeClasses, ThemeComponent } from '../../composables/useTheme'
import type { PopoverProps } from './Popover.vue'

type InternalClasses = 'wrapper' | 'content'

interface InternalTheme extends ThemeComponent<PopoverProps, InternalClasses> {}
export interface PopoverTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<PopoverProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: 'inline-block relative',

    content: 'max-w-xs',
  },
}

export default theme
