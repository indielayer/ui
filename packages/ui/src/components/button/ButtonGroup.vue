<script lang="ts">
import { variantBooleanProps } from '../../common/props'
import type { ButtonGroupPosition } from '../../common/buttonGroupRadius'

const buttonGroupProps = {
  ...useCommon.props(),
  ...useColors.props(),
  ...useInteractive.props(),
  ...variantBooleanProps(),
  tag: {
    type: String,
    default: 'div',
    description: 'Root element tag for the group wrapper.',
  },
}

export type ButtonGroupProps = ExtractPublicPropTypes<typeof buttonGroupProps>
export type ButtonGroupInjection = {
  groupProps: ButtonGroupProps;
  isButtonGroup: boolean;
  registerChild: (id: string) => void;
  unregisterChild: (id: string) => void;
  getPosition: (id: string) => ButtonGroupPosition;
  childOrder: ComputedRef<string[]>;
}

type InternalClasses = 'wrapper'
type InternalExtraData = { isButtonGroupGroup: boolean; }
export interface ButtonGroupTheme extends ThemeComponent<ButtonGroupProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XButtonGroup',
  validators: {
    ...useCommon.validators(),
  },
  docs: {
    slots: {
      default: 'Grouped buttons (typically x-button children).',
    },
  },
}
</script>

<script setup lang="ts">
import { provide, ref, computed, type ExtractPublicPropTypes, type ComputedRef } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useResolvedComponentProps } from '../../composables/resolveComponentDefaults'
import { useCommon } from '../../composables/useCommon'
import { useColors } from '../../composables/useColors'
import { useInteractive } from '../../composables/useInteractive'
import { injectButtonGroupKey } from '../../composables/keys'

const props = defineProps(buttonGroupProps)
const resolvedProps = useResolvedComponentProps('ButtonGroup', props)

const childOrder = ref<string[]>([])
const childOrderReadonly = computed(() => childOrder.value)

function getPosition(id: string): ButtonGroupPosition {
  const order = childOrderReadonly.value
  const index = order.indexOf(id)

  if (index === -1 || order.length === 0) return 'only'
  if (order.length === 1) return 'only'
  if (index === 0) return 'first'
  if (index === order.length - 1) return 'last'

  return 'middle'
}

function registerChild(id: string) {
  if (!childOrder.value.includes(id)) {
    childOrder.value = [...childOrder.value, id]
  }
}

function unregisterChild(id: string) {
  childOrder.value = childOrder.value.filter((n) => n !== id)
}

provide(injectButtonGroupKey, {
  groupProps: props,
  isButtonGroup: true,
  registerChild,
  unregisterChild,
  getPosition,
  childOrder: childOrderReadonly,
})

const { className, classes, styles } = useTheme('ButtonGroup', {}, resolvedProps)
</script>

<template>
  <component
    :is="tag"
    :style="styles"
    :class="[
      className,
      classes.wrapper
    ]"
  >
    <slot></slot>
  </component>
</template>
