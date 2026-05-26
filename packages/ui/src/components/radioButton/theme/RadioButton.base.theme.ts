import type { RadioButtonTheme } from '../RadioButton.vue'

const theme: RadioButtonTheme = {
  classes: {
    wrapper({ props, data }) {
      const classes = [
        'relative inline-flex items-center justify-center cursor-pointer select-none',
        'transition duration-150 font-medium whitespace-nowrap border',
        'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-secondary-300',
        'active:!shadow-none',
      ]

      if (props.size === 'xs') classes.push('py-1 px-2 text-xs')
      else if (props.size === 'sm') classes.push('py-1.5 px-3 text-sm')
      else if (props.size === 'lg') classes.push('py-3 px-5 text-lg')
      else if (props.size === 'xl') classes.push('py-4 px-6 text-xl')
      else classes.push('py-2 px-4 text-sm')

      if (!data.isInsideFormGroup) classes.push(props.rounded ? 'rounded-full' : 'rounded-md')

      if (!props.flat && !props.light && !props.ghost && !props.disabled && !props.loading) {
        classes.push('shadow-xs')
      }

      if (props.disabled) classes.push('cursor-not-allowed')
      else if (props.loading) classes.push('cursor-default')

      return classes
    },
  },

  styles({ props, colors, css, data }) {
    const gray = colors.getPalette('gray')
    const color = colors.getPalette(props.color)
    const isLight = props.color && props.light

    if (props.disabled) {
      if (isLight) {
        return css.variables({
          bg: color[50],
          text: color[200],
          border: 'transparent',
          dark: {
            bg: gray[800],
            text: color[900],
            border: 'transparent',
          },
        })
      }

      return css.variables({
        bg: gray[50],
        text: gray[300],
        border: gray[200],
        dark: {
          bg: gray[900],
          text: gray[600],
          border: gray[700],
        },
      })
    }

    if (isLight) {
      if (data.selected) {
        return css.variables({
          bg: color[500],
          text: '#fff',
          border: props.outlined ? color[600] : 'transparent',
          hover: { bg: color[600] },
          dark: {
            bg: color[600],
            text: '#fff',
            border: props.outlined ? color[700] : 'transparent',
            hover: { bg: color[700] },
          },
        })
      }

      return css.variables({
        bg: color[50],
        text: color[600],
        border: props.outlined ? color[500] : 'transparent',
        hover: { bg: color[100] },
        active: { bg: color[200] },
        dark: {
          bg: color[900],
          text: color[200],
          border: props.outlined ? color[500] : 'transparent',
          hover: { bg: color[800] },
          active: { bg: color[700] },
        },
      })
    }

    if (props.outlined) {
      if (data.selected) {
        return css.variables({
          bg: color[500],
          text: '#fff',
          border: color[600],
          hover: { bg: color[600] },
          dark: {
            bg: color[600],
            text: '#fff',
            border: color[700],
            hover: { bg: color[700] },
          },
        })
      }

      return css.variables({
        text: color[600],
        border: color[600],
        hover: { bg: color[100] },
        active: { bg: color[200] },
        dark: {
          text: color[500],
          border: color[500],
          hover: { bg: gray[800] },
          active: { bg: gray[700] },
        },
      })
    }

    if (data.selected) {
      return css.variables({
        bg: color[500],
        text: '#fff',
        border: color[600],
        hover: { bg: color[600] },
        dark: {
          bg: color[600],
          text: '#fff',
          border: color[700],
          hover: { bg: color[700] },
        },
      })
    }

    return css.variables({
      bg: '#fff',
      text: gray[700],
      border: gray[300],
      hover: { bg: gray[50], border: gray[400] },
      dark: {
        bg: gray[800],
        text: gray[300],
        border: gray[600],
        hover: { bg: gray[700], border: gray[500] },
      },
    })
  },
}

export default theme
