import type { CheckboxTheme } from '../Checkbox.vue'

const theme: CheckboxTheme = {
  classes: {
    wrapper: ({ data }) => {
      const classes = ['inline-block relative cursor-pointer align-middle']

      if (data.isInsideForm && !data.isInsideFormGroup) classes.push('mb-5')
      else if (data.isInsideFormGroup) classes.push('mt-1')

      return classes
    },

    box: ({ props }) => {
      const classes = [
        'relative shrink-0 overflow-hidden rounded shadow-xs',
        'outline-offset-2 outline-primary-500 group-focus-visible:outline-2 group-focus-visible:outline',
      ]

      if (props.size === 'xs') classes.push('size-4')
      else if (props.size === 'sm') classes.push('size-4.5')
      else if (props.size === 'lg') classes.push('size-5.5')
      else if (props.size === 'xl') classes.push('size-6')
      else classes.push('size-5')

      return classes
    },

    content: ({ props }) => {
      const classes = ['flex items-center group focus:outline-hidden focus-visible:outline-hidden']

      if (props.disabled) classes.push('cursor-not-allowed')

      return classes
    },

    icon: ({ props }) => {
      // Color only — size comes from the parent 16×16 SVG
      const classes = []

      if (props.disabled) classes.push('text-secondary-400 dark:text-secondary-500')
      else classes.push('text-white')

      return classes
    },

    label: ({ props, data }) => {
      const classes = ['inline-block text-secondary-800 dark:text-secondary-200 pl-2']

      classes.push(data.isInsideFormGroup ? 'font-normal' : 'font-medium')

      if (props.size === 'xs') classes.push('text-xs')
      else if (props.size === 'sm') classes.push('text-sm')
      else if (props.size === 'xl') classes.push('text-base')
      else classes.push('text-sm')

      return classes
    },
  },

  styles({ props, colors, css, data }) {
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
      vars.push(css.variables({
        bg: gray[100],
        border: gray[200],
        dark: {
          bg: gray[600],
          border: gray[500],
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
