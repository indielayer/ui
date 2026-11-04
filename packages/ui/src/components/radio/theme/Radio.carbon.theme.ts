import type { RadioTheme } from  '../Radio.vue'

const theme: RadioTheme = {
  classes: {
    wrapper: ({ data }) => {
      const classes = ['inline-block relative cursor-pointer focus:outline-hidden focus-visible:outline-hidden group']

      if (data.isInsideForm && !data.isInsideFormGroup) classes.push('mb-8')

      return classes
    },

    circle: ({ props }) => {
      const classes = [
        'relative shrink-0 overflow-hidden rounded-full shadow-sm',
        'outline-offset-2 outline-primary-500 group-focus-visible:outline-2 group-focus-visible:outline',
      ]

      if (props.size === 'xs' || props.size === 'sm') classes.push('h-3 w-3')
      else if (props.size === 'xl') classes.push('h-5 w-5')
      else classes.push('h-4 w-4')

      return classes
    },

    circleIcon: '',

    label: 'text-sm text-secondary-800 dark:text-secondary-200 pl-2',

    content: 'pl-2',
  },

  styles: ({ props, colors, css, data }) => {
    const gray = colors.getPalette('gray')
    const color = colors.getPalette(props.color)
    const vars = []

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
      if (data.selected) {
        vars.push(css.variables({
          bg: gray[200],
          border: gray[200],
          circle: '#fff',
          dark: {
            bg: gray[700],
            border: gray[700],
            circle: gray[300],
          },
        }))
      } else {
        vars.push(css.variables({
          bg: gray[200],
          border: gray[200],
          dark: {
            bg: gray[700],
            border: gray[700],
          },
        }))
      }
    } else {
      if (data.selected) {
        vars.push(css.variables({
          bg: color[500],
          border: color[500],
          circle: '#fff',
          dark: {
            bg: color[500],
            border: color[500],
            circle: '#fff',
          },
        }))
      } else {
        vars.push(css.variables({
          bg: '#fff',
          border: props.glow ? color[300] : gray[900],
          dark: {
            bg: gray[900],
            border: props.glow ? color[300] : gray[300],
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

export default theme
