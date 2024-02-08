import type { RadioTheme } from '../Radio.vue'

const theme: RadioTheme = {
  classes: {
    wrapper: ({ data }) => {
      const classes = ['inline-block relative cursor-pointer focus:outline-none group']

      if (data.isInsideForm && !data.isInsideFormGroup) classes.push('mb-5')

      return classes
    },

    circle: ({ props }) => {
      const classes = ['rounded-full flex justify-center items-center shrink-0 border outline-offset-2 outline-slate-300 dark:outline-slate-500 group-focus:outline-1 group-focus:outline']

      if (props.size === 'lg') classes.push('h-5 w-5')
      else if (props.size === 'xl') classes.push('h-6 w-6')
      else classes.push('h-4 w-4')

      return classes
    },

    circleIcon: ({ props, data }) => {
      const c = []

      if (!data.selected) c.push('opacity-0')

      if (props.size === 'sm' || props.size === 'xs') c.push('h-2')
      else if (props.size === 'lg') c.push('h-2.5')
      else if (props.size === 'xl') c.push('h-3')
      else c.push('h-2')

      return c
    },

    label: ({ props, data }) => {
      let c = 'text-secondary-800 dark:text-secondary-200 pl-2'

      c += data.isInsideFormGroup ? ' font-normal' : ' font-medium'

      if (props.size === 'xs') c += ' text-xs'
      else if (props.size === 'sm') c += ' text-sm'
      else if (props.size === 'lg') c += ' text-lg'
      else if (props.size === 'xl') c += ' text-xl'

      return c
    },

    content: ({ props }) => {
      let c = 'pl-2'

      if (props.size === 'xs') c += ' text-xs'
      else if (props.size === 'sm') c += ' text-sm'
      else if (props.size === 'lg') c += ' text-lg'
      else if (props.size === 'xl') c += ' text-xl'

      return c
    },
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

export default theme
