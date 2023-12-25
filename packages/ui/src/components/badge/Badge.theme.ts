import type { ThemeClasses, ThemeComponent } from '../../composables/useTheme'
import type { BadgeProps } from './Badge.vue'

type InternalClasses = 'wrapper'

interface InternalTheme extends ThemeComponent<BadgeProps, InternalClasses> {}
export interface BadgeTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<BadgeProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: 'inline-block',
  },

  styles({ props, colors, css }) {
    const color = colors.getPalette(props.color)

    return css.get('bg', color[500])
  },
}

export default theme
