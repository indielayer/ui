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
    description: 'Root element tag. Becomes a router-link when `to` is set.',
  },
  type: {
    type: String,
    default: 'button',
    description: 'Native button type when `tag` is `button` (button, submit, reset).',
  },
  icon: {
    type: String,
    description: 'Shortcut for `iconLeft`.',
  },
  iconLeft: {
    type: String,
    description: 'Icon name shown before the label.',
  },
  iconRight: {
    type: String,
    description: 'Icon name shown after the label.',
  },
  to: {
    type: [String, Object],
    description: 'Vue Router location; renders as a link when set.',
  },
  tooltip: {
    type: String,
    description: 'Tooltip text shown on hover. Prefer the tooltip slot for custom content.',
  },
  tooltipPosition: {
    type: String as PropType<TooltipPosition>,
    default: 'top',
    description: 'Tooltip placement relative to the button.',
  },
}

export type ButtonProps = ExtractPublicPropTypes<typeof buttonProps>

type InternalClasses = 'wrapper' | 'iconLeft' | 'iconRight'
type InternalExtraData = {
  isButtonGroup: boolean;
  buttonGroupPosition: import('../../common/buttonGroupRadius').ButtonGroupPosition | undefined;
  buttonGroupRounded: boolean;
  isInsideInputGroup: boolean;
  inputGroupPosition: import('../../common/inputGroupRadius').InputGroupPosition | undefined;
}
export interface ButtonTheme extends ThemeComponent<ButtonProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XButton',
  validators: {
    ...useCommon.validators(),
  },
  docs: {
    slots: {
      default: 'Button label and content.',
      tooltip: 'Custom tooltip content; overrides the `tooltip` prop.',
    },
    methods: {
      focus: 'Focus the underlying control.',
      blur: 'Remove focus from the underlying control.',
    },
  },
}
</script>

<script setup lang="ts">
import { computed, ref, inject, onMounted, onUnmounted, useAttrs, useSlots, unref, type ExtractPublicPropTypes, type PropType } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useResolvedComponentProps } from '../../composables/resolveComponentDefaults'
import { useColors } from '../../composables/useColors'
import { useCommon } from '../../composables/useCommon'
import { useInteractive } from '../../composables/useInteractive'
import { injectButtonGroupKey, injectInputGroupKey } from '../../composables/keys'

import XLoader from '../loader/Loader.vue'
import XIcon from '../icon/Icon.vue'
import XTooltip from '../tooltip/Tooltip.vue'

import type { TooltipPosition } from '../tooltip/Tooltip.vue'

const props = defineProps(buttonProps)
const resolvedProps = useResolvedComponentProps('Button', props)
const slots = useSlots()

const elRef = ref<HTMLElement | null>(null)

const buttonGroup = inject(injectButtonGroupKey, {
  isButtonGroup: false,
  groupProps: {},
  registerChild: () => {},
  unregisterChild: () => {},
  getPosition: () => 'only' as const,
  childOrder: computed(() => []),
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
  if (buttonGroup.isButtonGroup) buttonGroup.registerChild(childId)
  if (inputGroup.isInsideInputGroup) inputGroup.registerChild(childId)
})

onUnmounted(() => {
  if (buttonGroup.isButtonGroup) buttonGroup.unregisterChild(childId)
  if (inputGroup.isInsideInputGroup) inputGroup.unregisterChild(childId)
})

const { isButtonGroup } = buttonGroup
const buttonGroupPosition = computed(() => {
  if (!buttonGroup.isButtonGroup) return undefined

  void buttonGroup.childOrder.value

  return buttonGroup.getPosition(childId)
})
const buttonGroupRounded = computed(() => !!buttonGroup.groupProps?.rounded)
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

const hasTooltip = computed(() => !!(props.tooltip || slots.tooltip))
const isIconOnly = computed(() => !slots.default)
const ariaLabel = computed(() => {
  const fromAttrs = attrs['aria-label']

  if (fromAttrs !== undefined && fromAttrs !== null) return fromAttrs as string
  if (isIconOnly.value && props.tooltip) return props.tooltip

  return undefined
})
const tooltipWrapperClass = computed(() => {
  if (resolvedProps.value.block) return 'block w-full'
  if (isButtonGroup) return 'inline-flex self-stretch'

  return undefined
})

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
  buttonGroupPosition,
  buttonGroupRounded,
  isInsideInputGroup,
  inputGroupPosition,
})

const { focus, blur } = useInteractive(elRef)

defineExpose({ focus, blur })
</script>

<template>
  <x-tooltip
    v-if="hasTooltip"
    :position="tooltipPosition"
    :class="tooltipWrapperClass"
  >
    <template #tooltip>
      <slot name="tooltip">
        {{ tooltip }}
      </slot>
    </template>
    <component
      :is="htmlTag"
      ref="elRef"
      :to="to"
      :class="[
        className,
        $style['button'],
        (resolvedProps.glow && !computedDisabled && !loading) ? $style['button--glow'] : '',
        classes.wrapper,
        {
          'w-full': resolvedProps.block,
          'h-full': isButtonGroup,
        }
      ]"
      :style="styles"
      :aria-label="ariaLabel"
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
  </x-tooltip>
  <component
    :is="htmlTag"
    v-else
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
