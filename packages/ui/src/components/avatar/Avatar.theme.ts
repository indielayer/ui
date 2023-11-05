import type { Ref } from 'vue'
import type { ThemeClasses, ThemeComponent } from '../../composables/theme'
import type { AvatarProps } from './Avatar.vue'

type InternalClasses = 'wrapper'
type InternalExtraData = { source: Ref<string | undefined>; }

interface InternalTheme extends ThemeComponent<AvatarProps, InternalClasses, InternalExtraData> {}
export interface AvatarTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<AvatarProps, InternalClasses, InternalExtraData>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper({ props }) {
      const classes = ['relative inline-flex items-center justify-center overflow-hidden align-middle border box-content']

      // radius
      classes.push(props.rounded ? 'rounded-full' : 'rounded-md')

      // size
      if (props.size === 'xs') classes.push('h-6 w-6 text-xs')
      else if (props.size === 'sm') classes.push('h-9 w-9 text-sm')
      else if (props.size === 'lg') classes.push('h-12 w-12 text-lg')
      else if (props.size === 'xl') classes.push('h-[3.75rem] w-[3.75rem] text-xl')
      else classes.push('h-10 w-10')

      return classes
    },
  },

  styles({ props, colors, css, data }) {
    const color = colors.getPalette(props.color)

    if (data.source) return css.variables({
      bg: 'transparent',
      border: props.outlined ? color[500] : 'transparent',
    })

    return css.variables({
      bg: color[100],
      text: color[500],
      border: props.outlined ? color[500] : 'transparent',
      dark: {
        bg: color[900],
      },
    })
  },
}

export default theme
