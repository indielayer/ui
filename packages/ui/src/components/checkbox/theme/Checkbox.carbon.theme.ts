import type { CheckboxTheme } from '../Checkbox.vue'

const theme: CheckboxTheme = {
  classes: {
    wrapper: ({ data }) => {
      const classes = ['inline-block relative cursor-pointer align-middle']

      if (data.isInsideForm && !data.isInsideFormGroup) classes.push('mb-8')

      return classes
    },

    box: ({ props }) => {
      const classes = ['rounded-sm flex justify-center items-center shrink-0 border border-[color:var(--x-checkbox-border)] bg-[color:var(--x-checkbox-bg)] dark:border-[color:var(--x-checkbox-dark-border)] dark:bg-[color:var(--x-checkbox-dark-bg)] mt-0.5']

      if (props.size === 'xs' || props.size === 'sm') classes.push('h-3 w-3')
      else if (props.size === 'xl') classes.push('h-5 w-5')
      else classes.push('h-4 w-4')

      return classes
    },

    content: ({ props }) => {
      const classes = ['flex']

      if (props.disabled) classes.push('cursor-not-allowed')

      return classes
    },

    icon: ({ props }) => {
      const classes = ['fill-current text-white dark:text-secondary-900']

      if (props.size === 'xs' || props.size === 'sm') classes.push('h-2 w-2')
      else if (props.size === 'xl') classes.push('h-3.5 w-3.5')
      else classes.push('h-2.5 w-2.5')

      return classes
    },

    label: ({ props }) => {
      const classes = ['text-secondary-800 dark:text-secondary-200 pl-2 text-sm']

      if (props.size === 'xs') classes.push('text-xs')
      else if (props.size === 'sm') classes.push('text-sm')
      else if (props.size === 'lg') classes.push('text-lg')
      else if (props.size === 'xl') classes.push('text-xl')

      return classes
    },
  },

  styles({ props, colors, css, data }) {
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
