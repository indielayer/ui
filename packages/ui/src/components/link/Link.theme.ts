import type { ThemeClasses, ThemeComponent } from '../../composables/useTheme'
import type { LinkProps } from './Link.vue'

type InternalClasses = 'wrapper'

interface InternalTheme extends ThemeComponent<LinkProps, InternalClasses> {}
export interface LinkTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<LinkProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: 'transition duration-300 ease-in-out cursor-pointer inline-flex',
  },

  styles: ({ colors, props, css }) => {
    const color = colors.getPalette(props.color || 'gray')

    return css.variables({
      text: props.color ? color[600] : '',
      hover: {
        text: !props.shadow ? color[700] : '',
      },
      shadow: color[100],
      dark: {
        text: props.color ? color[400] : '',
        hover: {
          text: color[300],
        },
        shadow: color[900],
      },
    })
  },
}

export default theme
