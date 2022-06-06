<script lang="ts">
import { defineComponent, computed, ref, inject } from 'vue'
import { useCSS } from '../../composables/css'
import { useCommon } from '../../composables/common'
import { useColors } from '../../composables/colors'
import { useInteractive } from '../../composables/interactive'
import { injectButtonGroupKey } from '../../composables/keys'

import XSpinner from '../../components/spinner/Spinner.vue'
import XIcon from '../../components/icon/Icon.vue'

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined

export default defineComponent({
  name: 'XButton',

  components: {
    XIcon,
    XSpinner,
  },

  validators: {
    ...useCommon.validators(),
  },

  props: {
    ...useCommon.props(),
    ...useColors.props(),
    ...useInteractive.props(),
    tag: {
      type: String,
      default: 'button',
    },
    type: {
      type: String,
      default: 'button',
    },
    icon: String,
    iconRight: String,
    to: String,
    outlined: Boolean,
    rounded: Boolean,
    glow: Boolean,
    ghost: Boolean,
    light: Boolean,
    block: Boolean,
    flat: Boolean,
  },
  setup(props, { slots, attrs }) {
    const elRef = ref<HTMLElement>()

    // Button group props
    const buttonGroup = inject(injectButtonGroupKey, {
      isButtonGroup: false,
      groupProps: {
        size: undefined,
        flat: undefined,
        color: undefined,
        ghost: undefined,
        light: undefined,
        outlined: undefined,
        disabled: undefined,
      },
    })
    const { isButtonGroup } = buttonGroup

    const computedSize = computed(() => buttonGroup.groupProps.size || props.size)
    const computedFlat = computed(() => buttonGroup.groupProps.flat || props.flat)
    const computedColor = computed(() => props.color || buttonGroup.groupProps.color)
    const computedGhost = computed(() => props.ghost || buttonGroup.groupProps.ghost)
    const computedLight = computed(() => props.light || buttonGroup.groupProps.light)
    const computedOutlined = computed(() => props.outlined || buttonGroup.groupProps.outlined)
    const computedDisabled = computed(() => props.disabled || buttonGroup.groupProps.disabled)
    const isLight = computed(() => computedColor.value && computedLight.value)
    const isDefault = computed(() => !computedColor.value && !computedGhost.value)
    const htmlTag = computed(() => (attrs.href ? 'a' : props.to ? 'router-link' : props.tag))

    const css = useCSS('button')
    const colors = useColors()
    const gray = colors.getPalette('gray')

    const styles = computed(() => {
      const color = computedColor.value ? colors.getPalette(computedColor.value) : gray
      const vars: (object | string)[] = []

      if (props.glow) vars.push(css.get('glow', colors.getColorOpacity(computedColor.value ? color[500] : gray[500], 0.5)))

      if (isDefault.value) {
        if (computedDisabled.value) {
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
              bg: gray[900],
              text: 'white',
              border: gray[600],
              hover: { bg: !props.loading ? gray[800] : '' },
              active: { bg: !props.loading ? gray[700] : '' },
            },
          }))
        }
      }

      // light
      else if (isLight.value) {
        if (!computedOutlined.value || computedDisabled.value) vars.push(css.get('border', 'transparent'))

        if (computedDisabled.value) {
          vars.push(css.variables({
            bg: color[50],
            text: color[200],
            border: 'transparent',
            dark: {
              bg: color[900],
              text: color[600],
              border: 'transparent',
            },
          }))
        } else {
          vars.push(css.variables({
            bg: color[50],
            text: color[600],
            border: computedOutlined.value ? color[500] : 'transparent',
            hover: { bg: !props.loading ? color[100] : '' },
            active: { bg: !props.loading ? color[200] : '' },
            dark: {
              bg: color[200],
              text: color[800],
              border: computedOutlined.value ? color[500] : 'transparent',
              hover: { bg: !props.loading ? color[100] : '' },
              active: { bg: !props.loading ? color[50] : '' },
            },
          }))
        }
      }

      // ghost
      else if (computedGhost.value) {
        if (!computedOutlined.value) vars.push(css.get('border', 'transparent'))

        if (computedColor.value) {
          if (computedDisabled.value) {
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
                text: color[200],
              },
            }))
            if (!props.loading) {
              vars.push(css.variables({
                hover: { bg: color[50] },
                active: { bg: color[100] },
                dark: {
                  hover: { bg: color[900] },
                  active: { bg: color[800] },
                },
              }))
            }
          }
        } else {
          if (computedDisabled.value) {
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

      // outlined / filled
      else {
        if (computedOutlined.value) {
          if (computedDisabled.value) {
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
                text: color[300],
                border: color[300],
              },
            }))
            if (!props.loading) {
              vars.push(css.variables({
                hover: { bg: color[100] },
                active: { bg: color[200] },
                dark: {
                  hover: { bg: color[800] },
                  active: { bg: color[700] },
                },
              }))
            }
          }
        } else {
          vars.push(css.variables({
            text: '#fff',
            border: !isButtonGroup ? 'transparent' : color[600],
            dark: {
              text: '#fff',
              border: !isButtonGroup ? 'transparent' : color[500],
            },
          }))
          if (computedDisabled.value) {
            vars.push(css.variables({
              bg: color[100],
              dark: {
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
                hover: { bg: !props.loading ? color[500] : '' },
                active: { bg: !props.loading ? color[400] : '' },
              },
            }))
          }
        }
      }

      return vars
    })

    const sizeClasses = computed(() => {
      if (slots.default) {
        switch (computedSize.value) {
        case 'xs':
          return `py-1 text-xs ${props.icon ? 'px-2' : 'px-3'}`
        case 'sm':
          return `py-2 text-sm ${props.icon ? 'px-3' : 'px-4'}`
        case 'lg':
          return `py-3 text-lg ${props.icon ? 'px-4' : 'px-6'}`
        case 'xl':
          return `py-4 text-xl ${props.icon ? 'px-6' : 'px-6'}`
        default:
          return `py-2 ${props.icon ? 'px-4' : 'px-5'}`
        }
      } else {
        switch (computedSize.value) {
        case 'xs':
          return 'leading-none p-1'
        case 'lg':
          return 'leading-none p-3'
        case 'xl':
          return 'leading-none p-4'
        default:
          return 'leading-none p-2'
        }
      }
    })

    return {
      ...useInteractive(elRef),
      elRef,
      sizeClasses,
      styles,
      htmlTag,
      isButtonGroup,
      computedSize,
      computedFlat,
      computedGhost,
      computedLight,
      computedOutlined,
      computedDisabled,
    }
  },
})
</script>

