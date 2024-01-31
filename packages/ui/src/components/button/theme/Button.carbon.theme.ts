import type { ButtonTheme } from '../Button.vue'

const theme: ButtonTheme = {
  classes: {
    wrapper({ props, slots, data }) {
      const classes = ['relative transition duration-150 inline-flex whitespace-nowrap overflow-hidden align-top appearance-none text-sm active:shadow-none border !leading-[1.28572] tracking-wide font-light']

      // radius
      if (!data.isButtonGroup) classes.push(props.rounded ? 'rounded-full' : '')
      else classes.push('!rounded-none')

      // size
      if (slots.default) {
        classes.push('min-w-[8rem] px-4 py-3.5 items-start justify-between')
        if (props.size === 'xs') classes.push('min-h-[2rem]')
        else if (props.size === 'sm') classes.push('min-h-[2.5rem]')
        else if (props.size === 'lg') classes.push('min-h-[4rem]')
        else if (props.size === 'xl') classes.push('min-h-[5rem]')
        else classes.push('min-h-[3rem]')
      } else {
        classes.push('items-center justify-center')
        if (props.size === 'xs') classes.push('h-6 w-6')
        else if (props.size === 'sm') classes.push('h-8 w-8')
        else if (props.size === 'lg') classes.push('h-12 w-12')
        else if (props.size === 'xl') classes.push('h-16 w-16')
        else classes.push('h-10 w-10')
      }

      // cursor
      if (props.disabled) classes.push('cursor-not-allowed')
      else if (props.loading) classes.push('cursor-default')
      else classes.push('cursor-pointer')

      return classes
    },

    iconLeft: ({ slots }) => slots.default ? 'mr-2' : 'm-0.5',

    iconRight: ({ slots }) => slots.default ? 'ml-2' : 'm-0.5',
  },

  styles({ props, colors, css, data }) {
    const gray = colors.getPalette('gray')
    const color = props.color ? colors.getPalette(props.color) : gray
    const vars = []

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
    } else if (isLight) {
      // light
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
    } else if (props.ghost) {
      // ghost
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
    } else {
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
            bg: color[200],
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

export default theme
