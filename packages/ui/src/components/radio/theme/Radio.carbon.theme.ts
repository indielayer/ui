import type { RadioTheme } from  '../Radio.vue'

const theme: RadioTheme = {
  classes: {
    wrapper: ({ data }) => {
      const classes = ['inline-block relative cursor-pointer focus:outline-none group']

      if (data.isInsideForm && !data.isInsideFormGroup) classes.push('mb-8')

      return classes
    },

    circle: ({ props }) => {
      const classes = ['rounded-full flex justify-center items-center shrink-0 border outline-offset-2 outline-slate-300 dark:outline-slate-500 group-focus:outline-1 group-focus:outline']

      if (props.size === 'xs' || props.size === 'sm') classes.push('h-3 w-3')
      else if (props.size === 'xl') classes.push('h-5 w-5')
      else classes.push('h-4 w-4')

      return classes
    },

    circleIcon: ({ props, data }) => {
      const c = []

      if (!data.selected) c.push('opacity-0')

      else if (props.size === 'lg') c.push('h-2.5')
      else if (props.size === 'xl') c.push('h-3')
      else c.push('h-2')

      return c
    },

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
          bg: 'transparent',
          border: gray[200],
          circle: gray[200],
          dark: {
            bg: 'transparent',
            border: gray[700],
            circle: gray[700],
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
          bg: 'transparent',
          border: color[500],
          circle: color[500],
          dark: {
            bg: 'transparent',
            border: color[500],
            circle: color[500],
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