<template>
  <component
    :is="htmlTag"
    ref="elRef"
    :to="to"
    class="relative transition duration-150 focus:outline-none inline-flex items-center justify-center font-medium whitespace-nowrap overflow-hidden align-middle active:!shadow-none border-y"
    :style="styles"
    :class="[
      $style['button'],
      (glow && !computedDisabled && !loading) ? $style['button--glow'] : '',
      sizeClasses,
      {
        'rounded-none border-r border-l-0': isButtonGroup,
        'rounded-full': rounded && !isButtonGroup,
        'rounded-md': !rounded && !isButtonGroup,
        'border-x': !isButtonGroup,

        // shadow
        'shadow-sm':
          !computedFlat &&
          !computedLight &&
          !computedGhost &&
          !computedDisabled &&
          !loading &&
          !isButtonGroup,

        // cursor
        'cursor-not-allowed': computedDisabled,
        'cursor-default': loading,
        'cursor-pointer': !loading && !computedDisabled,

        // size
        'w-full': block,
      },
    ]"
    :aria-busy="loading ? 'true' : null"
    :aria-disabled="tag !== 'button' && computedDisabled ? 'true' : null"
    :disabled="computedDisabled || loading"
    :type="tag === 'button' ? type : null"
  >
    <x-spinner v-if="loading" :size="computedSize" class="absolute" />
    <x-icon
      v-if="icon"
      :size="computedSize"
      :icon="icon"
      class="shrink-0"
      :class="[
        [$slots.default ? 'mr-2' : 'm-0.5'],
        {
          invisible: loading,
        },
      ]"
    />
    <span :class="{ invisible: loading }">
      <slot></slot>
    </span>
    <x-icon
      v-if="iconRight"
      :size="computedSize"
      :icon="iconRight"
      class="shrink-0"
      :class="[
        [$slots.default ? 'ml-2' : 'm-0.5'],
        {
          invisible: loading,
        },
      ]"
    />
  </component>
</template>

<style lang="postcss" module scoped>
.button {
  color: var(--x-button-text);
  background-color: var(--x-button-bg);
  border-color: var(--x-button-border);

  &--glow {
    box-shadow: 0 0 #000, 0 0 #000, 0 10px 15px -3px var(--x-button-glow), 0 4px 6px -4px var(--x-button-glow);
  }

  &:hover {
    color: var(--x-button-text-hover, var(--x-button-text));
    background-color: var(--x-button-bg-hover, var(--x-button-bg));
    border-color: var(--x-button-border-hover, var(--x-button-border));
  }

  &:active {
    color: var(--x-button-text-active, var(--x-button-text));
    background-color: var(--x-button-bg-active, var(--x-button-bg));
    border-color: var(--x-button-border-active, var(--x-button-border));
  }

  :global(.dark) & {
    color: var(--x-dark-button-text, var(--x-button-text));
    background-color: var(--x-dark-button-bg, var(--x-button-bg));
    border-color: var(--x-dark-button-border, var(--x-button-border));

    &:hover {
      color: var(--x-dark-button-text-hover, var(--x-dark-button-text, var(--x-button-text)));
      background-color: var(--x-dark-button-bg-hover, var(--x-dark-button-bg, var(--x-button-bg)));
      border-color: var(--x-dark-button-border-hover, var(--x-dark-button-border, var(--x-button-border)));
    }

    &:active {
      color: var(--x-dark-button-text-active, var(--x-dark-button-text));
      background-color: var(--x-dark-button-bg-active, var(--x-dark-button-bg, var(--x-button-bg)));
      border-color: var(--x-dark-button-border-active, var(--x-dark-button-border, var(--x-button-border)));
    }
  }
}
</style>
