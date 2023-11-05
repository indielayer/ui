import type { ThemeClasses, ThemeComponent } from '../../composables/theme'
import type { DividerProps } from './Divider.vue'

type InternalClasses = 'wrapper' | 'label' | 'line'

interface InternalTheme extends ThemeComponent<DividerProps, InternalClasses> {}
export interface DividerTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<DividerProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: ({ props }) => `flex justify-center items-center ${props.vertical ? 'h-full flex-col' : 'w-full'}`,

    label: 'font-medium text-sm text-gray-600 dark:text-gray-300',

    line: 'bg-gray-200 dark:bg-slate-700 flex-grow',
  },
}

export default theme
