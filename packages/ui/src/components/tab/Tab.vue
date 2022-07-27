<script lang="ts">
export default { name: 'XTab' }
</script>

<script setup lang="ts">
import { inject, reactive, computed, ref, onMounted } from 'vue'
import { useMutationObserver } from '@vueuse/core'
import { injectTabKey } from '../../composables/keys'
import { useCommon } from '../../composables/common'
import { useTheme } from '../../composables/theme'

import XIcon from '../icon/Icon.vue'
import XLink from '../link/Link.vue'

import theme from './Tab.theme'

const props = defineProps({
  ...useCommon.props(),
  value: {
    type: [String, Number],
  },
  tag: {
    type: String,
    default: 'div',
  },
  to: String,
  label: String,
  icon: String,
  disabled: Boolean,
  exact: Boolean,
})

const computedValue = computed(() => props.to || props.value )
const computedLabel = computed(() => props.label || props.value)
const teleportTo = ref(null)
const elRef = ref<HTMLElement | typeof XLink | null>(null)

const tabs = inject(injectTabKey, {
  tabsContentRef: ref(null),
  activateTab: () => {},
  state: reactive({
    active: false,
    variant: 'line',
    ghost: false,
    grow: false,
    exact: false,
    size: 'md',
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

function onClickTab() {
  if (!props.to) tabs.activateTab(computedValue.value)
}

const { styles, classes, className } = useTheme('tab', theme, ref({
  ...props,
  size: computedSize.value,
  exact: computedExact.value,
}), tabs.state)
</script>

<template>
  <li
    :data-value="computedValue"
    :style="styles"
    class="shrink-0 font-medium"
    :class="[
      className,
      { 'flex-1': tabs.state.grow }
    ]"
  >
    <component
      :is="to ? XLink : tag"
      ref="elRef"
      :to="to"
      :color="selected ? color : undefined"
      :class="[
        classes.wrapper,
        {
          'text-[color:var(--x-tabs-text)] dark:text-[color:var(--x-tabs-dark-text)]': selected,
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
        <div class="flex items-center justify-center">
          <x-icon
            v-if="icon"
            :icon="icon"
            :size="computedSize"
            :class="classes.icon"
          />
          <div :class="classes.label">{{ computedLabel }}</div>
        </div>
      </slot>
      <teleport v-if="selected && teleportTo" :to="teleportTo">
        <slot></slot>
      </teleport>
    </component>
  </li>
</template>
