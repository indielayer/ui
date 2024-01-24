<script lang="ts">
const tabProps = {
  ...useCommon.props(),
  value: {
    type: [String, Number],
  },
  tag: {
    type: String,
    default: 'button',
  },
  to: [String, Object],
  label: String,
  icon: String,
  disabled: Boolean,
  exact: Boolean,
  removable: Boolean,
}

export type TabProps = ExtractPublicPropTypes<typeof tabProps>

type InternalClasses = 'wrapper' | 'content' | 'label' | 'icon'
type InternalExtraData = {
  selected: boolean;
} & Pick<TabGroupInjection, 'state'>['state']
export interface TabTheme extends ThemeComponent<TabProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XTab',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import { inject, reactive, computed, ref, onMounted, type ExtractPublicPropTypes } from 'vue'
import { useMutationObserver } from '@vueuse/core'
import { injectTabKey } from '../../composables/keys'
import { useCommon, type Size } from '../../composables/useCommon'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

import XIcon from '../icon/Icon.vue'
import XLink from '../link/Link.vue'

import { closeIcon } from '../../common/icons'

import type { TabGroupInjection, TabGroupVariant } from './TabGroup.vue'

const props = defineProps(tabProps)

const computedValue = computed(() => (elRef.value as typeof XLink)?.$el?.href || props.value)
const computedLabel = computed(() => props.label || props.value)
const teleportTo = ref<HTMLElement | null>(null)
const elRef = ref<HTMLElement | typeof XLink | null>(null)

const tabs = inject(injectTabKey, {
  tabsContentRef: ref(null),
  activateTab: () => {},
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
const computedSize = computed(() => props.size || tabs.state.size)

onMounted(() => {
  teleportTo.value = tabs.tabsContentRef.value

  if (props.to && elRef.value) {
    check()
    useMutationObserver((elRef.value as typeof XLink).$el, check, {
      attributes: true,
      attributeFilter: ['class'],
    })
  }
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

const { styles, classes, className } = useTheme('Tab', {}, ref({
  ...props,
  size: computedSize.value,
  exact: computedExact.value,
}), {
  ...tabs.state,
  selected,
})
</script>

<template>
  <component
    :is="to ? XLink : tag"
    ref="elRef"
    :data-value="computedValue"
    :to="to"
    :color="selected ? color : undefined"
    :style="[
      styles,
      to && selected && tabs.state.variant === 'block'
        ? '--x-link-text: var(--x-tab-group-text); --x-link-text-hover: var(--x-tab-group-text);'
        : ''
    ]"
    :class="[
      className,
      classes.wrapper,
      'shrink-0',
      {
        'flex-1': tabs.state.grow,
        'text-[color:var(--x-tab-group-text)] dark:text-[color:var(--x-tab-group-dark-text)]': selected,
        'cursor-pointer': !disabled,
        'cursor-not-allowed': disabled,
        'cursor-not-allowed text-gray-500': disabled && !selected,
      },
    ]"
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
        <div :class="classes.label">{{ computedLabel }}</div>
        <x-icon
          v-if="removable"
          size="sm"
          :icon="closeIcon"
          class="ml-2 cursor-pointer hover:text-gray-700 dark:hover:text-gray-500 transition-colors duration-150"
          @click="(e: Event) => $emit('remove', e)"
        />
      </div>
    </slot>
    <teleport v-if="selected && teleportTo" :to="teleportTo">
      <slot></slot>
    </teleport>
  </component>
</template>
