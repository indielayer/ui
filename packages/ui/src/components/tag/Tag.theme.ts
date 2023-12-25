import type { ThemeClasses, ThemeComponent } from '../../composables/useTheme'
import type { TagProps } from './Tag.vue'

type InternalClasses = 'wrapper' | 'loadingWrapper'

interface InternalTheme extends ThemeComponent<TagProps, InternalClasses> {}
export interface TagTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<TagProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: ({ props, data }) => {
      let c = 'inline-flex items-center leading-none max-w-full'

      if (props.size === 'xs') c += ' px-2 py-1 text-xs'
      else if (props.size === 'sm') c += ' px-2 py-1 text-sm'
      else if (props.size === 'lg') c += ' px-4 py-3 text-lg'
      else if (props.size === 'xl') c += ' px-6 py-6 text-xl'
      else c += ' px-3 py-2'

      return c
    },

    loadingWrapper: 'absolute inset-0 flex items-center justify-center z-40 bg-gray-300 dark:bg-gray-600 rounded opacity-50',
  },

  styles: ({ colors, props, css }) => {
    const color = colors.getPalette(props.color)

    return css.variables({
      bg: color[100],
      text: color[800],
      border: color[800],
      dark: {
        text: props.outlined ? color[200] : color[800],
      },
    })
  },
}

export default theme
