<script lang="ts">
const buttonProps = {
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
  iconLeft: String,
  iconRight: String,
  to: [String, Object],
  outlined: Boolean,
  rounded: Boolean,
  glow: Boolean,
  ghost: Boolean,
  light: Boolean,
  block: Boolean,
  flat: Boolean,
}

export type ButtonProps = ExtractPublicPropTypes<typeof buttonProps>

type InternalClasses = 'wrapper' | 'iconLeft' | 'iconRight'
type InternalExtraData = { isButtonGroup: boolean; }
export interface ButtonTheme extends ThemeComponent<ButtonProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XButton',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import { computed, ref, inject, useAttrs, unref, type ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useColors } from '../../composables/useColors'
import { useCommon } from '../../composables/useCommon'
import { useInteractive } from '../../composables/useInteractive'
import { injectButtonGroupKey } from '../../composables/keys'

import XLoader from '../loader/Loader.vue'
import XIcon from '../icon/Icon.vue'

const props = defineProps(buttonProps)

const elRef = ref<HTMLElement | null>(null)

// Button group props
const buttonGroup = inject(injectButtonGroupKey, {
  isButtonGroup: false,
  groupProps: {},
})

const { isButtonGroup } = buttonGroup
const computedSize = computed(() => buttonGroup.groupProps.size || props.size)
const computedFlat = computed(() => buttonGroup.groupProps.flat || props.flat)
const computedColor = computed(() => props.color || buttonGroup.groupProps.color)
const computedGhost = computed(() => props.ghost || buttonGroup.groupProps.ghost)
const computedLight = computed(() => props.light || buttonGroup.groupProps.light)
const computedOutlined = computed(() => props.outlined || buttonGroup.groupProps.outlined)
const computedDisabled = computed(() => props.disabled || buttonGroup.groupProps.disabled)
const computedIconLeft = computed(() => props.icon || props.iconLeft)

const attrs = useAttrs()
const htmlTag = computed(() => (attrs.href ? 'a' : props.to ? 'router-link' : props.tag))

const computedProps = computed(() => ({
  size: unref(computedSize),
  flat: unref(computedFlat),
  color: unref(computedColor),
  ghost: unref(computedGhost),
  light: unref(computedLight),
  outlined: unref(computedOutlined),
  disabled: unref(computedDisabled),
  loading: props.loading,
  block: props.block,
  glow: props.glow,
  iconLeft: unref(computedIconLeft),
  iconRight: props.iconRight,
  rounded: props.rounded,
}))

const { className, classes, styles } = useTheme('Button', {}, computedProps, {
  isButtonGroup,
})

const { focus, blur } = useInteractive(elRef)

defineExpose({ focus, blur })
</script>

<template>
  <component
    :is="htmlTag"
    ref="elRef"
    :to="to"
    :class="[
      className,
      $style['button'],
      (glow && !computedDisabled && !loading) ? $style['button--glow'] : '',
      classes.wrapper,
      { 'w-full': block }
    ]"
    :style="styles"
    :aria-busy="loading ? 'true' : null"
    :aria-disabled="tag !== 'button' && computedDisabled ? 'true' : null"
    :disabled="computedDisabled || loading"
    :type="tag === 'button' ? type : null"
  >
    <x-loader
      v-if="loading"
      class="absolute"
      :size="computedSize"
      :label="loadingLabel"
      :status="loadingStatus"
    />
    <div class="inline-flex items-center justify-center" :class="{ 'invisible': loading }">
      <x-icon
        v-if="computedIconLeft"
        :size="computedSize"
        :icon="computedIconLeft"
        :class="[
          classes.iconLeft,
        ]"
      />
      <span>
        <slot></slot>
      </span>
    </div>
    <x-icon
      v-if="iconRight"
      :size="computedSize"
      :icon="iconRight"
      :class="[
        classes.iconRight,
        { 'invisible': loading },
      ]"
    />
  </component>
</template>

<style lang="postcss" scoped module>
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

  :global(.dark) &,
  &:global(.dark) {
    color: var(--x-button-dark-text, var(--x-button-text));
    background-color: var(--x-button-dark-bg, var(--x-button-bg));
    border-color: var(--x-button-dark-border, var(--x-button-border));

    &:hover {
      color: var(--x-button-dark-text-hover, var(--x-button-dark-text, var(--x-button-text)));
      background-color: var(--x-button-dark-bg-hover, var(--x-button-dark-bg, var(--x-button-bg)));
      border-color: var(--x-button-dark-border-hover, var(--x-button-dark-border, var(--x-button-border)));
    }

    &:active {
      color: var(--x-button-dark-text-active, var(--x-button-dark-text));
      background-color: var(--x-button-dark-bg-active, var(--x-button-dark-bg, var(--x-button-bg)));
      border-color: var(--x-button-dark-border-active, var(--x-button-dark-border, var(--x-button-border)));
    }
  }
}
</style>
