import type { ThemeClasses, ThemeComponent } from '../../composables/theme'
import type { ButtonGroupProps } from './ButtonGroup.vue'

type InternalClasses = 'wrapper'
type InternalExtraData = { isButtonGroupGroup: boolean; }

interface InternalTheme extends ThemeComponent<ButtonGroupProps, InternalClasses, InternalExtraData> {}
export interface ButtonGroupTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<ButtonGroupProps, InternalClasses, InternalExtraData>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: 'inline-flex align-middle relative -space-x-[1px]',
  },
}

export default theme
