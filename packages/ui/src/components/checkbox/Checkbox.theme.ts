import type { ThemeParams } from '../../composables/theme'

export default {
  classes: {
    wrapper: 'inline-block relative cursor-pointer align-middle',

    box: ({ props }: ThemeParams) => {
      const classes = ['rounded flex justify-center items-center shrink-0 border-2 border-[color:var(--x-checkbox-border)] bg-[color:var(--x-checkbox-bg)] dark:border-[color:var(--x-checkbox-dark-border)] dark:bg-[color:var(--x-checkbox-dark-bg)]']

      if (props.size === 'xs' || props.size === 'sm') classes.push('h-4 w-4')
      else if (props.size === 'xl') classes.push('h-6 w-6')
      else classes.push('h-5 w-5')

      return classes
    },

    icon: ({ props }: ThemeParams) => {
      const classes = ['fill-current text-white dark:text-gray-900']

      if (props.size === 'xs' || props.size === 'sm') classes.push('h-2 w-2')
      else if (props.size === 'xl') classes.push('h-4 w-4')
      else classes.push('h-3 w-3')

      return classes
    },

    label: ({ props }: ThemeParams) => {
      const classes = ['inline-block font-medium text-gray-800 dark:text-gray-200 pl-2']

      if (props.size === 'xs') classes.push('text-xs')
      else if (props.size === 'sm') classes.push('text-sm')
      else if (props.size === 'lg') classes.push('text-lg')
      else if (props.size === 'xl') classes.push('text-xl')

      return classes
    },
  },

  styles({ props, colors, css, data }: ThemeParams) {
    const gray = colors.getPalette('gray')
    const color = colors.getPalette(props.color)
    const vars: (object | string)[] = []

    if (props.loading) {
      return css.variables({
        bg: 'transparent',
        border: 'transparent',
        dark: {
          bg: 'transparent',
          border: 'transparent',
        },
      })
    }

    if (props.disabled) {
      vars.push(css.variables({
        bg: gray[100],
        border: gray[200],
        dark: {
          bg: gray[800],
          border: gray[700],
        },
      }))
    } else {
      if (data.checked) {
        vars.push(css.variables({
          bg: color[500],
          border: color[500],
          dark: {
            bg: color[500],
            border: color[500],
          },
        }))
      } else {
        vars.push(css.variables({
          bg: '#fff',
          border: props.glow ? color[300] : gray[300],
          dark: {
            bg: gray[900],
            border: props.glow ? color[300] : gray[400],
          },
        }))
      }

      if (props.glow) {
        vars.push(css.get('glow', colors.getColorOpacity(color[500], 0.5)))
      }
    }

    return vars
  },
}
