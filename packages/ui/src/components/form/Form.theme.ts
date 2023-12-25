import type { ThemeClasses, ThemeComponent } from '../../composables/useTheme'
import type { FormProps } from './Form.vue'

type InternalClasses = 'wrapper'

interface InternalTheme extends ThemeComponent<FormProps, InternalClasses> {}
export interface FormTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<FormProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: '',
  },
}

export default theme
