import type { RadioTheme } from '../Radio.vue'

const theme: RadioTheme = {
  classes: {
    wrapper: ({ data }) => {
      const classes = ['inline-block relative cursor-pointer focus:outline-hidden focus-visible:outline-hidden group']

      if (data.isInsideForm && !data.isInsideFormGroup) classes.push('mb-5')

      return classes
    },

    circle: ({ props }) => {
      const classes = [
        'relative shrink-0 overflow-hidden rounded-full shadow-xs',
        'outline-offset-2 outline-primary-500 group-focus-visible:outline-2 group-focus-visible:outline',
      ]

      if (props.size === 'xs') classes.push('size-4')
      else if (props.size === 'sm') classes.push('size-4.5')
      else if (props.size === 'lg') classes.push('size-5.5')
      else if (props.size === 'xl') classes.push('size-6')
      else classes.push('size-5')

      return classes
    },

    circleIcon: '',

    label: ({ props, data }) => {
      let c = 'text-secondary-800 dark:text-secondary-200 pl-2'

      c += data.isInsideFormGroup ? ' font-normal' : ' font-medium'

      if (props.size === 'xs') c += ' text-xs'
      else if (props.size === 'sm') c += ' text-sm'
      else if (props.size === 'xl') c += ' text-base'

      return c
    },

    content: ({ props }) => {
      let c = 'pl-2'

      if (props.size === 'xs') c += ' text-xs'
      else if (props.size === 'sm') c += ' text-sm'
      else if (props.size === 'xl') c += ' text-base'

      return c
    },
  },

  styles: ({ props, colors, css, data }) => {
    const gray = colors.getPalette('gray')
    const secondary = colors.getPalette('secondary')
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
          border: props.glow ? color[300] : gray[300],
          dark: {
            bg: secondary[800],
            border: props.glow ? color[300] : secondary[600],
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
