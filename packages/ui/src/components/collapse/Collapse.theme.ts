import type { ThemeClasses, ThemeComponent } from '../../composables/useTheme'
import type { CollapseProps } from './Collapse.vue'

type InternalClasses = 'wrapper' | 'icon' | 'content'

interface InternalTheme extends ThemeComponent<CollapseProps, InternalClasses> {}
export interface CollapseTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<CollapseProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: ({ props }) => `relative flex items-center ${props.icon ?  'flex-row-reverse' : ''} ${props.disabled ? '' : 'cursor-pointer'}`,

    icon: 'absolute top-1/2 transform -translate-y-1/2 right-3',

    content: 'transition-[height] duration-150 overflow-y-hidden',
  },
}

export default theme
