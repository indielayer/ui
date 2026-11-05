import type { ButtonTheme } from '../Button.vue'
import { inputGroupRadiusClasses } from '../../../common/inputGroupRadius'
import { buttonGroupRadiusClasses } from '../../../common/buttonGroupRadius'
import { secondaryCssPalette } from '../../../common/secondaryTokens'

const theme: ButtonTheme = {
  classes: {
    wrapper({ props, slots, data }) {
      // active:shadow-none — no `!`; important on --tw-shadow is dropped by Chrome and leaves shadow-xs
      // no overflow-hidden — colored filled buttons use an outer glow that must not be clipped
      const classes = ['relative transition duration-150 focus-visible:outline-secondary-300 outline-transparent outline outline-1 outline-offset-2 inline-flex items-center justify-center font-medium leading-none whitespace-nowrap align-middle active:shadow-none! border appearance-none shrink-0']

      // radius
      if (data.isInsideInputGroup) {
        classes.push(...inputGroupRadiusClasses(data.inputGroupPosition))
      } else if (data.isButtonGroup) {
        classes.push(...buttonGroupRadiusClasses(data.buttonGroupPosition, data.buttonGroupRounded))
      } else {
        classes.push(props.rounded ? 'rounded-full' : 'rounded-lg')
      }

      // shadow (skip inside InputGroup — segment shadows bleed across shared edges)
      // filled colored buttons use `--x-button-glow` + `.button--glow` instead of shadow-xs
      const isFilledColor = !!(props.color && !props.outlined && !props.light && !props.ghost)

      if (
        !data.isInsideInputGroup
        && !props.flat
        && !props.light
        && !props.ghost
        && !props.disabled
        && !props.loading
        && !isFilledColor
      ) classes.push('shadow-xs')

      // size @ 14px root: xs 26 / sm 30 / md 34 / lg 38 / xl 42
      // min-h so button-group `h-full` can stretch without collapsing below the size token
      if (props.size === 'xs') classes.push(slots.default ? 'min-h-[calc(26/14*1rem)] px-2 text-sm' : 'min-h-[calc(26/14*1rem)] w-[calc(26/14*1rem)]')
      else if (props.size === 'sm') classes.push(slots.default ? 'min-h-[calc(30/14*1rem)] px-3' : 'min-h-[calc(30/14*1rem)] w-[calc(30/14*1rem)]')
      else if (props.size === 'lg') classes.push(slots.default ? `min-h-[calc(38/14*1rem)] ${props.icon ? 'px-4' : 'px-5'}` : 'min-h-[calc(38/14*1rem)] w-[calc(38/14*1rem)]')
      else if (props.size === 'xl') classes.push(slots.default ? 'min-h-12 text-base px-6' : 'min-h-12 w-12')
      else classes.push(slots.default ? 'min-h-[calc(34/14*1rem)] px-4' : 'min-h-[calc(34/14*1rem)] w-[calc(34/14*1rem)]')

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
    const secondaryHex = colors.getPalette('secondary')
    const secondary = secondaryCssPalette
    const color = props.color ? colors.getPalette(props.color) : secondary
    const vars = []

    const isLight = props.color && props.light
    const isDefault = !props.color && !props.ghost

    // filled colored: inset highlight + color-matched glow (see `.button--glow`)
    const isFilledColor = !!(props.color && !props.outlined && !props.light && !props.ghost && !props.flat)

    if (isFilledColor && !props.disabled && !props.loading && !data.isInsideInputGroup) {
      vars.push(css.get('glow', colors.getColorOpacity(color[500], 0.5)))
    } else if (props.glow) {
      vars.push(css.get('glow', colors.getColorOpacity(props.color ? color[500] : secondaryHex[500], 0.3)))
    }

    if (isDefault) {
      if (props.disabled) {
        vars.push(css.variables({
          bg: secondary[50],
          text: secondary[300],
          border: secondary[200],
          dark: {
            bg: secondary[900],
            text: secondary[600],
            border: secondary[700],
          },
        }))
      } else {
        vars.push(css.variables({
          bg: 'white',
          text: secondary[800],
          border: secondary[300],
          hover: { bg: !props.loading ? secondary[100] : '' },
          active: { bg: !props.loading ? secondary[200] : '' },
          dark: {
            bg: secondary[800],
            text: 'white',
            border: secondary[700],
            hover: { bg: !props.loading ? secondary[700] : '', border: secondary[600] },
            active: { bg: !props.loading ? secondary[600] : '', border: secondary[500] },
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
            bg: secondary[800],
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
            text: color[100],
            border: props.outlined
              ? colors.getColorOpacity(color[400], 0.45)
              : colors.getColorOpacity(color[500], 0.1),
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
            text: secondary[200],
            dark: {
              text: secondary[700],
            },
          }))
        } else {
          vars.push(css.variables({
            text: color[600],
            border: props.outlined ? secondary[300] : 'transparent',
            dark: {
              text: color[200],
              border: props.outlined ? secondary[700] : 'transparent',
            },
          }))
          if (!props.loading) {
            vars.push(css.variables({
              hover: { bg: color[50] },
              active: { bg: color[100] },
              dark: {
                hover: { bg: secondary[700] },
                active: { bg: secondary[600] },
              },
            }))
          }
        }
      } else {
        if (props.disabled) {
          vars.push(css.variables({
            text: secondary[200],
            dark: {
              text: secondary[700],
            },
          }))
        } else {
          vars.push(css.variables({
            text: props.outlined ? secondary[800] : secondary[600],
            border: props.outlined ? secondary[300] : 'transparent',
            dark: {
              text: props.outlined ? secondary[200] : secondary[400],
              border: props.outlined ? secondary[700] : 'transparent',
            },
          }))
          if (!props.loading) {
            vars.push(css.variables({
              hover: { bg: secondary[100] },
              active: { bg: secondary[200] },
              dark: {
                hover: { bg: secondary[700] },
                active: { bg: secondary[600] },
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
              text: color[200],
              border: colors.getColorOpacity(color[500], 0.6),
            },
          }))
          if (!props.loading) {
            vars.push(css.variables({
              hover: { bg: color[100] },
              active: { bg: color[200] },
              dark: {
                hover: { bg: colors.getColorOpacity(color[500], 0.1) },
                active: { bg: colors.getColorOpacity(color[500], 0.2) },
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
            border: color[600],
          },
        }))
        if (props.disabled) {
          vars.push(css.variables({
            bg: secondary[100],
            border: secondary[300],
            text: secondary[400],
            dark: {
              text: secondary[700],
              border: secondary[700],
              bg: secondary[800],
            },
          }))
        } else {
          vars.push(css.variables({
            bg: color[500],
            hover: { bg: !props.loading ? color[600] : '' },
            active: { bg: !props.loading ? color[800] : '' },
            dark: {
              bg: colors.getColorOpacity(color[600], 0.8),
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
