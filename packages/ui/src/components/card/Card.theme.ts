import type { ThemeClasses, ThemeComponent } from '../../composables/theme'
import type { CardProps } from './Card.vue'

type InternalClasses = 'wrapper'

interface InternalTheme extends ThemeComponent<CardProps, InternalClasses> {}
export interface CardTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<CardProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: ({ props }) => `rounded bg-white dark:bg-gray-800${props.flat ? '' : ' shadow'}`,
  },
}

export default theme
