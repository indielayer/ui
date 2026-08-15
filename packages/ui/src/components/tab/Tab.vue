<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const tabProps = {
  ...useCommon.props(),
  size: {
    type: String as PropType<Size>,
    validator: (value: string) => useCommon.validators().size.includes(value),
    description: 'Tab size. Falls back to the parent tab group size when omitted.',
  },
  value: {
    type: [String, Number],
    description: 'Value used to select this tab in the group.',
  },
  tag: {
    type: String,
    default: 'button',
    description: 'Root element tag when not using `to`.',
  },
  to: {
    type: [String, Object],
    description: 'Vue Router location; renders as a link when set.',
  },
  label: {
    type: String,
    description: 'Visible label. Defaults to `value` when omitted.',
  },
  icon: {
    type: String,
    description: 'Icon name shown before the label.',
  },
  tooltip: {
    type: String,
    description: 'Tooltip text. Prefer the tooltip slot for custom content.',
  },
  tooltipPosition: {
    type: String as PropType<TooltipPosition>,
    default: 'top',
    description: 'Tooltip placement relative to the tab.',
  },
  disabled: {
    type: Boolean,
    description: 'Prevents selecting this tab.',
  },
  exact: {
    type: Boolean,
    description: 'Requires exact route match when using `to`.',
  },
  removable: optionalBooleanProp('Shows a remove control that emits `remove`.'),
}

export type TabProps = ExtractPublicPropTypes<typeof tabProps>

type InternalClasses = 'wrapper' | 'content' | 'label' | 'icon' | 'tabpanel'
type InternalExtraData = {
  selected: boolean;
  showLabel: boolean;
} & Pick<TabGroupInjection, 'state'>['state']
export interface TabTheme extends ThemeComponent<TabProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XTab',
  validators: {
    ...useCommon.validators(),
  },
  docs: {
    slots: {
      default: 'Tab panel content shown when this tab is selected.',
      tab: 'Custom tab trigger content. Slot props: label, value, size, icon.',
      tooltip: 'Custom tooltip content; overrides the `tooltip` prop.',
    },
    emits: {
      remove: 'Emitted when the remove control is clicked.',
    },
  },
}
</script>

<script setup lang="ts">
import { inject, reactive, computed, ref, onMounted, onBeforeUnmount, type ExtractPublicPropTypes, type PropType } from 'vue'
import { useMutationObserver } from '@vueuse/core'
import { injectTabGroupKey } from '../../composables/keys'
import { useCommon, type Size } from '../../composables/useCommon'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useResolvedComponentProps } from '../../composables/resolveComponentDefaults'

import XIcon from '../icon/Icon.vue'
import XLink from '../link/Link.vue'
import XTooltip from '../tooltip/Tooltip.vue'

import { closeIcon } from '../../common/icons'

import type { TooltipPosition } from '../tooltip/Tooltip.vue'
import type { TabGroupInjection, TabGroupVariant } from './TabGroup.vue'

const props = defineProps(tabProps)
const resolvedProps = useResolvedComponentProps('Tab', props)

const computedValue = computed(() => (elRef.value as typeof XLink)?.$el?.href || props.value)
const showLabel = computed(() => {
  if (props.icon && (props.label === undefined || props.label === '')) return false

  return true
})
const computedLabel = computed(() => props.label || props.value)
const ariaLabel = computed(() => {
  if (showLabel.value) return undefined

  if (props.tooltip) return props.tooltip
  if (props.label) return props.label
  if (computedValue.value !== undefined && computedValue.value !== null) return String(computedValue.value)

  return undefined
})
const teleportTo = ref<HTMLElement | null>(null)
const elRef = ref<HTMLElement | typeof XLink | null>(null)

const tabs = inject(injectTabGroupKey, {
  tabsContentRef: ref(null),
  activateTab: () => {},
  registerTab: () => {},
  unregisterTab: () => {},
  state: reactive({
    active: undefined,
    variant: 'line' as TabGroupVariant,
    ghost: false,
    grow: false,
    exact: false,
    size: 'md' as Size,
    color: 'primary',
  }),
})

