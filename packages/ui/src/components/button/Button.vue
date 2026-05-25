<script lang="ts">
import { variantBooleanProps } from '../../common/props'

const buttonProps = {
  ...useCommon.props(),
  ...useColors.props(),
  ...useInteractive.props(),
  ...variantBooleanProps(),
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
}

export type ButtonProps = ExtractPublicPropTypes<typeof buttonProps>

type InternalClasses = 'wrapper' | 'iconLeft' | 'iconRight'
type InternalExtraData = {
  isButtonGroup: boolean;
  isInsideInputGroup: boolean;
  inputGroupPosition: import('../../common/inputGroupRadius').InputGroupPosition | undefined;
}
export interface ButtonTheme extends ThemeComponent<ButtonProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XButton',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import { computed, ref, inject, onMounted, onUnmounted, useAttrs, unref, type ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useResolvedComponentProps } from '../../composables/resolveComponentDefaults'
import { useColors } from '../../composables/useColors'
import { useCommon } from '../../composables/useCommon'
import { useInteractive } from '../../composables/useInteractive'
import { injectButtonGroupKey, injectInputGroupKey } from '../../composables/keys'

import XLoader from '../loader/Loader.vue'
import XIcon from '../icon/Icon.vue'

const props = defineProps(buttonProps)
const resolvedProps = useResolvedComponentProps('Button', props)

const elRef = ref<HTMLElement | null>(null)

const buttonGroup = inject(injectButtonGroupKey, {
  isButtonGroup: false,
  groupProps: {},
})

const inputGroup = inject(injectInputGroupKey, {
  registerChild: () => {},
  unregisterChild: () => {},
  registerInput: () => {},
  unregisterInput: () => {},
  getPosition: () => 'only',
  childOrder: computed(() => []),
  isInsideInputGroup: false,
  groupProps: {},
})

const childId = `btn-${Math.random().toString(36).slice(2)}`

onMounted(() => {
  if (inputGroup.isInsideInputGroup) inputGroup.registerChild(childId)
})

onUnmounted(() => {
  if (inputGroup.isInsideInputGroup) inputGroup.unregisterChild(childId)
})

const { isButtonGroup } = buttonGroup
const isInsideInputGroup = computed(() => inputGroup.isInsideInputGroup)
const inputGroupPosition = computed(() => {
  if (!inputGroup.isInsideInputGroup) return undefined

  void inputGroup.childOrder.value

  return inputGroup.getPosition(childId)
})

const group = () => buttonGroup.groupProps

const computedSize = computed(() => {
  if (inputGroup.isInsideInputGroup && inputGroup.groupProps?.size) {
    return inputGroup.groupProps.size
  }

  return group().size ?? resolvedProps.value.size
})
const computedFlat = computed(() => group().flat ?? resolvedProps.value.flat)
const computedColor = computed(() => resolvedProps.value.color ?? group().color)
const computedGhost = computed(() => group().ghost ?? resolvedProps.value.ghost)
const computedLight = computed(() => group().light ?? resolvedProps.value.light)
const computedOutlined = computed(() => group().outlined ?? resolvedProps.value.outlined)
const computedDisabled = computed(() => props.disabled || group().disabled || !!inputGroup.groupProps?.disabled)
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
  block: resolvedProps.value.block,
  glow: resolvedProps.value.glow,
  iconLeft: unref(computedIconLeft),
  iconRight: props.iconRight,
  rounded: resolvedProps.value.rounded,
}))

const { className, classes, styles } = useTheme('Button', {}, computedProps, {
  isButtonGroup,
  isInsideInputGroup,
  inputGroupPosition,
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
      (resolvedProps.glow && !computedDisabled && !loading) ? $style['button--glow'] : '',
      classes.wrapper,
      { 'w-full': resolvedProps.block }
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

<style scoped module>
.button {
  color: var(--x-button-text);
  background-color: var(--x-button-bg);
  border-color: var(--x-button-border);
}

.button--glow {
  box-shadow: 0 0 #000, 0 0 #000, 0 10px 15px -3px var(--x-button-glow), 0 4px 6px -4px var(--x-button-glow);
}

.button:hover {
  color: var(--x-button-text-hover, var(--x-button-text));
  background-color: var(--x-button-bg-hover, var(--x-button-bg));
  border-color: var(--x-button-border-hover, var(--x-button-border));
}

.button:active {
  color: var(--x-button-text-active, var(--x-button-text));
  background-color: var(--x-button-bg-active, var(--x-button-bg));
  border-color: var(--x-button-border-active, var(--x-button-border));
}

:global(.dark) .button,
.button:global(.dark) {
  color: var(--x-button-dark-text, var(--x-button-text));
  background-color: var(--x-button-dark-bg, var(--x-button-bg));
  border-color: var(--x-button-dark-border, var(--x-button-border));
}

:global(.dark) .button:hover,
.button:global(.dark):hover {
  color: var(--x-button-dark-text-hover, var(--x-button-dark-text, var(--x-button-text)));
  background-color: var(--x-button-dark-bg-hover, var(--x-button-dark-bg, var(--x-button-bg)));
  border-color: var(--x-button-dark-border-hover, var(--x-button-dark-border, var(--x-button-border)));
}

:global(.dark) .button:active,
.button:global(.dark):active {
  color: var(--x-button-dark-text-active, var(--x-button-dark-text));
  background-color: var(--x-button-dark-bg-active, var(--x-button-dark-bg, var(--x-button-bg)));
  border-color: var(--x-button-dark-border-active, var(--x-button-dark-border, var(--x-button-border)));
}
</style>
