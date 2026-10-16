import type { ButtonTheme } from '../Button.vue'
import { inputGroupRadiusClasses } from '../../../common/inputGroupRadius'
import { buttonGroupRadiusClasses } from '../../../common/buttonGroupRadius'

const theme: ButtonTheme = {
  classes: {
    wrapper({ props, slots, data }) {
      const classes = ['relative transition duration-150 focus-visible:outline-secondary-300 outline-transparent outline outline-1 outline-offset-2 inline-flex items-center justify-center font-medium whitespace-nowrap overflow-hidden align-middle active:!shadow-none border appearance-none shrink-0']

      // radius
      if (data.isInsideInputGroup) {
        classes.push(...inputGroupRadiusClasses(data.inputGroupPosition))
      } else if (data.isButtonGroup) {
        classes.push(...buttonGroupRadiusClasses(data.buttonGroupPosition, data.buttonGroupRounded))
      } else {
        classes.push(props.rounded ? 'rounded-full' : 'rounded-lg')
      }

      // shadow
      if (!props.flat && !props.light && !props.ghost && !props.disabled && !props.loading) classes.push('shadow-xs')

      // size
      if (props.size === 'xs') classes.push(slots.default ? 'h-7 px-2 text-xs' : 'h-7 w-7 leading-none')
      else if (props.size === 'sm') classes.push(slots.default ? 'h-8 px-3 text-sm' : 'h-8 w-8 leading-none')
      else if (props.size === 'lg') classes.push(slots.default ? `h-[42px] ${props.icon ? 'px-4' : 'px-5'}` : 'h-[42px] w-[42px] leading-none')
      else if (props.size === 'xl') classes.push(slots.default ? 'h-[46px] text-base px-6' : 'h-[46px] w-[46px] leading-none')
      else classes.push(slots.default ? 'h-9 px-4' : 'h-9 w-9 leading-none')

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
    const gray = colors.getPalette('secondary')
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
            bg: colors.getColorOpacity(color[500], 0.28),
            text: color[200],
            border: props.outlined
              ? colors.getColorOpacity(color[400], 0.45)
              : colors.getColorOpacity(color[500], 0.1),
            hover: { bg: !props.loading ? color[900] : '' },
            active: { bg: !props.loading ? color[800] : '' },
          },
        }))
      }
    } else if (props.ghost) {
      // ghost
      if (!props.outlined) vars.push(css.get('border', 'transparent'))

      if (props.color) {
        if (props.disabled) {
          vars.push(css.variables({
            text: gray[200],
            dark: {
              text: gray[700],
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
            border: props.outlined ? gray[300] : 'transparent',
            dark: {
              text: gray[200],
              border: props.outlined ? gray[700] : 'transparent',
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
          border: color[600],
          dark: {
            text: '#fff',
            border: color[500],
          },
        }))
        if (props.disabled) {
          vars.push(css.variables({
            bg: gray[100],
            border: gray[300],
            text: gray[400],
            dark: {
              text: gray[700],
              border: gray[700],
              bg: gray[800],
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
