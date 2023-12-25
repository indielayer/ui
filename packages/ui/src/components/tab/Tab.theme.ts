import type { ThemeClasses, ThemeComponent } from '../../composables/useTheme'
import type { TabProps } from './Tab.vue'
import type { TabGroupInjection } from './TabGroup.vue'

type InternalClasses = 'wrapper' | 'label' | 'icon'
type InternalExtraData = Pick<TabGroupInjection, 'state'>['state']

interface InternalTheme extends ThemeComponent<TabProps, InternalClasses, InternalExtraData> {}
export interface TabTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<TabProps, InternalClasses, InternalExtraData>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: ({ props, data }) => {
      const c = ['py-2 transition-colors duration-150 ease-in-out whitespace-nowrap text-center']

      if (data.variant === 'block') c.push('px-8')

      if (props.size === 'xs') c.push('text-xs')
      else if (props.size === 'sm') c.push('text-sm')
      else if (props.size === 'lg') c.push('text-lg')
      else if (props.size === 'xl') c.push('text-xl')

      return c
    },

    label: '',

    icon: 'mr-1.5',
  },
}

export default theme