const computedExact = computed(() => tabs.state.exact || props.exact)
const computedSize = computed(() => props.size ?? tabs.state.size ?? 'md')

onMounted(() => {
  teleportTo.value = tabs.tabsContentRef.value

  if (typeof computedValue.value !== 'undefined') tabs.registerTab(computedValue.value)

  if (props.to && elRef.value) {
    check()
    useMutationObserver((elRef.value as typeof XLink).$el, check, {
      attributes: true,
      attributeFilter: ['class'],
    })
  }
})

onBeforeUnmount(() => {
  if (typeof computedValue.value !== 'undefined') tabs.unregisterTab(computedValue.value)
})

function check() {
  if (elRef.value && (elRef.value as typeof XLink).$el && (props.to)) {
    const active = (elRef.value as typeof XLink).$el.classList.contains(computedExact.value ? 'router-link-exact-active' : 'router-link-active')

    if (active) tabs.activateTab(computedValue.value)
  }
}

const selected = computed(() => tabs.state.active === computedValue.value)

const color = computed(() => tabs.state.color)

function onClickTab(e: MouseEvent) {
  if (props.disabled) {
    e.preventDefault()
    e.stopPropagation()

    return
  }

  if (!props.to && typeof computedValue.value !== 'undefined') tabs.activateTab(computedValue.value)
}

defineEmits(['remove'])

const isBlockLike = computed(() => tabs.state.variant === 'block' || tabs.state.variant === 'compact')

const themeProps = computed(() => ({
  ...props,
  size: computedSize.value,
  exact: computedExact.value,
}))

const { styles, classes, className } = useTheme('Tab', {}, themeProps, {
  ...tabs.state,
  selected,
  showLabel,
})
</script>

<template>
  <x-tooltip
    :position="tooltipPosition"
    :data-value="computedValue"
    :class="[
      'shrink-0',
      { 'flex-1': tabs.state.grow },
    ]"
  >
    <template v-if="$slots.tooltip || tooltip" #tooltip>
      <slot name="tooltip">
        {{ tooltip }}
      </slot>
    </template>
    <component
      :is="to ? XLink : tag"
      ref="elRef"
      :type="tag === 'button' ? 'button' : undefined"
      :to="to"
      :color="selected ? color : undefined"
      :style="[
        styles,
        to && selected && isBlockLike
          ? '--x-link-text: var(--x-tab-group-text); --x-link-text-hover: var(--x-tab-group-text);'
          : ''
      ]"
      :class="[
        className,
        classes.wrapper,
        'flex items-center justify-center',
        {
          'w-full': tabs.state.grow,
          'text-[color:var(--x-tab-group-text)] dark:text-[color:var(--x-tab-group-dark-text)]': selected,
          'cursor-pointer': !disabled,
          'cursor-not-allowed': disabled,
          'cursor-not-allowed text-secondary-500': disabled && !selected,
        },
      ]"
      :aria-label="ariaLabel"
      :aria-disabled="disabled ? 'true' : undefined"
      :aria-selected="selected ? 'true' : 'false'"
      @click="onClickTab"
    >
      <slot
        name="tab"
        :label="label"
        :value="value"
        :size="computedSize"
        :icon="icon"
      >
        <div :class="classes.content">
          <x-icon
            v-if="icon"
            :icon="icon"
            :size="computedSize"
            :class="classes.icon"
          />
          <div
            v-if="showLabel"
            :class="classes.label"
          >
            {{ computedLabel }}
          </div>
          <x-icon
            v-if="resolvedProps.removable"
            size="sm"
            :icon="closeIcon"
            class="ml-2 cursor-pointer hover:text-secondary-700 dark:hover:text-secondary-500 transition-colors duration-150"
            @click="(e: Event) => $emit('remove', e)"
          />
        </div>
      </slot>
      <teleport v-if="selected && teleportTo" :to="teleportTo">
        <div v-if="$slots.default" role="tabpanel" :class="classes.tabpanel">
          <slot></slot>
        </div>
      </teleport>
    </component>
  </x-tooltip>
</template>
