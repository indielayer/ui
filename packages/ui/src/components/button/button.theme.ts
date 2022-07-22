import type { ThemeParams } from '../../composables/theme'

export default {
  classes: {
    wrapper({ props, slots, data }: ThemeParams) {
      /*tw*/
      const classes = ['relative transition duration-150 focus:outline-none inline-flex items-center justify-center font-medium whitespace-nowrap overflow-hidden align-middle active:!shadow-none border']

      // radius
      if (!data.isButtonGroup) classes.push(props.rounded ? 'rounded-full' : 'rounded-md')

      // shadow
      if (!props.flat && !props.light && !props.ghost && !props.disabled && !props.loading) classes.push('shadow-sm')

      // size
      if (props.size === 'xs') classes.push(slots.default ? `py-1 text-xs ${props.icon ? 'px-2' : 'px-3'}` : 'leading-none p-1')
      else if (props.size === 'sm') classes.push(slots.default ? `py-2 text-sm ${props.icon ? 'px-3' : 'px-4'}` : 'leading-none p-2')
      else if (props.size === 'lg') classes.push(slots.default ? `py-3 text-lg ${props.icon ? 'px-4' : 'px-6'}` : 'leading-none p-3')
      else if (props.size === 'xl') classes.push(slots.default ? `py-4 text-xl ${props.icon ? 'px-6' : 'px-6'}` : 'leading-none p-4')
      else classes.push(slots.default ? `py-2 ${props.icon ? 'px-4' : 'px-5'}` : 'leading-none p-2')

      // cursor
      if (props.disabled) classes.push('cursor-not-allowed')
      else if (props.loading) classes.push('cursor-default')
      else classes.push('cursor-pointer')

      return classes
    },

    iconLeft: ({ slots }: ThemeParams) => slots.default ? 'mr-2' : 'm-0.5',

    iconRight: ({ slots }: ThemeParams) => slots.default ? 'ml-2' : 'm-0.5',
  },

  styles({ props, colors, css, data }: ThemeParams) {
    const gray = colors.getPalette('gray')
    const color = props.color ? colors.getPalette(props.color) : gray
    const vars: (object | string)[] = []

    const isLight = props.color && props.light
    const isDefault = !props.color && !props.ghost

    if (props.glow) vars.push(css.get('glow', colors.getColorOpacity(props.color ? color[500] : gray[500], 0.5)))

    if (isDefault) {
      if (props.disabled) {
        vars.push(css.variables({
          bg: gray[50],
          text: gray[300],
          border: gray[200],
          dark: {
            bg: gray[900],
            text: gray[600],
            border: gray[700],
          },
        }))
      } else {
        vars.push(css.variables({
          bg: 'white',
          text: gray[800],
          border: gray[300],
          hover: { bg: !props.loading ? gray[100] : '' },
          active: { bg: !props.loading ? gray[200] : '' },
          dark: {
            bg: gray[800],
            text: 'white',
            border: gray[700],
            hover: { bg: !props.loading ? gray[700] : '', border: gray[600] },
            active: { bg: !props.loading ? gray[600] : '', border: gray[500] },
          },
        }))
      }
    }

    // light
    else if (isLight) {
      if (!props.outlined || props.disabled) vars.push(css.get('border', 'transparent'))

      if (props.disabled) {
        vars.push(css.variables({
          bg: color[50],
          text: color[200],
          border: 'transparent',
          dark: {
            bg: gray[800],
            text: color[900],
            border: 'transparent',
          },
        }))
      } else {
        vars.push(css.variables({
          bg: color[50],
          text: color[600],
          border: props.outlined ? color[500] : 'transparent',
          hover: { bg: !props.loading ? color[100] : '' },
          active: { bg: !props.loading ? color[200] : '' },
          dark: {
            bg: color[900],
            text: color[200],
            border: props.outlined ? color[500] : 'transparent',
            hover: { bg: !props.loading ? color[800] : '' },
            active: { bg: !props.loading ? color[700] : '' },
          },
        }))
      }
    }

    // ghost
    else if (props.ghost) {
      if (!props.outlined) vars.push(css.get('border', 'transparent'))

      if (props.color) {
        if (props.disabled) {
          vars.push(css.variables({
            text: color[200],
            dark: {
              text: color[700],
            },
          }))
        } else {
          vars.push(css.variables({
            text: color[600],
            dark: {
              text: color[500],
            },
          }))
          if (!props.loading) {
            vars.push(css.variables({
              hover: { bg: color[50] },
              active: { bg: color[100] },
              dark: {
                hover: { bg: gray[800] },
                active: { bg: gray[700] },
              },
            }))
          }
        }
      } else {
        if (props.disabled) {
          vars.push(css.variables({
            text: gray[200],
            dark: {
              text: gray[700],
            },
          }))
        } else {
          vars.push(css.variables({
            text: gray[800],
            dark: {
              text: 'white',
            },
          }))
          if (!props.loading) {
            vars.push(css.variables({
              hover: { bg: gray[100] },
              active: { bg: gray[200] },
              dark: {
                hover: { bg: gray[800] },
                active: { bg: gray[700] },
              },
            }))
          }
        }
      }
    }

    else {
      // outlined
      if (props.outlined) {
        if (props.disabled) {
          vars.push(css.variables({
            text: color[200],
            border: color[200],
            dark: {
              text: color[700],
              border: color[700],
            },
          }))
        } else {
          vars.push(css.variables({
            text: color[600],
            border: color[600],
            dark: {
              text: color[500],
              border: color[500],
            },
          }))
          if (!props.loading) {
            vars.push(css.variables({
              hover: { bg: color[100] },
              active: { bg: color[200] },
              dark: {
                hover: { bg: gray[800] },
                active: { bg: gray[700] },
              },
            }))
          }
        }
      } else {
        // filled
        vars.push(css.variables({
          text: '#fff',
          border: !data.isButtonGroup ? 'transparent' : color[600],
          dark: {
            text: '#fff',
            border: !data.isButtonGroup ? 'transparent' : color[500],
          },
        }))
        if (props.disabled) {
          vars.push(css.variables({
            bg: color[100],
            dark: {
              text: color[700],
              bg: color[900],
            },
          }))
        } else {
          vars.push(css.variables({
            bg: color[500],
            hover: { bg: !props.loading ? color[600] : '' },
            active: { bg: !props.loading ? color[800] : '' },
            dark: {
              bg: color[600],
              hover: { bg: !props.loading ? color[700] : '' },
              active: { bg: !props.loading ? color[800] : '' },
            },
          }))
        }
      }
    }

    return vars
  },
}
